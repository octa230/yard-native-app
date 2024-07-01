import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { url } from '../utils'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import SafeScreen from '../components/SafeScreen'

const ShopViewScreen = ({route}) => {
  const {shop} = route.params
  const [products, setProducts ] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getData = async()=> {
    setIsLoading(true)
    const {data} = await axios.get(`${url}/shops/${shop._id}/products`)
    setProducts(data)
    //console.log(data.length)
    setIsLoading(false)

  }
  useEffect(()=> {
    getData()
  }, [])
  return isLoading ? (<LoadingBox/>):
  (
    <SafeScreen>
      <View>
      <Text style={{padding: 7, alignSelf:"center", fontSize: 21, color: "green", fontWeight: 800}} 
      >
        {shop.name}
      </Text>
      </View>
        <FlatList data={products}
          renderItem={({item})=> <Product product={item}/>}
          keyExtractor={(item)=> item._id}
        />
    </SafeScreen>
  )
}

export default ShopViewScreen
