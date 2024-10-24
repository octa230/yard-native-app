import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Alert} from 'react-native'
import * as ImagePicker from "expo-image-picker"
import {Picker} from '@react-native-picker/picker';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios'
import { url } from '../utils'
import { Store } from '../Store'
import { FormStyles } from '../styles'
import * as FileSystem from 'expo-file-system'
import ImagePlaceHolder from '../components/ImagePlaceHolder';
import LoadingBox from '../components/LoadingBox';


const CreateProducts = ({navigation, route}) => {

  const {state} = useContext(Store)
  const {userInfo} = state

  const {item} = route.params || {}
  const product = item

  const [image, setImage] = useState(product?.image || '')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory]= useState(product?.category || null)
  const [selectedSubCategory, setSelectedSubCategory]= useState(null)
  const [shops, setShops] = useState([])
  const [selectedShop, setSelectedShop] = useState(product?.shop || '')
  const [name, setName] = useState(product?.name || '')
  const [brand, setBrand] = useState(product?.brand || '')
  const [price, setPrice] = useState(product?.price || '')
  const [inStock, setInStock]= useState(product?.inStock || '')
  const [description, setDescription] = useState(product?.description || '')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUpload, setIsLoadingUpload] = useState(false)


  const handleUpdate = async(product)=>{
    try{
      await axios.put(`${url}/products/${product._id}`, 
      {
        image: image,
        category: selectedCategory,
        categoryName: selectedCategory.name,
        shop: selectedShop,
        name: name,
        price: price,
        inStock: inStock,
        description: description,
        brand: brand,
        subcategory: selectedSubCategory
      }, 
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }) 
      //console.log(data.data)
      Alert.alert('PROCUCT SENT FOR REVIEW!')

    }catch(error){
      console.log(error)
    }
  }


  const handleSubmit = async()=>{
    if(!userInfo || !userInfo.seller){
      Alert.alert('LOGIN & CREATE SHOP FIRST!')
      return
    }

    try{
      await axios.post(`${url}/products/new`, 
    {
      image: image,
      category: selectedCategory,
      //categoryName: selectedCategory.name,
      shop: selectedShop,
      name: name,
      price: price,
      inStock: inStock,
      description: description,
      brand: brand,
      subcategory: selectedSubCategory
    }, 
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }) 
    //console.log(data.data)
    Alert.alert('PROCUCT SENT FOR REVIEW!')

  }catch(error){
    console.log(error)
  }
  }



  const getShops =async()=>{
    if(userInfo && userInfo.seller){
      const {data} = await axios.get(`${url}/shops/mine`, {
        headers:{
          Authorization: `Bearer ${userInfo.token}`
        }
      })
      setShops(data)
    }

  }


  useEffect(()=> {
    const fetchCategories = async()=> {
      const {data} = await axios.get(`${url}/category`)
      setCategories(data)
    }
    fetchCategories()
    getShops()
  },[])


  const uploadImage = async (mode) => {

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
          return; // Exit if permission not granted
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
          return; // Exit if permission not granted
        }
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.back,
          allowsEditing: true,
          quality: 1,
        });
      }
  
      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      // Alert user about the error (optional)
    }
  };

  const saveImage = async (imageUri) => {
    try {
      setIsLoadingUpload(true)
      if (!imageUri) {
        throw new Error('Image URI is null or undefined');
      }
      const fileInfo = await FileSystem.getInfoAsync(imageUri)
      if(!fileInfo.exists){
        throw new Error('File not found')
      }
      const file = new FormData();
      file.append('file', {
        uri: imageUri,
        name: "image.jpg",
        type:"image/jpeg"
      });
  
      const { data } = await axios.post(`${url}/upload`, file, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      //console.log(data);
      if (data && data.secure_url) {
        console.log(data.secure_url);
        // Assuming you have a state management solution:
        setImage(data.secure_url);
        setIsLoadingUpload(false)
        Alert.alert("Done");
      } else {
        console.error('Unable to upload image:', data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <ScrollView>
        <TextInput 
          style={FormStyles.Input} 
          value={name}
          mode='outlined'
          label='PRODUCT NAME'
          onChangeText={text => setName(text)}
        
          />
        <TextInput 
          style={FormStyles.Input} 
          mode='outlined'
          label='UGX PRICE'
          keyboardType='numeric'
          value={price}
          onChangeText={text => setPrice(text)}
          />
        <TextInput 
          style={FormStyles.Input}
          mode='outlined'
          label='BRAND'
          value={brand}
          onChangeText={text => setBrand(text)}
          />
        <TextInput 
          style={FormStyles.Input} 
          mode='outlined'
          label='INSTOCK'
          keyboardType='numeric'
          value={inStock}
          onChangeText={text => setInStock(text)}
          />        
        <Picker 
          style={FormStyles.Input}
          mode='outlined'
          label=''
          selectedValue={selectedCategory}
          prompt='options'
          onValueChange={(item)=> {
            setSelectedCategory(item)
            setSelectedSubCategory('')
          }}
          >
          <Picker.Item label="CATEGORY" value="" />
          {categories && categories.map(category => (
            <Picker.Item 
              key={category._id} 
              value={category._id} 
              label={category.name}
            />
          ))}
        </Picker>
        
        <Picker style={FormStyles.Input}
          prompt='options'
          selectedValue={selectedSubCategory}
          onValueChange={(item)=> setSelectedSubCategory(item)}
          >
          <Picker.Item label="SUB CATEGORY" value="" />
          {categories?.find(category => category._id === selectedCategory)
            ?.subcategories.map(subcategory => (
            <Picker.Item key={subcategory} label={subcategory} value={subcategory} 
          />
          ))}
        </Picker>

        <Picker style={FormStyles.Input}
          prompt='options'
          selectedValue={selectedShop}
          onValueChange={(item)=> setSelectedShop(item)}
          >
          <Picker.Item label="SELECT SHOP" value="" />
          {shops && shops.map(shop => (
            <Picker.Item key={shop} label={shop.name} value={shop._id} 
          />
          ))}
        </Picker>
        <TextInput style={FormStyles.Input} 
          label='PRODUCT DESCRIPTION'
          mode='outlined'
          type="text"
          multiline={true}
          value={description}
          onChangeText={text => setDescription(text)}
          />

          <ImagePlaceHolder source={null || image}/>

        {isLoadingUpload ? (
          <LoadingBox size="small"/>
        ):(
          <Button textColor='white' icon='camera' onPress={uploadImage} style={FormStyles.button}>Choose Photo(s)</Button>
        )}

    {product ? (
        <Button textColor='white' onPress={()=>handleUpdate(product)} style={FormStyles.button}>Update</Button>
      ):(
        <Button textColor='white' style={FormStyles.button} onPress={()=>handleSubmit()}>Submit</Button>
      )}
    </ScrollView>
  )
}

export default CreateProducts
