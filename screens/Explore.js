import React, { useCallback, useEffect, useState, useRef } from 'react'
import {Text, Image, FlatList, TouchableOpacity } from 'react-native'
import SearchBar from '../components/ProductSearchBar'
import SafeScreen from '../components/SafeScreen'
import axios from 'axios'
import { url } from '../utils'
import Product from '../components/Product'
import CategoriesBar from '../components/CategoriesBar'
import LoadingBox from '../components/LoadingBox'
import ProductSearchBar from '../components/ProductSearchBar'
import { Card } from 'react-native-paper'
import { productStyles } from '../styles'



const Explore = ({navigation}) => {
  const [products, setProducts ] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showCase, setShowCase] = useState([])



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
      const products = await axios.get(`${url}/products/featured`)
      const categories = await axios.get(`${url}/category`)
      const showCase = await axios.get(`${url}/category/showcase`)
      setShowCase(showCase.data)
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
    <SafeScreen style={{flex: 1}}>
      <CategoriesBar categories={categories} navigation={navigation}/>
        <ProductSearchBar/>
        
        <FlatList
          data={showCase}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity style={{margin: 4}}>
              <Card style={{ padding: 8, backgroundColor:"white" }} 
              onPress={()=>{navigation.navigate(
              'Filter', {
                categoryName: item.name
              }
            )}}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={{ maxWidth: 100}}>
              {item.name}
            </Text>
              <Image
                style={{ width: 100, height: 100, borderRadius: 50 }}
                source={{ uri: item.icon }}
              />
            </Card>
            </TouchableOpacity>
          )}
        />   
        <Text style={productStyles.cardHeader}>FEATURED PRODUCTS</Text>
      <FlatList data={products}
        horizontal
        renderItem={({item})=> <Product product={item}/>}
      />      
  
    </SafeScreen>
  )
}

export default Explore
