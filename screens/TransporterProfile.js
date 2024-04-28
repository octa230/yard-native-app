import React, { useContext, useState } from 'react'
import { uploadImage } from '../middleware/Imageupload'
import ImagePlaceHolder from '../components/ImagePlaceHolder'
import { url } from '../utils'
import { Store } from '../Store'
import axios from 'axios'
import { FormStyles, buttonStyles } from '../styles'
import { Alert, SafeAreaView, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'

const TransporterProfile = ({route}) => {

  const {state} = useContext(Store)
  const {userInfo} = state

  const {transporter} = route.params || {}

  const [name, setName] = useState(transporter?.name || '')
  const [area, setArea] = useState(transporter?.area || '')
  const [photo, setPhoto] = useState(transporter?.photo || '')
  const [phone, setPhone] = useState(transporter?.phone || '')

  const uploadProfilePic=()=>{
    const mode = "gallery"
    uploadImage(mode, userInfo, setPhoto)
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
  
      Alert.alert('SUCCESSFULLY UPDATED WAIT FOR APPROVAL')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <SafeAreaView style={FormStyles.Form}>
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
    <TouchableOpacity style={buttonStyles.button} onPress={uploadProfilePic}>
        <Button icon="camera" textColor='white'>Profile Photo</Button>
    </TouchableOpacity>

    <View>
      {transporter ? (
        <TouchableOpacity style={{padding: 4, width: 200}} onPress={updateHandler} >
        <Button buttonColor='green' textColor='white' mode='contained' style={{borderRadius: 3}}>
          UPDATE
        </Button>
      </TouchableOpacity>
      ):(
        <TouchableOpacity style={{padding: 4, width: 200}} onPress={submitHandler} >
        <Button buttonColor='green' textColor='white' mode='contained' style={{borderRadius: 3}}>
          SUBMIT
        </Button>
      </TouchableOpacity>
      )}
    </View>
</SafeAreaView>
  )
}

export default TransporterProfile
