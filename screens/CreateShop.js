import React, { useState, useEffect, useContext} from 'react'
import ImagePlaceHolder from '../components/ImagePlaceHolder'
import { uploadImage } from '../middleware/Imageupload'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
import { FormStyles, buttonStyles } from '../styles'
import { url } from '../utils'
import {TextInput, Button} from 'react-native-paper'
import { Text,ScrollView, Alert } from 'react-native'
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
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingUpload, setIsLoadingUpload] = useState(false)


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
        setIsLoadingUpload(true)
        await uploadImage(mode, userInfo, setLogo); 
        setIsLoadingUpload(false)
      }

       const handleUpdate = async(shop)=>{
        setIsLoading(true)
        await axios.put(`${url}/shops/update/${shop._id}`, {
          industry,
          logo,
          area,
          storeName: name
        }, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        })
        setIsLoading(false)
        Alert.alert('UPDATED')
      } 

      const handleSubmit = async()=>{
        if(!industry || !description || !logo || !area || !name){
          Alert.alert('All Fields Required')
          return
        }
        setIsLoading(true)
        await axios.post(`${url}/shops/new`, {
          industry,
          description,
          logo,
          area,
          name
        }, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        }) 
        Alert.alert('CREATED')
        setIsLoading(false)
      }

      
  return (
    <ScrollView>
      <TextInput 
        type="text"
        mode='outlined'
        label="Shop Name"
        style={FormStyles.Input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput 
        type="text"
        label='Area'
        mode='outlined'
        style={FormStyles.Input}
        value={area}
        onChangeText={text => setArea(text)}
      />                
        <Picker style={FormStyles.Input}
            prompt='options'
            selectedValue={industry}
            onValueChange={(item)=> { setIndustry(item)}} 
        >
          {industries && industries.map(industry => (
            <Picker.Item 
                key={industry._id} 
                value={industry.name} 
                label={industry.name}
            />
            ))}
        </Picker>

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
        <TextInput label='Decription'
          mode='outlined'
          style={FormStyles.Input} 
          type="text"
          multiline={true}
          value={description}
          onChangeText={text => setDescription(text)}
          />
        <ImagePlaceHolder source={null || logo}/>

        <>
          {isLoadingUpload ? (<LoadingBox size="small"/>): (
            <Button icon='camera' onPress={logoUpload} labelStyle={{fontWeight:"800"}}>
              UPLOAD LOGO
            </Button>
          )}
        </>

          {shop ? (
          <Button style={FormStyles.button} textColor='white'
            onPress={()=>handleUpdate(shop)}>
            LOGO
        </Button>
          ):(
          <Button textColor='white' style={FormStyles.button} onPress={()=>handleSubmit()}>
            DONE
        </Button>
          )}
    </ScrollView>
  )
}

export default CreateShop
