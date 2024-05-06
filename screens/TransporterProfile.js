import React, { useContext, useState } from 'react'
import { uploadImage } from '../middleware/Imageupload'
import ImagePlaceHolder from '../components/ImagePlaceHolder'
import { url } from '../utils'
import { Store } from '../Store'
import axios from 'axios'
import { FormStyles} from '../styles'
import { Alert, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import LoadingBox from '../components/LoadingBox'
import SafeScreen from '../components/SafeScreen'

const TransporterProfile = ({route}) => {

  const {state} = useContext(Store)
  const {userInfo} = state

  const {transporter} = route.params || {}

  const [name, setName] = useState(transporter?.name || '')
  const [area, setArea] = useState(transporter?.area || '')
  const [photo, setPhoto] = useState(transporter?.photo || '')
  const [phone, setPhone] = useState(transporter?.phone || '')
  const [isLoading, setIsLoading] = useState(false)

  const uploadProfilePic= async()=>{
    const mode = "gallery"
    setIsLoading(true)
    await uploadImage(mode, userInfo, setPhoto)
    setIsLoading(false)
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
  <SafeScreen>
    <View style={FormStyles.Form}>
    <Text>BUSINESS NAME:</Text>
  <TextInput type="text"
    style={FormStyles.Input}
    value={name}
    onChangeText={text => setName(text)}
  />
    <Text>PHONE:</Text>
  <TextInput type="text"
    style={FormStyles.Input}
    value={phone}
    keyboardType='numeric'
    onChangeText={text => setPhone(text)}
  />
  <Text>OPERATION AREA</Text>
  <TextInput type="text"
    style={FormStyles.Input}
    value={area}
    onChangeText={text => setArea(text)}
  />
  <TextInput type="text"/>

  
  
  <Text style={{marginTop: 2, fontWeight: 800}}>FACE PROFILE PHOTO</Text>
            
    <ImagePlaceHolder source={null || photo}/>
    <TouchableOpacity style={FormStyles.button} onPress={uploadProfilePic}>
        {isLoading ? (
          <LoadingBox size="small" color="white"/>
        ): (
          <Button icon="camera" textColor='white'>Profile Photo</Button>
        )}
    </TouchableOpacity>

      {transporter ? (
        <TouchableOpacity style={FormStyles.button} onPress={updateHandler} >
        {isLoading ? (<LoadingBox size="small" color="white"/>) : (
          <Button buttonColor='green' textColor='white'>
          UPDATE
        </Button>
        )}
      </TouchableOpacity>
      ):(
        <TouchableOpacity style={FormStyles.button} onPress={submitHandler} >
        {isLoading ? (<LoadingBox/>) : (
          <Button textColor='white'>SUBMIT</Button>
        )}
      </TouchableOpacity>
      )}
</View>
  </SafeScreen>
  )
}

export default TransporterProfile
