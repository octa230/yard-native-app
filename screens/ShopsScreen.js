import React, { useState, useEffect } from 'react'
import { View, FlatList, SafeAreaView } from 'react-native'
import SearchBar from '../components/SearchBar'
import axios from 'axios'
import { url } from '../utils'
import Shop from '../components/Shop'
import LoadingBox from '../components/LoadingBox'

const ShopsScreen = () => {
  const [shops, setShops] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchData = async()=>{
    try{
      setIsLoading(true)
      const shops = await axios.get(`${url}/shops`)
    setShops(shops.data)
    setIsLoading(false)
    //console.log(shops)
    }catch(error){
      console.log(error)
    }
  }



  useEffect(()=>{
    fetchData()
  }, [])

  return isLoading ? (<LoadingBox/>) : 
  (
      <SafeAreaView style={{flex: 1, paddingBottom: 5}}>
      <View>
        <FlatList />
      </View>
        <FlatList data={shops}
        renderItem={({item})=> <Shop shop={item}/>}
        keyExtractor={(item)=> item._id}
        />
      </SafeAreaView>
  )
}

export default ShopsScreen
