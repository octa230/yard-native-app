import React, { useContext } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { Store } from '../Store'
import { buttonStyles, shopStyles } from '../styles'
import { Button } from 'react-native-paper'
import axios from 'axios'
import { url } from '../utils'

const Cart = ({navigation}) => {
    const {state, dispatch: ctxDispatch} = useContext(Store)

    const {cart: {cartItems}} = state

    const removeItemHandler = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item._id });
    };


    const updateCartHandler = async (item, quantity) => {
        try{
          const { data } = await axios.get(`${url}/products/${item._id}`);
          if (data.inStock < quantity) {
          window.alert('Sorry. Product is out of stock');
          return;
        }
        ctxDispatch({
          type: 'ADD_CART_ITEM',
          payload: { ...item, quantity },
        });
        }catch(error){
          console.log(error)
        }
      };
  return (
    <View>
      <FlatList
        data={cartItems}
        renderItem={({item})=> 
        <View style={shopStyles.container}>
            <View style={{maxWidth: 80, maxHeight: 30}}>
                <Text>{item.name}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'space-between', alignItems:"center", flexDirection: "row"}}>
                <Button icon="minus" textColor='green' 
                    onPress={()=> updateCartHandler(item, item.quantity - 1)}
                    />
                <Text>{item.quantity}</Text>
                <Button icon="plus" textColor='green'
                    onPress={()=> updateCartHandler(item, item.quantity + 1)}
                />
                </View>
            <Image source={{uri: item.image || item.photo}}
                style={{maxWidth: 100, height: 100, width: 100, borderWidth: 1, borderColor: "black", objectFit:"contain"}}
            />
            <Button icon="trash-can" textColor='black' onPress={()=> removeItemHandler(item)}/>
        </View>}
        keyExtractor={(item) => item._id}
      />
      <View style={{padding: 22, borderWidth: 1, borderColor:"#fefefe", borderRadius: 12, margin: 20}}>
        <Text>
        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
            items) : UGX: 
            {cartItems.reduce((a, c) => a + c.ugx || c.price * c.quantity, 0)}
        </Text>
      </View>
      <TouchableOpacity style={buttonStyles.button} onPress={()=> navigation.navigate('shipping')}>
        <Button textColor='white'
            icon="arrow-right">
                Proceed
            </Button>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('UGYARD')}>
        <Button textColor='black'
            icon="arrow-left">
                ADD ITEMS
            </Button>
      </TouchableOpacity>
    </View>
  )
}

export default Cart
