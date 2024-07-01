import React, { useEffect, useState } from 'react'
import LoadingBox from '../components/LoadingBox'
import Product from '../components/Product'
import { View, Text, FlatList} from 'react-native'
import axios from 'axios'
import { url } from '../utils'
import SafeScreen from '../components/SafeScreen'

const FilteringScreen = ({route}) => {


    const {categoryName, category, subcategory, searchQuery} = route.params
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])
    //const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])


    const getData = async () => {
        try {
          setIsLoading(true);
          const queryParams = new URLSearchParams();
          if (category) queryParams.append('category', category);
          if (subcategory) queryParams.append('subcategory', subcategory);
          if (searchQuery) queryParams.append('searchQuery', searchQuery);
          if (categoryName) queryParams.append('categoryName', categoryName);

          const searchUrl = `${url}/products/q?${queryParams}`;
          //console.log('Search URL:', searchUrl);
    
          const { data } = await axios.get(searchUrl);
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
    <View>
        {products.length > 0 ? (
            <FlatList data={products}
            renderItem={({item})=> <Product product={item.product}/>}
            keyExtractor={(item)=> item.product._id}
        />
        ):(
          <Text style={{alignSelf:"center", paddingVertical: 22}}>NO PRODUCTS ADDED YET</Text>
        )}
    </View>
  )
}

export default FilteringScreen
