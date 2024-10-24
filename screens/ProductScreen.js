import React, { useContext, useState } from 'react'
import {TouchableOpacity, ScrollView, Text, Image, View, StyleSheet, FlatList, Alert} from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Store } from '../Store'
import axios from 'axios'
import { url } from '../utils'




const ProductScreen = ({route}) => {
    const [selectedImage, setSelectedImage] = useState(null)
    const {state, dispatch: ctxDispatch} = useContext(Store)
    const {cart} = state

    const {product} = route.params;
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
    <ScrollView>
        <Image source={{uri: selectedImage || product.image}} style={{
            height: 400,
            width: "auto",
            resizeMode: "contain"
        }}/>
      <Text style={{fontWeight: 500}}>SELLER: {product.shopName}</Text>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.header}>UGX</Text>
          <Text>{product.ugx}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.header}>AED</Text>
          <Text>{product.aed}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.header}>STOCK</Text>
          <Text>{product.inStock}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.header}>BRAND</Text>
          <Text>{product.brand}</Text>
        </View>
    </View>
    <TouchableOpacity>
    <Button 
      onPress={() => addToCartHandler(product)} 
      textColor='white' 
      icon='basket'
      style={{backgroundColor: 'rgb(0, 100, 0)', margin: 3, padding:2, borderRadius: 4}}
    >
        ADD TO BASKET
      </Button>
    </TouchableOpacity>
    <FlatList data={product.images}
        horizontal
        renderItem={({item})=> (
            <TouchableOpacity onPress={()=> setSelectedImage(item)}>
            <Image source={{uri: item}}
                style={{height: 100, width: 100, margin: 3}}
                resizeMode='contain'
                keyExtractor={(item) => item}
            />
            </TouchableOpacity>
        )}
     />
    <Text style={styles.description}>
        {product.description}
    </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    iconButton: {
        backgroundColor: 'rgba(0, 100,0, 10)',
        borderRadius: 50,
        //margin: 5,
        padding: 6
      },
    image: {
      height: 200,
      width: 200,
      resizeMode: 'cover',
      marginBottom: 10,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
      
    },
    cell: {
      flex: 1,
      alignItems: 'center',
      borderColor: '#ccc',
      borderWidth: 0.5,
      padding: 4
    },
    header: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    description:{
        fontSize: 18,
        padding: 12,
        lineHeight: 22,
        backgroundColor:"white"

    }
  });
export default ProductScreen
