import React, { useState } from 'react'
import axios from 'axios';
import { SearchBar } from '@rneui/themed'
import { url } from '../utils';


const ShopsSearchBar = ({onSearch}) => {
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`${url}/shops/q?searchQuery=${searchQuery}`);
      onSearch(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <SearchBar placeholder="search shop name"
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
export default ShopsSearchBar;