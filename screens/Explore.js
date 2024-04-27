import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native'
import SearchBar from '../components/SearchBar'
import axios from 'axios'
import { url } from '../utils'
import Product from '../components/Product'
import CategoriesBar from '../components/CategoriesBar'
import LoadingBox from '../components/LoadingBox'



const Explore = ({navigation}) => {
  const [products, setProducts ] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');




  const handleSearch=async(query)=>{
    setSearchQuery(query)
    const results = products.filter((product)=> {
      product.name.toLowerCase().includes(query.toLowerCase())
    })
    //setProducts(results)
  }


  const fetchData = async()=> {
    try{
      setIsLoading(true)
      const products = await axios.get(`${url}/products`)
      const categories = await axios.get(`${url}/category`)
      setCategories(categories.data)
      setProducts(products.data)
      setIsLoading(false)
    //console.log(products)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchData()
  }, [])


  return isLoading ? (<LoadingBox/>):(
      <SafeAreaView style={{flex: 1, paddingBottom: 5}}>
        <View>
        <CategoriesBar categories={categories} navigation={navigation}/>
      </View>
        <FlatList data={products}
        renderItem={({item})=> <Product product={item}/>}
        keyExtractor={(item)=> item._id}
        />
      </SafeAreaView>
  )
}

export default Explore
