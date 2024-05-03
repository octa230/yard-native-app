import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Alert} from 'react-native'
import * as ImagePicker from "expo-image-picker"
import {Picker} from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
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
      setIsLoading(true)
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
  
      console.log(data);
      if (data && data.secure_url) {
        console.log(data.secure_url);
        // Assuming you have a state management solution:
        setImage(data.secure_url);
        setIsLoading(false)
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
            <View style={FormStyles.Form}>
                <Text style={FormStyles.FormHeader}>CreateProducts</Text>
                <Text>Product Name</Text>

                <TextInput style={FormStyles.Input} 
                  value={name}
                  onChangeText={text => setName(text)}
                
                  />
                <Text>Price in Ugx</Text>
                <TextInput style={FormStyles.Input} 
                  keyboardType='numeric'
                  value={price}
                  onChangeText={text => setPrice(text)}
                  />
                <Text>Brand</Text>
                <TextInput style={FormStyles.Input}
                  value={brand}
                  onChangeText={text => setBrand(text)}
                  />
                <Text>In Stock</Text>
                <TextInput style={FormStyles.Input} 
                  keyboardType='numeric'
                  value={inStock}
                  onChangeText={text => setInStock(text)}
                  />
                <Text style={{marginTop:12, fontWeight: 800,  borderBottomWidth: 1}}>Category{selectedCategory?.name || ''}</Text>
                
                <Picker style={FormStyles.Input}
                  selectedValue={selectedCategory}
                  prompt='options'
                  onValueChange={(item)=> {
                    setSelectedCategory(item)
                    setSelectedSubCategory('')
                  }}
                  >
                  {categories && categories.map(category => (
                    <Picker.Item 
                      key={category._id} 
                      value={category._id} 
                      label={category.name}
                    />
                  ))}
                </Picker>


                <Text style={{marginTop:12, fontWeight: 800,  borderBottomWidth: 1}}>SubCategory{selectedCategory?.name || ''}</Text>
                
                <Picker style={FormStyles.Input}
                  prompt='options'
                  selectedValue={selectedSubCategory}
                  onValueChange={(item)=> setSelectedSubCategory(item)}
                  >
                  {categories?.find(category => category._id === selectedCategory)
                    ?.subcategories.map(subcategory => (
                    <Picker.Item key={subcategory} label={subcategory} value={subcategory} 
                  />
                  ))}
                </Picker>

                <Text style={{marginTop:12, fontWeight: 800,  borderBottomWidth: 1}}>Select Shop</Text>
                <Picker style={FormStyles.Input}
                  prompt='options'
                  selectedValue={selectedShop}
                  onValueChange={(item)=> setSelectedShop(item)}
                  >
                  {shops && shops.map(shop => (
                    <Picker.Item key={shop} label={shop.name} value={shop._id} 
                  />
                  ))}
                </Picker>
                <Text>Description</Text>
                <TextInput style={FormStyles.Input} 
                  type="text"
                  multiline={true}
                  value={description}
                  onChangeText={text => setDescription(text)}
                  />

                 <ImagePlaceHolder source={null || image}/>


                <TouchableOpacity style={FormStyles.button} onPress={()=> uploadImage("gallery")}>
                    {isLoading ? (<LoadingBox size="small" color="white"/>) : (<Text>Choose Image</Text>)}
                </TouchableOpacity>

    
                  {product ? (
                    <TouchableOpacity style={FormStyles.button} onPress={()=>handleUpdate(product)}>
                    <Button textColor='white'>Update</Button>
                </TouchableOpacity>
                  ):(
                    <TouchableOpacity style={FormStyles.button} onPress={()=>handleSubmit()}>
                    <Button textColor='white' style={{alignSelf: "center"}}>Submit</Button>
                </TouchableOpacity>
                  )}
            </View>
        </ScrollView>
  )
}

export default CreateProducts
