import React, { useState } from 'react'
import axios from 'axios';
import { SearchBar } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native';
import { url } from '../utils';


const ProductSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation()
  const handleSearch = async() => {
    try {
      const {data} = await axios.get(`${url}/products/q?searchQuery=${searchQuery}`);
      //console.log(response.data)
      navigation.navigate('Filter', { searchQuery: searchQuery});
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <SearchBar placeholder="search"
    onChangeText={setSearchQuery}
    value={searchQuery}
    platform="default"
    lightTheme
    onSubmitEditing={handleSearch}
    round
    containerStyle={{ backgroundColor: '#fff' }}
    inputContainerStyle={{ backgroundColor: '#f0f0f0' }}
  />
  )
};
export default ProductSearchBar;