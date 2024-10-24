import React, { useState, useCallback, useContext } from 'react'
import { Text,ScrollView, TouchableOpacity, Alert } from 'react-native'
import { DatePickerModal } from 'react-native-paper-dates';
import { FormStyles } from '../styles';
import { Button, TextInput } from 'react-native-paper';
import ImagePlaceHolder from '../components/ImagePlaceHolder';
import { uploadImage } from '../middleware/Imageupload';
import { Store } from '../Store';
import axios from 'axios';
import { url } from '../utils';
import LoadingBox from '../components/LoadingBox';

const CreateTrip = ({navigation}) => {



  const {state} = useContext(Store)
  const {userInfo} = state


  const [availableWeight, setAvailableWeight] = useState('')
  const [weightPrice, setweightPrice] = useState('')
  const [ticketCopy, setTicketCopy] = useState()
  const [visaCopy, setVisaCopy] = useState()
  const [date, setDate] = useState({})
  const [open, setOpen ] = useState(false)
  const [isLoadingVisa, setIsLoadingVisa] = useState(false)
  const [isLoadingTicket, setIsLoadingTicket] = useState(false)


  const onDismiss = useCallback(()=> {
    setOpen(false)
  }, [setOpen])

  const onConfirm = useCallback(({startDate, endDate})=> {
      setOpen(false)
      setDate({startDate, endDate})
  }, [setOpen, setDate])

  const ticketUpload=async()=>{
    const mode = "gallery"
    setIsLoadingTicket(true)
    await uploadImage(mode, userInfo, setTicketCopy); 
    setIsLoadingTicket(false)
  }
  const visaUpload=async()=>{
    const mode = "gallery"
    setIsLoadingVisa(true)
    await uploadImage(mode, userInfo, setVisaCopy); 
    setIsLoadingVisa(false)
  }
  const handleSubmit=async(e)=>{
   
    if(userInfo && userInfo.transporter){
      e.preventDefault()
      if(!availableWeight || !ticketCopy || !visaCopy || !date){
        Alert.alert('FILL ALL DATA')
        return
      }
      //const trip = {}
      await axios.post(`${url}/trips/new`, {
      availableWeight, 
      ticketCopy, 
      visaCopy, 
      arrivalDate: date.startDate, 
      departureDate: date.endDate, 
      weightPrice
    }, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    Alert.alert("DONE")
    }else{
      Alert.alert('LOGIN & ACTIVATE TRANSPORTER ACCOUNT!')
      navigation.navigate('profile-settings')
    }
    
  }
  return (
      <ScrollView>
          <Text style={FormStyles.FormHeader}>Create Trip</Text>

          <TextInput 
            style={FormStyles.Input} 
            mode='outlined'
            label='WEIGHT'
            value={availableWeight}
            onChangeText={text => setAvailableWeight(text)}
            keyboardType='numeric'
          
            />
          <TextInput 
            style={FormStyles.Input} 
            mode='outlined'
            label='KG PRICE (UGX)'
            keyboardType='numeric'
            value={weightPrice}
            onChangeText={text => setweightPrice(text)}
            />

          <ImagePlaceHolder source={ticketCopy}/>
          {isLoadingVisa ? (<LoadingBox size="small"/>) : (
            <Button icon="camera" textColor='white' style={FormStyles.button} onPress={ticketUpload}>TICKET PHOTO</Button>
          )}

          <ImagePlaceHolder source={visaCopy}/>
          {isLoadingVisa ? (<LoadingBox size="small"/>) : (
            <Button icon="camera" textColor='white' style={FormStyles.button} onPress={visaUpload}>VISA PHOTO</Button>
          )}

          <Text style={{padding: 8, fontWeight: 800, color:"red"}}>PLEASE SELECT DATES FOR WHEN YOU LEAVE AND TRAVEL BACK TO KAMPALA</Text>
          <Button style={FormStyles.button} textColor='white' icon='calendar' onPress={()=>setOpen(true)}>SELECT TRIP DATES</Button>
          <DatePickerModal
            locale="en-GB"
            mode='range'
            visible={open}
            onDismiss={onDismiss}
            startDate={date.startDate}
            endDate={date.endDate}
            onConfirm={onConfirm}
          />
            <Button textColor='white' style={FormStyles.button} onPress={handleSubmit}>DONE</Button>
    </ScrollView>
  )
}

export default CreateTrip
