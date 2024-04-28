import * as ImagePicker from "expo-image-picker";
import axios from 'axios';
import { url } from '../utils';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

export const uploadImage = async (mode, userInfo, setImage) => {

  if(!userInfo){
    Alert.alert('SIGN IN TO UPLOAD PHOTOS')
    return
  }
  try {
    let result;

    if (mode === "gallery") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.error("Gallery permissions denied");
        // Show an alert or UI message to inform the user about the denied permissions
        return;
      }
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    } else {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        console.error("Camera permissions denied");
        // Show an alert or UI message to inform the user about the denied permissions
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: true,
        quality: 1,
      });
    }

    if (!result.canceled) {
      await saveImage(result.assets[0].uri, userInfo, setImage);

    }else{
      Alert.alert('NO IMAGES SELECCTED')
    }
  } catch (error) {
    console.error("Error selecting image:", error);
    // Alert user about the error (optional)
  }
};

export const saveImage = async (imageUri, userInfo, setImage) => {
  try {
    if (!imageUri) {
      throw new Error('Image URI is null or undefined');
    }
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    if (!fileInfo.exists) {
      throw new Error('File not found');
    }
    const file = new FormData();
    file.append('file', {
      uri: imageUri,
      name: "image.jpg",
      type: "image/jpeg"
    });

    const { data } = await axios.post(`${url}/upload`, file, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log(data);
    if (data && data.secure_url) {
      console.log(data.secure_url);
      setImage(data.secure_url);
      Alert.alert("Done");
    } else {
      console.error('Unable to upload image:', data);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    // Alert user about the error (optional)
  }
};
