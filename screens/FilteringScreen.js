import React, { useEffect, useState } from 'react'
import LoadingBox from '../components/LoadingBox'
import Product from '../components/Product'
import { View, Text, FlatList} from 'react-native'
import axios from 'axios'
import { url } from '../utils'
import SafeScreen from '../components/SafeScreen'

const FilteringScreen = ({route}) => {


    const {category, subcategory, searchQuery} = route.params
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])


    const getData = async () => {
        try {
          setIsLoading(true);
          const queryParams = {};
          if (subcategory) queryParams.subcategory = subcategory;
          if (searchQuery) queryParams.searchQuery = searchQuery;
        
          const query = new URLSearchParams(queryParams);
          const searchUrl = `${url}/products/q?${query}`;
          //console.log('Search URL:', searchUrl);
    
          const { data } = await axios.get(searchUrl);
          //console.log('Response data:', data);
          //setBrands(data.brands);
          setCategories(data.categories);
          setProducts(data.products);
    
          setIsLoading(false);
        } catch (error) {
          console.log('Error:', error);
        }
      };

    useEffect(()=> {
        getData()
    }, [])










  return isLoading ? (<LoadingBox/>):(
    <SafeScreen>
        {products.length > 0 ? (
            <FlatList data={products}
            renderItem={({item})=> <Product product={item.product}/>}
            keyExtractor={(item)=> item.product._id}
        />
        ):(
            <Text>NO PRODUCTS ADDED YET</Text>
        )}
    </SafeScreen>
  )
}

export default FilteringScreen
