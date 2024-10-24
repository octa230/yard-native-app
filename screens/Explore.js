import React, { useCallback, useEffect, useState } from 'react'
import {Text, Image, FlatList, TouchableOpacity, View, ScrollView } from 'react-native'
import axios from 'axios'
import { url } from '../utils'
import Product from '../components/Product'
import CategoriesBar from '../components/CategoriesBar'
import LoadingBox from '../components/LoadingBox'
import ProductSearchBar from '../components/ProductSearchBar'
import { Card } from 'react-native-paper'


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
    <View>
      <CategoriesBar categories={categories} navigation={navigation}/>
        <ProductSearchBar/> 
        <ScrollView>
        <View style={{flexDirection:"row", flexWrap:"wrap", justifyContent: "space-between"}}>
        {showCase.map((item, index)=> (
          <TouchableOpacity style={{margin: 3, width: '30%'}} key={index}>
          <Card style={{ padding: 5, backgroundColor:"white", borderRadius: 5}} mode='contained'
            onPress={()=>{navigation.navigate(
            'Filter', {
              categoryName: item.name
            }
          )}}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={{fontWeight: "800", color:"#517067" }}>
              {item.name}
            </Text>
            <Card.Cover
              style={{ width: 50, height: 50, borderRadius: 50, alignSelf:"center"}}
              source={{ uri: item.icon }}
            />
          </Card>
          </TouchableOpacity>
          ))}
        </View>
        
        </ScrollView>
    </View>
  )
}

export default Explore
