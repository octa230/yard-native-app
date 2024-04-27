import React, { useState } from 'react'
import { TextInput, FlatList, View } from 'react-native'
import Icon  from 'react-native-vector-icons/FontAwesome'
import { searchBarStyles } from '../styles'



const SearchBar = ({ placeholder, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (text) => {
    setSearchQuery(text);

    // Perform search logic
    if (onSearch) {
      const results = onSearch(text);
      setSearchResults(results);
    }
  };

  return (
    <View style={searchBarStyles.container}>
      <View style={searchBarStyles.searchInputContainer}>
        <Icon name="search" size={20} style={searchBarStyles.searchIcon} />
        <TextInput
          placeholder={placeholder}
          style={searchBarStyles.searchInput}
          onChangeText={handleSearch}
        />
      </View>
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <Text>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : null}
    </View>
  );
};
export default SearchBar;