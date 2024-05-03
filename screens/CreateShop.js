import React, { useState, useEffect, useContext} from 'react'
import ImagePlaceHolder from '../components/ImagePlaceHolder'
import { uploadImage } from '../middleware/Imageupload'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
import { Button } from 'react-native-paper'
import { FormStyles, buttonStyles } from '../styles'
import { url } from '../utils'

import { View, Text,SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Store } from '../Store'
import LoadingBox from '../components/LoadingBox'




const CreateShop = ({ route }) => {

    const {shop}= route.params || {}

    const {state} = useContext(Store)
    const {userInfo} = state


    const [industries, setIndustries] = useState([])
    const [industry, setIndustry]= useState(shop?.industry || '')
    const [country, setCountry]= useState(shop?.country || '')
    const [logo, setLogo]= useState(shop?.logo || '')
    const [area, setArea] = useState(shop?.area || '')
    const [name, setName] = useState(shop?.name || '')
    const [isLoading, setIsLoading] = useState(false)


    const countries = ["Uganda", "UAE"]

    useEffect(()=> {
        const fetchCategories = async()=> {
          const {data} = await axios.get(`${url}/category`)
          setIndustries(data)
        }
        fetchCategories()
      },[])

      const logoUpload = async()=>{
        const mode = "gallery"
        setIsLoading(true)
        uploadImage(mode, userInfo, setLogo); 
        setIsLoading(false)
      }

      const handleUpdate = async(shop)=>{
        const {data} = await axios.put(`${url}/shops/update/${shop._id}`, {
          industry,
          logo,
          area,
          storeName: name
        }, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        })
        Alert.alert('UPDATED')
      }
      const handleSubmit = async()=>{
        const {data} = await axios.put(`${url}/shops/new`, {
          industry,
          logo,
          area,
          name
        }, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        }) 
        Alert.alert('CREATED')
      }

      
  return (
    <SafeAreaView style={FormStyles.Form}>
        <Text>SHOP NAME:</Text>
      <TextInput type="text"
        style={FormStyles.Input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text>OPERATION AREA</Text>
      <TextInput type="text"
        style={FormStyles.Input}
        value={area}
        onChangeText={text => setArea(text)}
      />
      <TextInput type="text"/>


      <Text style={{marginTop: 2, fontWeight: 800}}>INDUSTRY: {industry?.name || ''}</Text>
                
        <Picker style={FormStyles.Input}
            selectedValue={industry}
            prompt='Options'
            onValueChange={(item)=> {
            setIndustry(item)
            setIndustry('')
            }}
            >
            {industries && industries.map(industry => (
            <Picker.Item 
                key={industry._id} 
                value={industry.name} 
                label={industry.name}
            />
            ))}
        </Picker>

        <Text>COUNTRY</Text>
        <Picker style={FormStyles.Input}
            prompt='options'
            selectedValue={country}
            onValueChange={(item)=> setCountry(item)}
            >
            {countries && countries.map(country => (
            <Picker.Item key={country} label={country} value={country} 
            />
            ))}
        </Picker>
        <ImagePlaceHolder source={null || logo}/>
        <TouchableOpacity style={buttonStyles.button} onPress={logoUpload}>
            {isLoading ? (<LoadingBox size="small"/>) :
            (<Button icon="camera" textColor='white'>Logo</Button>)
            }
        </TouchableOpacity>

          {shop ? (
            <TouchableOpacity style={FormStyles.button} onPress={()=>handleUpdate(shop)}>
            <Button textColor='white'>UPDATE</Button>
        </TouchableOpacity>
          ):(
            <TouchableOpacity style={FormStyles.button} onPress={()=>handleSubmit()}>
            <Button textColor='white'>SUBMIT</Button>
        </TouchableOpacity>
          )}
    </SafeAreaView>
  )
}

export default CreateShop
