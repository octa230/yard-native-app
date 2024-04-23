import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Alert, TouchableOpacity, ScrollView, TextInput} from 'react-native'
import * as ImagePicker from "expo-image-picker"
import {Picker} from '@react-native-picker/picker';
import axios from 'axios'
import { url } from '../utils'
import { Store } from '../Store'
import { FormStyles } from '../styles'


const CreateProducts = () => {

  const {state} = useContext(Store)
  const {userInfo} = state

  const [file, setFile] = useState(null)
  const [image, setImage] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory]= useState('')
  const [selectedSubCategory, setSelectedSubCategory]= useState('')
  const [shops, setShops] = useState([])
  const [selectedShop, setSelectedShop] = useState('')
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState('')
  const [inStock, setInStock]= useState('')
  const [description, setDescription] = useState('')


  console.log(selectedCategory)
  console.log(selectedSubCategory)

  const handleSubmit = async()=>{
    console.log(image,
      selectedCategory,
      selectedSubCategory,
      selectedShop,
      name,
      brand,
      price,
      inStock,
      description)
  }



  const getShops =async()=>{
    const {data} = await axios.get(`${url}/shops/mine`, {
      headers:{
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    setShops(data)
  }


  useEffect(()=> {
    const fetchCategories = async()=> {
      const {data} = await axios.get(`${url}/category`)
      setCategories(data)
    }
    fetchCategories()
    getShops()
  },[])

  const uploadImage = async () => {
    console.log(userInfo.token); // Existing logging
  
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
  
      if (!result.canceled) {
        const formData = new FormData();
        formData.append('file', {
          uri: result.uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
  
        // Add axios interceptors for logging
        axios.interceptors.request.use(
          (config) => {
            console.log('Request:', config);
            return config;
          },
          (error) => {
            console.error('Request error:', error);
            return Promise.reject(error);
          }
        );
  
        axios.interceptors.response.use(
          (response) => {
            console.log('Response:', response);
            return response;
          },
          (error) => {
            console.error('Response error:', error);
            return Promise.reject(error);
          }
        );
  
        try {
          const { data } = await axios.post(`${url}/upload/one`, formData, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          setLogo(data);
          console.log('Image uploaded successfully:', data);
          toast.success('Done');
        } catch (error) {
          console.error('Upload error:', error);
        } finally {
          // Remove interceptors after upload (optional)
          axios.interceptors.request.use = null;
          axios.interceptors.response.use = null;
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

/*   const uploadImage = async () => {
    console.log(userInfo.token)
    try {     
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          //aspect: [4, 3],
          quality: 1,
        });
      
        if (!result.canceled) {
          //setImage(result.uri);
          console.log(true)

          const formData = new FormData()
          formData.append('file', {
            uri: result.uri,
            type: 'image/jpeg', // Adjust the type if needed
            name: 'photo.jpg', // Adjust the file name if needed
          });

          console.log(formData)
          try{
            const {data} = await axios.post(`${url}/upload/one`, formData, {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'multipart/form-data'
              }
            });
            setLogo(data);
            console.log('Image uploaded successfully:', data);
            toast.success('Done')
          }catch(error){
            console.log(error)
          }
        }
        //console.log(image)
    }catch(error){
      console.log(error)
    }
}; */

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
                  prompt='Options'
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
                <TextInput style={FormStyles.Input} type="text"
                  value={description}
                  onChangeText={text => setDescription(text)}
                  />

                <View style={{padding:12}}>
                    {image && (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: image }} style={{height:100, width: 100}} />
                        </View>
                    )}
                </View>


                <TouchableOpacity style={FormStyles.button} onPress={uploadImage}>
                    <Text>Choose Image</Text>
                </TouchableOpacity>

                <TouchableOpacity style={FormStyles.button} onPress={handleSubmit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
  )
}

export default CreateProducts
