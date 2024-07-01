import React, { useState, useEffect } from 'react'
import { View, FlatList, Text } from 'react-native'
import SearchBar from '../components/ProductSearchBar'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
import { url } from '../utils'
import Shop from '../components/Shop'
import LoadingBox from '../components/LoadingBox'
import SafeScreen from '../components/SafeScreen'
import { FormStyles } from '../styles'
import ShopsSearchBar from '../components/ShopsSearchBar'

const ShopsScreen = () => {
  const [shops, setShops] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [data, setData] = useState(null)
  const [area, setArea] = useState('')
  const [country, setCountry] = useState('')
  const [industry, setIndustry] = useState('')

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const params = {};
      if (searchQuery) {
        params.searchQuery = searchQuery;
      }
      if (country) {
        params.country = country;
      }
      if (industry) {
        params.category = industry;
      }
      if (area) {
        params.area = area;
      }
  
      let response;
      if (Object.keys(params).length > 0) {
        response = await axios.get(`${url}/shops/q`,{
          params:{
          searchQuery,
          country,
          category: industry,
          area
          }
        });
      } else {
        response = await axios.get(`${url}/shops`);
        const { data } = await axios.get(`${url}/shops/get-fields`)
        setData(data)
      }
  
      setShops(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSearch = (searchResults) => {
    setShops(searchResults); // Update the shops state with the fetched data
  };

  useEffect(()=>{
    fetchData()
  }, [area, industry, country, searchQuery])

  return isLoading ? (<LoadingBox/>) : 
  (
    <SafeScreen>
    <ShopsSearchBar onSearch={handleSearch}/>
    <View style={{display: 'flex', justifyContent:"space-evenly", flexDirection:"row", alignItems:"center"}}>
  <View style={{padding: 8}}>
    <Text>Country</Text>
  <Picker
    style={FormStyles.Input}
    prompt='options'
    selectedValue={country}
    onValueChange={(item) => setCountry(item)}
    >
    {data && data.countries &&(
      data?.countries.map((country) => (
        <Picker.Item key={country} label={country} value={country} />
      ))
    )}
  </Picker>
  </View>
  <View style={{padding: 8}}>
    <Text>Category</Text>
  <Picker
    style={FormStyles.Input}
    prompt='options'
    selectedValue={industry}
    onValueChange={(item) => setIndustry(item)}
  >
    {data && data.industries && (
      data.industries.map((industry) => (
        <Picker.Item key={industry} label={industry} value={industry} />
      ))
    )}
  </Picker>
  </View>
  <View style={{padding: 8}}>
    <Text>Select Area</Text>
  <Picker
    style={FormStyles.Input}
    prompt='options'
    selectedValue={area}
    onValueChange={(item) => setArea(item)}
  >
    {data && data.areas && (
      data.areas.map((area) => (
        <Picker.Item key={area} label={area} value={area} />
      ))
    )}
  </Picker>
  </View>
</View>
    <FlatList data={shops}
      renderItem={({item})=> <Shop shop={item}/>}
      keyExtractor={(item)=> item._id}
    />
   </SafeScreen>
  )
}

export default ShopsScreen
