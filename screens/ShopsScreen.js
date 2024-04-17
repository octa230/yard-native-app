import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, FlatList } from 'react-native'
import SearchBar from '../components/SearchBar'
import axios from 'axios'
import { url } from '../utils'
import Shop from '../components/Shop'

const ShopsScreen = () => {
  const [shops, setShops] = useState([])

  const fetchData = async()=>{
    try{
      const shops = await axios.get(`${url}/shops`)
    setShops(shops.data)
    //console.log(shops)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchData()
  }, [])

  return (
      <View>
      <View>
        <SearchBar/>
      </View>
        <FlatList data={shops}
        renderItem={({item})=> <Shop shop={item}/>}
        keyExtractor={(item)=> item._id}
        />
      </View>
  )
}

export default ShopsScreen
