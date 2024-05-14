import React, { useCallback, useEffect, useState, useRef } from 'react'
import {Text, Image, View, SafeAreaView, RefreshControl, FlatList, TouchableOpacity } from 'react-native'
import SearchBar from '../components/ProductSearchBar'
import axios from 'axios'
import { url } from '../utils'
import Product from '../components/Product'
import CategoriesBar from '../components/CategoriesBar'
import LoadingBox from '../components/LoadingBox'
import ProductSearchBar from '../components/ProductSearchBar'



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
      const products = await axios.get(`${url}/products`)
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

  const onRefresh = useCallback(()=> {
    setRefreshing(true)
    setTimeout(()=> {
      fetchData()
      setRefreshing(false)
    }, 2000)
  }, [])



  const flatListRef = useRef(null); // Create a ref for the FlatList

  useEffect(()=>{
    fetchData()
    flatListRef.current = flatListRef;
  }, [])


  return isLoading ? (<LoadingBox/>):(
      <SafeAreaView style={{flex: 1}}>
        <CategoriesBar categories={categories} navigation={navigation}/>
        <ProductSearchBar/>
      <View style={{ flex: 1 }}>
        {/* Horizontal List of Showcase Items */}
        <FlatList
          data={showCase}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={{ margin: 4, paddingVertical: 8 }} 
              onPress={()=>{navigation.navigate(
              'Filter', {
                categoryName: item.name
              }
            )}}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ maxWidth: 40}}>
              {item.name}
            </Text>
              <Image
                style={{ width: 50, height: 50, borderRadius: 50 }}
                source={{ uri: item.icon }}
              />
            </TouchableOpacity>
          )}
        />

        {/* Vertical List of Products */}
        <FlatList
          data={products}
          renderItem={({ item }) => <Product product={item} />}
          keyExtractor={(item) => item._id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>
    </SafeAreaView>
  )
}

export default Explore
