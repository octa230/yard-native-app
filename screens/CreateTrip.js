import React, { useState, useCallback, useContext } from 'react'
import { View, Text,ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { DatePickerModal } from 'react-native-paper-dates';
import { FormStyles } from '../styles';
import { Button } from 'react-native-paper';
import ImagePlaceHolder from '../components/ImagePlaceHolder';
import { uploadImage } from '../middleware/Imageupload';
import { Store } from '../Store';
import axios from 'axios';
import { url } from '../utils';
import LoadingBox from '../components/LoadingBox';
import SafeScreen from '../components/SafeScreen';

const CreateTrip = ({navigation}) => {



  const {state} = useContext(Store)
  const {userInfo} = state


  const [availableWeight, setAvailableWeight] = useState('')
  const [weightPrice, setweightPrice] = useState('')
  const [ticketCopy, setTicketCopy] = useState()
  const [visaCopy, setVisaCopy] = useState()
  const [date, setDate] = useState({})
  const [open, setOpen ] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const onDismiss = useCallback(()=> {
    setOpen(false)
  }, [setOpen])

  const onConfirm = useCallback(({startDate, endDate})=> {
      setOpen(false)
      setDate({startDate, endDate})
  }, [setOpen, setDate])

  const ticketUpload=async()=>{
    const mode = "gallery"
    setIsLoading(true)
    await uploadImage(mode, userInfo, setTicketCopy); 
    setIsLoading(false)
  }
  const visaUpload=async()=>{
    const mode = "gallery"
    setIsLoading(true)
    await uploadImage(mode, userInfo, setVisaCopy); 
    setIsLoading(false)
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
    <SafeScreen>
      <ScrollView>
        <View style={FormStyles.Form}>
          <Text style={FormStyles.FormHeader}>Create Trip</Text>
          <Text>Total Trip KGs</Text>

          <TextInput style={FormStyles.Input} 
            value={availableWeight}
            onChangeText={text => setAvailableWeight(text)}
            keyboardType='numeric'
          
            />
          <Text>KG Price In UGX</Text>
          <TextInput style={FormStyles.Input} 
            keyboardType='numeric'
            value={weightPrice}
            onChangeText={text => setweightPrice(text)}
            />

          <Text>TicketCopy</Text>
          <ImagePlaceHolder source={ticketCopy}/>
          <TouchableOpacity style={FormStyles.button} onPress={ticketUpload}>
            {isLoading ? (<LoadingBox size="small" color="white"/>) : 
            (<Button icon="camera" textColor='white'>
              TicketCopy Photo
            </Button>)
            }
          </TouchableOpacity>

          <Text>VisaCopy</Text>
          <ImagePlaceHolder source={visaCopy}/>
          <TouchableOpacity style={FormStyles.button} onPress={visaUpload}>
            {isLoading ? (<LoadingBox size="small" color="white"/>) : 
            (<Button icon="camera" textColor='white'>
              VISA PHOTO
            </Button>)}
          </TouchableOpacity>

          <Text style={{padding: 8, fontWeight: 800, color:"red"}}>PLEASE SELECT DATES FOR WHEN YOU LEAVE AND TRAVEL BACK TO KAMPALA</Text>
            <TouchableOpacity style={FormStyles.button} onPress={() => setOpen(true)}>
              <Button icon="calendar" textColor='white'>
                {isLoading ? (<LoadingBox size="small" color="white"/>) : 
                (
                  <Button textColor='white'>SELECT TRIP DATES</Button>
                )}
              </Button>
            </TouchableOpacity>
          <DatePickerModal
            locale="en-GB"
            mode='range'
            visible={open}
            onDismiss={onDismiss}
            startDate={date.startDate}
            endDate={date.endDate}
            onConfirm={onConfirm}
          />
          <TouchableOpacity style={FormStyles.button} onPress={handleSubmit}>
              <Button textColor='white'>Submit</Button>
          </TouchableOpacity>
          </View>
    </ScrollView>
    </SafeScreen>
  )
}

export default CreateTrip
