import React from 'react'
import {View, Text, FlatList, TouchableOpacity, Button} from 'react-native'
import { buttonStyles, FormStyles } from '../styles'

const MyAddresses = ({navigation}) => {
  return (
    <View style={FormStyles.Form}>
      <Text>My Addresses</Text>
      <TouchableOpacity style={FormStyles.button} onPress={()=> navigation.navigate('shipping')}>
        <Text>
          Create New Address
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default MyAddresses
