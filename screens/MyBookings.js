import axios from 'axios'
import React, { useEffect, useContext, useState} from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import { url } from '../utils'
import { Store } from '../Store'
import LoadingBox from '../components/LoadingBox'
import { TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'


const MyBookings = () => {

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedBooking, setupdatedBooking] = useState(null)



  const markDelivered = async(booking)=> {
   try{
    const {data} = await axios.put(`${url}/transporters/${booking._id}/status`, null, {
      headers:{
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    setupdatedBooking(data)
   }catch(error){
    console.log(error)
   }
  }

  useEffect(() => {
    const getData = async () => {
      if (!userInfo || userInfo.transporter) {
        Alert.alert("Activate Transporter Account!");
        return;
      } else {
        setIsLoading(true);
        try {
          const { data } = await axios.get(`${url}/transporters/bookings`, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`
            }
          });
          //console.log(data)
          setBookings(data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getData();
  }, [updatedBooking]);


  const renderBooking = ({ item }) => (
    <TouchableOpacity
      style={{ borderBottomWidth: 1, padding: 10, backgroundColor:"#fafafa", borderColor:"#fafafa", borderRadius: 8, margin: 12 }}
    >
      <Text>ID: {item._id}</Text>
      <Text>FROM K'LA: {new Date(item.arrivalDate).toDateString()}`</Text>
      <Text>BACK TO K'LA: {new Date(item.departureDate).toDateString()}`</Text>
      <Text>TOTAL: {item.tripBill}</Text>
      <Text>PAID: {item.isPaid ? item.paidAt.substring(0, 10) : 'No'}</Text>
      <Text>DELIVERED: {item.isPaid ? item.paidAt.substring(0, 10) : 'No'}</Text>
      <Text>TRIP WEIGHT (KGS): {item.bookedWeight? item.bookedWeight : 'NO TRIP'}</Text>

      <View style={{flexDirection: "row", justifyContent:"space-around", marginVertical: 12}}>
        {!item.delivered ? (
          <Button icon="cancel" buttonColor='#D70040' textColor='white' onPress={()=> markDelivered(item)}>
            MARK DELIVERED
        </Button>
        ):(
          <Button icon='check-all'buttonColor='#097969' textColor='white'>
            DONE
          </Button>
        )}
      </View>
    </TouchableOpacity>
  );

  return isLoading ? (
    <LoadingBox />
  ) : (
    <View>
      {bookings.length > 0 ? (
        <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item._id} // Assuming _id is unique for each booking
      />
      ): (
        <Text style={{alignSelf: "center"}}>NO ORDERS YET</Text>
      )}
    </View>
  );
};

export default MyBookings;
