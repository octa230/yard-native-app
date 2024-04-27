import React, { useEffect, useState } from 'react'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import LoadingBox from '../components/LoadingBox'
import Product from '../components/Product'
import { View, ScrollView, Text, SafeAreaView, FlatList} from 'react-native'
import axios from 'axios'
import { url } from '../utils'
import { Button } from 'react-native-paper'

const FilteringScreen = ({route, navigation}) => {


    const {category, subcategory} = route.params
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])


    const getData = async () => {
        try {
            setIsLoading(true)
            const queryParams = { subcategory };
            const query = new URLSearchParams(queryParams);

            const searchUrl = `${url}/products/q?${query}`
            console.log(searchUrl)
           
            const { data } = await axios.get(`${url}/products/q?${query}`); // Make the request
            //console.log('Response data:', data); // Log the response data
            setBrands(data.brands)
            setCategories(data.categories)
            setProducts(data.products)
    
            setIsLoading(false)
 
        } catch (error) {
            console.log('Error:', error);
        }
    }
    

    useEffect(()=> {
        getData()
    }, [])










  return isLoading ? (<LoadingBox/>):(
    <View>
        {/* <View style={{padding: 2, borderColor: "white", borderWidth: 1, marginVertical: 3, backgroundColor: "white"}}>
        <Text>Brands</Text>
        <ScrollView horizontal>
            {brands.map((brand)=> (
                <Button>
                    <Text key={brand}>{brand}</Text>
                </Button>
            ))}
        </ScrollView>
        </View>
        <View style={{padding: 2, borderRadius: 8, borderWidth: 1}}>
        <Text>Brands</Text>
        <ScrollView horizontal>
            {categories.map((brand)=> (
                <Button>
                    <Text key={brand}>{brand}</Text>
                </Button>
            ))}
        </ScrollView>
        </View> */}
        {products.length > 0 ? (
            <FlatList data={products}
            renderItem={({item})=> <Product product={item.product}/>}
            keyExtractor={(item)=> item.product._id}
        />
        ):(
            <Text>NO PRODUCTS ADDED YET</Text>
        )}
    </View>
  )
}

export default FilteringScreen
