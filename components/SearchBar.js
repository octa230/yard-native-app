import React from 'react'
import { TextInput, SafeAreaView, View } from 'react-native'
import Icon  from 'react-native-vector-icons/FontAwesome'
import { searchBarStyles } from '../styles'

const SearchBar = () => {
  return (
      <View style={searchBarStyles.searchInputContainer}>
        <Icon name="search" size={20} style={searchBarStyles.searchIcon} />
        <TextInput placeholder="Search" style={searchBarStyles.searchInput} />
      </View>
  )
}

export default SearchBar
