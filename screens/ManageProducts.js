import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { url } from '../utils'
import { Store } from '../Store'
import { buttonStyles, FormStyles } from '../styles'
import LoadingBox from '../components/LoadingBox'
import { Button } from 'react-native-paper'

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
      setIsLoading(false)
    }catch(error){
      console.error(error)
    }
  }

  const getProducts =async()=>{
    try{
      setIsLoading(true)
      const {data} = await axios.get(`${url}/shops/seller/${selectedShop}/products`)
      setProducts(data)
    }catch(error){
      console.error(error)
    }
  }

  useEffect(()=> {
    getShops()
    if(selectedShop){
      getProducts()
    }
  }, [selectedShop])
  return(
    <SafeAreaView>
      <View style={{flexDirection: 'row', margin:12, alignItems:"center", justifyContent:"space-between"}}>
      <Text style={{fontWeight: 800}}>Select Shop</Text>
      <TouchableOpacity style={buttonStyles.button} onPress={()=> navigation.navigate('new-product')}>
        <Button icon="arrow-right" textColor='white'>
          Create Shop
        </Button>
      </TouchableOpacity>
      </View>
      <View>
        <Picker style={FormStyles.Input}
                  prompt='options'
                  selectedValue={selectedShop}
                  onValueChange={(item)=> setSelectedShop(item)}
                  >
                  {shops && shops.map(shop => (
                    <Picker.Item key={shop} label={shop.name} value={shop._id} 
                  />
                  ))}
          </Picker>
      </View>
      {isLoading ? (
        <LoadingBox/>
      ):(
        <FlatList
        data={products}
        renderItem={({product})=> 
        <View style={shopStyles.container}>
            <View style={{maxWidth: 80, maxHeight: 30}}>
                <Text>{product.name}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'space-between', alignItems:"center", flexDirection: "row"}}>
                <Button icon="pen" textColor='green' 
                    onPress={()=> {}}
                    />
                <Text>{item.quantity}</Text>
                </View>
            <Image source={{uri: product.image || product.photo}}
                style={{maxWidth: 100, height: 100, width: 100, borderWidth: 1, borderColor: "black", objectFit:"contain"}}
            />
            <Button icon="trash-can" textColor='black'/>
        </View>}
        keyExtractor={(item) => item._id}
      />
      )}
    </SafeAreaView>
  )
}

export default ManageProducts
