import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import LoadingBox from '../components/LoadingBox'
import { Store } from '../Store'
import axios from 'axios'
import { url } from '../utils'
import { Button } from 'react-native-paper'

const UserOrders = () => {

  const {state} = useContext(Store)
  const {userInfo} = state

  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [updatedOrder, setUpdatedOrder] = useState(null)

  const changeOrderStatus = async(order)=>{
    if(!order.isCanceled){
      const {data} = await axios.put(`${url}/orders/${order._id}/deliver`, null, 
    {
      headers:{
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    setUpdatedOrder(data)
    Alert.alert('DONE') 
    }else{
      Alert.alert('ORDER ALREADY CANCELED')
    }
  }


  const cancelOrder = async(order)=>{
    if(!order.isDelivered){
      const {data} = await axios.put(`${url}/orders/${order._id}/cancel`, null, {
        headers:{
          Authorization: `Bearer ${userInfo.token}`
        }
      }) 
      setUpdatedOrder(data)
      Alert.alert('CANCELED')
    }else{
      Alert.alert('ORDER ALREADY DELIVERED')
    }
    
  }

  const fetchData = async()=>{
    try{
      setIsLoading(true)
      const {data} = await axios.get(`${url}/orders/mine`, {
        headers:{
          Authorization: `Bearer ${userInfo.token}`
        }
      })
      setOrders(data)
      setIsLoading(false)
    }catch(error){
      console.log(error)
    }
  }

  const renderOrderItem = ({ item }) => (
      <TouchableOpacity
        style={{ borderBottomWidth: 1, padding: 10, backgroundColor:"#fafafa", borderColor:"#fafafa", borderRadius: 8, margin: 12 }}
      >
        <Text>ID: {item._id}</Text>
        <Text>DATE: {item.createdAt.substring(0, 10)}</Text>
        <Text>TOTAL: {item.totalPrice.toFixed(2)}</Text>
        <Text>PAID: {item.isPaid ? item.paidAt.substring(0, 10) : 'No'}</Text>
        <Text>DELIVERED: {item.isPaid ? item.paidAt.substring(0, 10) : 'No'}</Text>
        <Text>TRIP WEIGHT (KGS): {item.trip ? item.trip.bookedWeight : 'NO TRIP'}</Text>

        <View style={{flexDirection: "row", justifyContent:"space-around", marginVertical: 12}}>

          <Button icon='check-all'buttonColor='#097969' textColor='white' onPress={()=>changeOrderStatus(item)}>
            {item.isDelivered ? 'DONE' : 'DELIVERED'}
          </Button>
          <Button icon="cancel" buttonColor='#D70040' textColor='white' onPress={()=> cancelOrder(item)}>
            {item.isCanceled ? "CANCELED" : "CANCEL"}
          </Button>
        </View>
      </TouchableOpacity>
    );
  
  useEffect(()=> {
    fetchData()
  }, [userInfo, updatedOrder])
  
  return isLoading ? (<LoadingBox/>):(
    <View style={{flex: 1}}>
      {orders.length > 0 ? (
        <FlatList data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item)=> item._id}
        />
      ): (<Text style={{alignSelf: "center"}}>NO ORDERS YET</Text>)}
    </View>
  )
}

export default UserOrders
