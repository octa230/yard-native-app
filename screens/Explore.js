import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Text, View, SafeAreaView, RefreshControl, FlatList, TouchableOpacity } from 'react-native'
import SearchBar from '../components/ProductSearchBar'
import axios from 'axios'
import { url } from '../utils'
import Product from '../components/Product'
import CategoriesBar from '../components/CategoriesBar'
import LoadingBox from '../components/LoadingBox'
import ProductSearchBar from '../components/ProductSearchBar'
import { Ionicons } from '@expo/vector-icons';



const Explore = ({navigation}) => {
  const [products, setProducts ] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);




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

  const onRefresh = useCallback(()=> {
    setRefreshing(true)
    setTimeout(()=> {
      fetchData()
      setRefreshing(false)
    }, 2000)
  }, [])


  const scrollToTop = () => {
    // Scroll to the top of the FlatList
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const flatListRef = useRef(null); // Create a ref for the FlatList

  useEffect(()=>{
    fetchData()
    flatListRef.current = flatListRef;
  }, [])


  return isLoading ? (<LoadingBox/>):(
      <SafeAreaView style={{flex: 1, paddingBottom: 5}}>
        <View>
        <CategoriesBar categories={categories} navigation={navigation}/>
        <ProductSearchBar/>
      </View>
        <FlatList data={products}
          renderItem={({item})=> <Product product={item}/>}
          keyExtractor={(item)=> item._id}
          refreshControl={
          <RefreshControl refreshing={refreshing}
          onRefresh={onRefresh}
          /> 
        }
        
        />
        <TouchableOpacity
        //style={styles.floatingButton}
        onPress={() => {
          onRefresh();
          scrollToTop();
        }}
      >
      </TouchableOpacity>
      </SafeAreaView>
  )
}

export default Explore
