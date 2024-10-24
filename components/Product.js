import React, { useContext, useState } from 'react';
import { Alert, View, Text, Image, Modal, Button as RNButton } from 'react-native';
import { Button, Card, IconButton } from 'react-native-paper';
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
    <Card style={{width: "100%", height: 170, margin: 4, backgroundColor: 'white'}}elevation={0.01} 
      onPress={()=> navigation.navigate('Product', { product })}>
      <Text numberOfLines={2} ellipsizeMode="tail" style={productStyles.cardHeader}>{product.name}</Text>
      <View style={{flexDirection: "row"}}>
      <View style={{width: "60%"}}>
        <Image source={{ uri: product.image }} style={{
          width: "100%", 
          height:100, 
          resizeMode:"contain",
        }} />
        </View>
        <Card.Content style={{width:"40%", flexDirection:"column"}}>
          <View>
            <Text style={productStyles.cardDetailText}>Stock: {product.inStock}</Text>
          </View>
          <View>
            <Text style={productStyles.cardDetailText}>AED: {product.aed}</Text>
            <Text style={productStyles.cardDetailText}>UGX: {product.ugx}</Text>
            <Button
              icon='basket' mode='contained' labelStyle={{ fontWeight:"800", textColor:"#004d25"}}
              onPress={()=> addToCartHandler(product)}
            >
              BUY
            </Button>
          </View> 
        </Card.Content>
      </View>
    </Card>
  );
});

export default Product;