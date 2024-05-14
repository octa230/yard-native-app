import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { url } from '../utils'
import { Store } from '../Store'
import { buttonStyles, FormStyles } from '../styles'
import LoadingBox from '../components/LoadingBox'
import { Button } from 'react-native-paper'
import { shopStyles } from '../styles'
import SafeScreen from '../components/SafeScreen'

const ManageProducts = ({navigation}) => {


  const {state} = useContext(Store)
  const {userInfo} = state

  const [shops, setShops] = useState([])
  const [selectedShop, setSelectedShop] = useState('')
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  const getShops=async()=>{
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

  const getProducts =async()=>{
    try{
      setIsLoading(true)
      if(shops && shops.length > 0){
        const {data} = await axios.get(`${url}/shops/seller/${selectedShop ? selectedShop : shops[0]._id }/products`)
        setProducts(data)
      }
      //console.log(data)
    }catch(error){
      console.error(error)
    }
  }


  const deleteProduct = async(product)=>{
    await axios.delete(`${url}/products/${product._id}`, {
      headers:{
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    Alert.alert('DELETED!')
  }
  useEffect(()=> {
    if(userInfo && userInfo.seller){
      getShops()
      getProducts()
    }
    
  }, [selectedShop])


  
  return(
    <SafeScreen>
      <View style={{flexDirection: 'row', margin:12, alignItems:"center", justifyContent:"space-between"}}>
      <Text style={{fontWeight: 800}}>Select Shop</Text>
      <TouchableOpacity style={buttonStyles.button} onPress={()=> navigation.navigate('new-product')}>
        <Button icon="arrow-right" textColor='white'>
          Create Product
        </Button>
      </TouchableOpacity>
      </View>
      <View>
      <Picker
      style={FormStyles.Input}
      prompt='options'
      selectedValue={selectedShop}
      onValueChange={(item) => setSelectedShop(item)}
      >
      <Picker.Item label="Select" value="" />
    {shops && shops.length > 0 ? (
      shops.map((shop) => (
        <Picker.Item key={shop._id} label={shop.name} value={shop._id} />
      ))
    ) : (
      <Picker.Item label="No shops available" value="" />
    )}
  </Picker>
      </View>
      {isLoading ? (
        <LoadingBox/>
      ): products ? (
        <FlatList
        data={products}
        renderItem={({item})=> 
        <View style={shopStyles.container}>
            <View style={{maxWidth: 80, maxHeight: 30}}>
                <Text>{item.name || ""}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'space-between', alignItems:"center", flexDirection: "row"}}>
                <Button icon="pen" textColor='green' 
                    onPress={()=> {
                      navigation.navigate('new-product', {
                        item: item
                      })
                    }}
                    />
                <Text>{item.quantity}</Text>
                </View>
            <Image source={{uri: item.image || item.photo}}
              style={{maxWidth: 100, height: 100, width: 100, borderWidth: 1.5, borderColor: "white", objectFit: "scale-down", borderRadius: 8}}
            />
            <Button icon="trash-can" textColor='black' onPress={()=>deleteProduct(item)}/>
        </View>}
        keyExtractor={(item) => item._id}
      />
      ):(<Text>SELECT SHOP</Text>)}
    </SafeScreen>
  )
}

export default ManageProducts
