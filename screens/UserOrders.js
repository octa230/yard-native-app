import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import LoadingBox from '../components/LoadingBox'
import { Store } from '../Store'
import axios from 'axios'
import { url } from '../utils'

const UserOrders = () => {

  const {state} = useContext(Store)
  const {userInfo} = state

  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
        style={{ borderBottomWidth: 1, padding: 10, backgroundColor:"#fafafa", borderColor:"#fafafa", borderRadius: 8, margin: 22 }}
      >
        <Text>ID: {item._id}</Text>
        <Text>DATE: {item.createdAt.substring(0, 10)}</Text>
        <Text>TOTAL: {item.totalPrice.toFixed(2)}</Text>
        <Text>PAID: {item.isPaid ? item.paidAt.substring(0, 10) : 'No'}</Text>
        <Text>DELIVERED: {item.isDelivered ? item.deliveredAt.substring(0, 10) : 'No'}</Text>
      </TouchableOpacity>
    );
  
  useEffect(()=> {
    fetchData()
  }, [userInfo])
  
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
