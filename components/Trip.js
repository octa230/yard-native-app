import React, { useContext, useState } from 'react'
import { View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Text} from 'react-native-paper';
import { Store } from '../Store';
import axios from 'axios';
import { url } from '../utils';
import { buttonStyles } from '../styles';



const Trip = (props) => {
   const {trip} = props


   const {state, dispatch: ctxDispatch} = useContext(Store)
   const {cart} = state

   //const [trip, setTrip] = useState(0)
   const [bookedWeight, setBookedWeight] = useState(0)



   const bookTripHandler =async(trip, quantity)=>{
    const {data} = await axios.get(`${url}/trips/${trip._id}`) 
    if(data.availableWeight < bookedWeight){
      Alert.alert('BOOK LESSER WEIGHT')
      return
    }
    ctxDispatch({type:"BOOK_TRIP", payload:{...data, quantity}})
    Alert.alert('DONE! VIEW CART')
   }



  return <Card style={{ margin: 8, maxHeight:300, backgroundColor:"white"}}>
      <Card.Title title = {trip.approved ? "APPROVED" : "NOT APPROVED!"} />
      <Card.Content style={{paddingVertical: 2}}>
        <Text variant="bodyMedium" style={{color:"green", fontWeight: 800}}>
          FROM K'LA: {new Date(trip.departureDate).toDateString()}
        </Text>
        <Text variant="bodyMedium" style={{color: "red", fontWeight: 800}}>
          BACK TO K'LA: {new Date(trip.arrivalDate).toDateString()}
        </Text>
        <Text variant="bodyMedium" style={{color: "red", fontWeight: 800}}>
          PRICE PER KG: {trip.weightPrice}
        </Text>
        <Text variant="bodyMedium" style={{color: "red", fontWeight: 800}}>
          KGS LEFT: {trip.availableWeight}
        </Text>
        <TextInput style={{borderColor: "#fafafa", borderWidth: 1.5, borderRadius: 6, padding: 5, backgroundColor:"white", marginVertical: 2}}
            keyboardType='numeric'
            placeholder='type trip weight in kilos'
            onChangeText={(text)=> setBookedWeight(text)}
        />
      </Card.Content>
      <Card.Actions>
        <TouchableOpacity style={{padding: -21, borderRadius: 22, borderColor: "white", borderWidth: 1.5, backgroundColor:"#E5E4E2"}}>
        <Button onPress={()=> bookTripHandler(trip, bookedWeight)}>Book</Button>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: -21, borderRadius: 22, borderColor: "white", borderWidth: 1.5, backgroundColor:"#9FE2BF"}}>
          <Button   onPress={()=> { ctxDispatch({type:"UNBOOK_TRIP"})}}>Cancel</Button>
        </TouchableOpacity> 
      </Card.Actions>
    </Card>

}

export default Trip
