import React, { useContext, useState } from 'react';
import { Alert, View, Text, Image, Modal, Button as RNButton } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { url } from '../utils';
import { Store } from '../Store';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { productStyles } from '../styles';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Product = React.memo(({ product }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const navigation = useNavigation()

  const addToCartHandler = async (item) => {
    try {
      const existItem = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(`${url}/products/${item._id}`);
      if (data.inStock < quantity) {
        Alert.alert('Sorry. Product is out of stock');
        return;
      }
      ctxDispatch({
        type: 'ADD_CART_ITEM',
        payload: { ...item, quantity },
      });
      Alert.alert('DONE! VIEW CART');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Card style={productStyles.container} elevation={0.02} onPress={()=> navigation.navigate('Product', {
      product
      })}>
        <View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={productStyles.cardHeader}>{product.name}</Text>
        <Image source={{ uri: product.image }} style={{
          //width: "100%", 
          height:200, 
          resizeMode:"contain",
        }} />
        <View style={productStyles.overlay}>
        <IconButton
            icon={()=> <FontAwesome5 name={'plus'} mode="contained" color={'white'} size={23}
            style={productStyles.iconButton}
            onPress={() => addToCartHandler(product)}/>}
          />            
          <IconButton
            icon={()=> <FontAwesome5 name={'eye'} mode="contained" color={'white'} size={23}
            style={productStyles.iconButton}
            onPress={() => {navigation.navigate('Product', {product})}}/>}
          />      
        </View>
        </View>
        <Card.Content>
          <View style={productStyles.cardDetails}>
            <Text style={productStyles.cardDetailText}>Brand: {product.brand}</Text>
            <Text style={productStyles.cardDetailText}>Stock: {product.inStock}</Text>
          </View>
          <View style={productStyles.cardDetails}>
            <Text style={productStyles.cardDetailText}>AED: {product.aed}</Text>
            <Text style={productStyles.cardDetailText}>UGX: {product.ugx}</Text>
          </View>      
        </Card.Content>
    </Card>
  );
});

export default Product;