import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, Text, SafeAreaView, Image, Alert } from 'react-native'
import { url } from '../utils'
import { Store } from '../Store'
import { Picker } from '@react-native-picker/picker'
import { FormStyles } from '../styles'
import { Card } from 'react-native-paper'
import LoadingBox from '../components/LoadingBox'
import SafeScreen from '../components/SafeScreen'






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
      //const resource = `${url}/shops/${selectedShop}/orders`
      //console.log(resource )

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
  <View style={{backgroundColor:"white"}}>
    <FlatList data={orders}
        ListHeaderComponent={
          <Picker
      style={FormStyles.Input}
      prompt='options'
      selectedValue={selectedShop}
      onValueChange={(item) => setSelectedShop(item)}>
      <Picker.Item label="Select" value="" />
        {shops && shops.length > 0 ? (
          shops.map((shop) => (
        <Picker.Item key={shop._id} label={shop.name} value={shop._id} />
      ))
    ) : (
      <Picker.Item label="No shops available" value="" />
    )}
    </Picker>
        }
        renderItem={({ item }) => (
        <Card style={{width: "100%", marginVertical: 3, borderWidth: 0.09, borderColor:"green", backgroundColor:"white", borderRadius: 2}} >
        <Card.Title title={`ID:${item._id}`} titleVariant="headlineSmall"/>
        <Card.Title title={`DELIVERED:${ item.processed ? 'YES' : 'NO'}`} titleVariant="headlineSmall"/>
        <Card.Content>
          {item.products?.map(product => (
          <View key={product._id} style={{padding: 3, margin: 2, borderBottomWidth: 1, borderBottomColor: "black"}}>
            <Text ellipsizeMode='tail' numberOfLines={1}>{product.name}</Text> 
            <Card.Cover source={{uri: product && product.image}} 
              style={{height: 50, width: 50, borderRadius: 12, objectFit:"scale-down", marginBottom: 3}}/>
            <View style={{justifyContent:"space-between", width:"100%", flexDirection:"row", flexWrap:"wrap"}}>
            <Text>Quantity: {product.quantity},{" " + " "}</Text>
            <Text>ugx: {product.ugx || product.price}</Text>
            </View>
          </View>
        ))}
        <Text style={{padding: 2, margin: 3}}>Date: {new Date(item.createdAt).toDateString()}</Text>
      </Card.Content>
    </Card>
    )}
      keyExtractor={(item) => item._id}
    />
    </View>
  )
}

export default MyOrders
