import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, Text, SafeAreaView, Image, Alert } from 'react-native'
import { url } from '../utils'
import { Store } from '../Store'
import { Picker } from '@react-native-picker/picker'
import { FormStyles } from '../styles'
import { Card } from 'react-native-paper'
import LoadingBox from '../components/LoadingBox'






const MyOrders = () => {
  const{state} = useContext(Store)
  const {userInfo} = state

  const [orders, setOrders] = useState([])
  const [shops, setShops] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedShop, setSelectedShop] = useState('')




  const getShops = async()=>{
    try{
      setIsLoading(true)
      const {data} = await axios.get(`${url}/shops/mine`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      })
      setShops(data)
      //console.log(data)
      setIsLoading(false)
    }catch(error){
      console.error(error)
    }
  }


  const getData = async()=> {
    try{
      const resource = `${url}/shops/${selectedShop}/orders`
      console.log(resource )

      if(shops && shops.length > 0){
        const {data} = await axios.get(`${url}/shops/${selectedShop ? selectedShop : shops[0]._id}/orders`, {
          headers:{
            Authorization: `Bearer ${userInfo.token}`
          }
        })
        setOrders(data)
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=> {
    if(userInfo && userInfo.seller){
      getShops()
      getData()
    }

  }, [selectedShop])


  return isLoading ? (<LoadingBox/>):(
      <SafeAreaView style={{flex: 1}}>
      <Picker
      style={FormStyles.Input}
      prompt='options'
      selectedValue={selectedShop}
      onValueChange={(item) => setSelectedShop(item)}>
        {shops && shops.length > 0 ? (
          shops.map((shop) => (
        <Picker.Item key={shop._id} label={shop.name} value={shop._id} />
      ))
    ) : (
      <Picker.Item label="No shops available" value="" />
    )}
    </Picker>
    <FlatList data={orders}
        renderItem={({ item }) => (
        <Card style={{padding: 2, margin: 12,}}>
        <Card.Content>
        <Text style={{ fontWeight: 'bold' }}>Order ID: {item._id}</Text>
        <Text>Processed: {item?.processed ? 'Yes' : 'No'}</Text>
        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Products:</Text>
        {item.products?.map(product => (
          <View key={product._id} style={{padding: 3, margin: 3, borderBottomWidth: 1, borderBottomColor: "black"}}>
            <Image source={{uri: product && product.image}} style={{height: 100, width: 100, borderRadius: 12, objectFit:"scale-down", marginBottom: 3}}/>
            <Text >{product.name} - Quantity: {product.quantity},{" " + " "} ugx: {product.ugx || product.price}</Text>
          </View>
        ))}
        <Text style={{padding: 2, margin: 3}}>Date: {new Date(item.createdAt).toDateString()}</Text>
      </Card.Content>
    </Card>
    )}
      keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  )
}

export default MyOrders
