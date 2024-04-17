import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { url } from '../utils'
import Product from '../components/Product'

const ShopViewScreen = ({route}) => {
  const {shop} = route.params
  const [products, setProducts ] = useState([])

  const getData = async()=> {
    const {data} = await axios.get(`${url}/shops/${shop._id}/products`)
    setProducts(data)
  }
  useEffect(()=> {
    getData()
  }, [])
  return (
    <View>
      <Text style={{padding: 7, alignSelf:"center", fontSize: 21, color: "green", fontWeight: 800}} 
      >
        {shop.name}
      </Text>
        <FlatList data={products}
          renderItem={({item})=> <Product product={item}/>}
          keyExtractor={(item)=> item._id}
        />
    </View>
  )
}

export default ShopViewScreen
