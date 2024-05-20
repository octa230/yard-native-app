import React, { useContext } from 'react'
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native'
import { Button } from 'react-native-paper'
import Icon  from 'react-native-vector-icons/FontAwesome5'
import { shopStyles } from '../styles'
import { useNavigation } from '@react-navigation/native'


const Shop = (props) => {
    const {shop} = props
    const navigation = useNavigation()

  

    
  return (
    <TouchableOpacity style={shopStyles.container} onPress={()=> navigation.navigate('Shop', {
      shop
    })}>
      <Image source={{uri: `${shop.logo ? shop.logo 
        : "https://res.cloudinary.com/dxcnizqeq/image/upload/v1705585082/xyocibbonj5rbuqzf14m.png"}`}}
      style={{height: 20, width: 20, padding:22, borderRadius: 50}}
      />
      <View style={shopStyles.details}>
        <Text>Name: {shop.name}</Text>
        <Text>Industry: {shop.industry}</Text>
        <Text>Country:{shop.country}</Text>
        <Text>Area: {shop.area ? shop.area : 'Not specified'}</Text>
      </View>
      <Button>
        <Icon name="angle-right" />
      </Button>
    </TouchableOpacity>
  )
}

export default Shop
