import React, { useState, useEffect } from 'react'
import { View, FlatList, SafeAreaView } from 'react-native'
import SearchBar from '../components/ProductSearchBar'
import axios from 'axios'
import { url } from '../utils'
import Shop from '../components/Shop'
import LoadingBox from '../components/LoadingBox'
import SafeScreen from '../components/SafeScreen'

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
    <SafeScreen>
      <View style={{flex: 1}}>
        <FlatList data={shops}
        renderItem={({item})=> <Shop shop={item}/>}
        keyExtractor={(item)=> item._id}
        />
      </View>
    </SafeScreen>
  )
}

export default ShopsScreen
