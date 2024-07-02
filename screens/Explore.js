import React, { useCallback, useEffect, useState } from 'react'
import {Text, Image, FlatList, TouchableOpacity, View, ScrollView } from 'react-native'
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
import { FontAwesome5 } from '@expo/vector-icons'; 



const Explore = ({navigation}) => {
  const [products, setProducts ] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showCase, setShowCase] = useState([])



  //const navigation = useNavigation()
  

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
    <SafeScreen>
      <ScrollView>
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
      <View style={{display: "flex", justifyContent:"space-between", flexDirection:"row", flexWrap:"wrap", padding: 4}}>
      <Card 
        style={{width: "48%", margin: 2, height: 150, backgroundColor:"white",  justifyContent:"center",}}>
        <Card.Title title="COOKED FOOD"/>
        <FontAwesome5 name='hamburger' size={50} style={{alignSelf:"center"}} color={'#004d25'}/>
      </Card> 
      <Card style={{width: "48%", margin: 2, height: 150, backgroundColor:"white",  justifyContent:"center",}}>
        <Card.Title title="RAW FOOD"/>
        <FontAwesome5 name='mortar-pestle' size={50} style={{alignSelf:"center"}} color={'#004d25'}/>
      </Card> 
      <Card style={{width: "48%", margin: 2, height: 150, backgroundColor:"white",  justifyContent:"center"}}>
        <Card.Title title="SELL ON UGYARD"/>
        <FontAwesome5 name='money-bill' size={50} style={{alignSelf:"center"}} color={'#004d25'}/>
      </Card> 
      <Card style={{width: "48%", margin: 2, height: 150, backgroundColor:"white",  justifyContent:"center"}}>
        <Card.Title title="TRANSPORT ON UGYARD"/>
        <FontAwesome5 name='plane-departure' size={50} style={{alignSelf:"center"}} color={'#004d25'}/>
      </Card> 
      <Card style={{width: "48%", margin: 2, height: 150, backgroundColor:"white",  justifyContent:"center"}}>
        <Card.Title title="STORES UAE"/>
        <FontAwesome5 name='store-alt' size={50} style={{alignSelf:"center"}} color={'#004d25'}/>
      </Card> 
      <Card style={{width: "48%", margin: 2, height: 150, backgroundColor:"white",  justifyContent:"center"}}>
        <Card.Title title="STORES KAMPALA"/>
        <FontAwesome5 name='warehouse' size={50} style={{alignSelf:"center"}} color={'#004d25'}/>
      </Card> 
        </View>    
      </ScrollView>
  
    </SafeScreen>
  )
}

export default Explore
