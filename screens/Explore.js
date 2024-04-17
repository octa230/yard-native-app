import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native'
import SearchBar from '../components/SearchBar'
import axios from 'axios'
import { url } from '../utils'
import Product from '../components/Product'
import CategoriesBar from '../components/CategoriesBar'



const Explore = () => {
  const [products, setProducts ] = useState([])
  const [categories, setCategories] = useState([])

  const fetchData = async()=> {
    try{
      const products = await axios.get(`${url}/products`)
      const categories = await axios.get(`${url}/category`)
      setCategories(categories.data)
      setProducts(products.data)
    //console.log(products)
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
        <CategoriesBar categories={categories}/>
      </View>
        <FlatList data={products}
        renderItem={({item})=> <Product product={item}/>}
        keyExtractor={(item)=> item._id}
        />
      </View>
  )
}

export default Explore
