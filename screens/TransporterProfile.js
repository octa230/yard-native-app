import React, { useContext, useState } from 'react'
import { uploadImage } from '../middleware/Imageupload'
import ImagePlaceHolder from '../components/ImagePlaceHolder'
import { url } from '../utils'
import { Store } from '../Store'
import axios from 'axios'
import { FormStyles} from '../styles'
import { Alert, Text, ScrollView } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import LoadingBox from '../components/LoadingBox'

const TransporterProfile = ({route}) => {

  const {state} = useContext(Store)
  const {userInfo} = state

  const {transporter} = route.params || {}

  const [name, setName] = useState(transporter?.name || '')
  const [area, setArea] = useState(transporter?.area || '')
  const [photo, setPhoto] = useState(transporter?.photo || '')
  const [phone, setPhone] = useState(transporter?.phone || '')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false)

  const uploadProfilePic= async()=>{
    const mode = "gallery"
    setIsLoadingPhoto(true)
    await uploadImage(mode, userInfo, setPhoto)
    setIsLoadingPhoto(false)
  }

  const submitHandler = async () => {
    try {
      if (!userInfo || !userInfo.transporter) {
        Alert.alert('FIRST ACTIVATE TRANSPORTER ACCOUNT', 'GO TO MANAGE PROFILE')
        return
      }
  
      if (!name || !area || !phone || !photo) {
        Alert.alert("ALL FIELDS NEEDED")
        return
      }
        setIsLoading(true)
        await axios.post(`${url}/transporters/create-profile`, {
        userId: userInfo._id,
        name: name,
        area: area,
        photo: photo,
        phone: phone
      }, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      })
      setIsLoading(false)
      Alert.alert('SUCESSFULLY CREATED WAIT FOR APPROVAL')
    } catch (error) {
      console.error(error)
    }
  }
  const updateHandler = async (transporter) => {
    try {
      if (!userInfo.transporter) {
        Alert.alert('FIRST ACTIVATE TRANSPORTER ACCOUNT', 'GO TO MANAGE PROFILE')
        return
      }
  
      if (!name || !area || !phone || !photo) {
        Alert.alert("ALL FIELDS NEEDED")
        return
      }
        setIsLoading(true)
        await axios.post(`${url}/transporters/update/${transporter._id}`, {
        userId: userInfo._id,
        name: name,
        area: area,
        photo: photo,
        phone: phone
      }, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      })
      setIsLoading(false)
      Alert.alert('SUCCESSFULLY UPDATED WAIT FOR APPROVAL')
    } catch (error) {
      console.error(error)
    }
  }
  return (
  <ScrollView>
    
  <TextInput type="text"
    mode="outlined"
    label='BUSINESS NAME'
    style={FormStyles.Input}
    value={name}
    onChangeText={text => setName(text)}
  />

  <TextInput type="text"
    mode='outlined'
    label='PHONE'
    style={FormStyles.Input}
    value={phone}
    keyboardType='numeric'
    onChangeText={text => setPhone(text)}
  />
  <TextInput type="text"
    mode='outlined'
    label='OPERATION AREA'
    style={FormStyles.Input}
    value={area}
    onChangeText={text => setArea(text)}
  />
  
  
  <Text style={FormStyles.FormHeader}>FACE PHOTO</Text>
            
    <ImagePlaceHolder source={null || photo}/>
        {isLoadingPhoto ? (
          <LoadingBox size="small" color='green'/>
        ): (
          <Button icon="camera" textColor='white' style={FormStyles.button} onPress={uploadProfilePic}>Profile Photo</Button>
        )}

      {transporter ? (isLoading ? (<LoadingBox size="small" color="white"/>) : (
        <Button buttonColor='green' textColor='white'>UPDATE</Button>
      )
      ):(isLoading ? (<LoadingBox/>) : (
          <Button textColor='white'  style={FormStyles.button} onPress={submitHandler}>DONE</Button>
        )
      )}
</ScrollView>
)
}

export default TransporterProfile
