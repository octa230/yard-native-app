import React, { useContext } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { Store } from '../Store'
import { buttonStyles, FormStyles} from '../styles'
import { Button, Card, Badge } from 'react-native-paper'
import axios from 'axios'
import { url } from '../utils'
import SafeScreen from '../components/SafeScreen'

const Cart = ({navigation}) => {
    const {state, dispatch: ctxDispatch} = useContext(Store)

    const {cart: {cartItems, trip, shippingAddress}} = state

    const removeItemHandler = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item._id });
    };


    const updateCartHandler = async (item, quantity) => {
        try{
          const { data } = await axios.get(`${url}/products/${item._id}`);
          if (data.inStock < quantity) {
          window.alert('Sorry. Product is out of stock');
          return
        }else if(quantity < 1){
          Alert.alert('Quantity Denied')
          return
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
  <>
      <FlatList data={cartItems ?  cartItems : []}
        renderItem={({item})=>(
          <View style={{
            alignItems: "center",
            justifyContent:"space-between", 
            flexDirection:"row", 
            paddingVertical: 8,
            paddingHorizontal: 2,
            borderRadius: 1,
            borderWidth: 1,
            height: 100,
            maxHeight: 100,
            backgroundColor: "white",
            borderColor:"white"
            }}>
            <View style={{flex: 1, justifyContent: 'space-around', width: "100%", alignItems:"center", flexDirection: "row"}}>
                <Button icon="minus" textColor='green' mode='contained' buttonColor='#fafafa' onPress={()=> updateCartHandler(item, item.quantity - 1)}/>
                <Badge>{item.quantity}</Badge>
                <Button icon="plus" mode="contained" buttonColor='#fafafa' textColor='green'onPress={()=> updateCartHandler(item, item.quantity + 1)}/>
              </View>
            <Image source={{uri: item.image || item.photo}} style={{height:"50%", width:50, objectFit:"contain", margin: 2}}/>
            <Text style={{fontWeight:"800", padding: 2, maxWidth: "100px", borderBottomColor:"black"}}>{item.ugx.toLocaleString() || item.price.toLocaleString()}</Text>
            <Button icon="close" buttonColor='white' textColor='tomato'onPress={()=> removeItemHandler(item)}/>
        </View>
        )}
      keyExtractor={(item) => item._id}

      ListHeaderComponent={
        
      <View style={{padding: 3, backgroundColor: "white", alignItems:"flex-start"}}>
      <Text style={FormStyles.FormHeader}>CART</Text>
      <Text style={{ marginVertical: 2, color: "black", fontWeight: 800, padding:10}}>
        Subtotal: ({cartItems?.reduce((a, c) => a + c.quantity, 0)}{' '} items ) : UGX: 
          {cartItems?.reduce((a, c) => a +(c.ugx * c.quantity || c.price * c.quantity), 0).toLocaleString()}
        </Text>
        <Text style={{ marginVertical: 2, color: "black", fontWeight: 800, padding:10}}>
         TRIP PRICE: {(trip.bookedWeight * trip.weightPrice) || 0}
        </Text>
        <Text style={{ marginVertical: 2, color: "black", fontWeight: 800, padding:10}}>
          TOTAL:
        </Text>
      </View>
      }

      ListFooterComponent={
      <View>
      {trip && (
        <View style={{padding: 2, backgroundColor: "white",}}>
        {!trip == {} ? (
          <View>
            <Card.Title title = {trip.arrivalDate ? `FROM K'LA:  ${new Date(trip.arrivalDate).toDateString()}` : ''}/>
            <Card.Title title = {trip.departureDate ? `BACK TO K'LA:  ${new Date(trip.departureDate).toDateString()}` : ''}/>
          </View>
        ):(
          <Card.Title title="NO TRIP BOOKED!" titleVariant="headlineSmall"/>
        )}
        <Card.Content style={{justifyContent: "space-between"}}>
          <Button textColor='black'
            onPress={()=> navigation.navigate('Trips')}
            style={{borderRadius: 12, borderColor: "white", borderWidth: 1.5}}
          >
            BOOKED WEIGHT: {trip.bookedWeight ? trip.bookedWeight : 0}
          </Button>
          <Button onPress={()=> {
            ctxDispatch({type: "UNBOOK_TRIP"})
            Alert.alert('YOU\'VE GOT NO TRIP ')}}>UNBOOK</Button>
        </Card.Content>
      </View>
      )}
      {shippingAddress && (
        <View style={{padding: 3, backgroundColor:"white", flexDirection:"column", flex: 1}}>
        <Card.Title title = "SHIPPING ADDRESS" titleVariant="headlineSmall"/>
        <Card.Content style={{flexDirection:"row", width: "100%", padding: 3, justifyContent:"space-between"}}>
          <View style={{width: "30%"}}>
          <Text>FULLNAME:</Text>
          <Text>ADDRESS:</Text>
          <Text>CITY:</Text>
          <Text>COUNTRY:</Text>
          </View>
          <View style={{width: "70%"}}>
          <Text variant="bodyMedium" style={{ alignSelf:"flex-end", color: "black", fontWeight: 800}}>{shippingAddress.fullName ||''}</Text>
          <Text variant="bodyMedium" style={{ alignSelf:"flex-end", color: "black", fontWeight: 800}}>{shippingAddress.address || ''}</Text>
          <Text variant="bodyMedium" style={{ alignSelf:"flex-end", color: "black", fontWeight: 800}}>{shippingAddress.city || ''}</Text>
          <Text variant="bodyMedium" style={{ alignSelf:"flex-end", color: "black", fontWeight: 800}}>{shippingAddress.country || ''}</Text>
          </View>
        </Card.Content>
        <Button 
          icon='pencil' mode='outlined' textColor='green' buttonColor='white' 
          style={{alignSelf:"flex-end", marginBottom: 2, borderRadius: 3}}
          onPress={()=> navigation.navigate('Shipping')}
        />
      </View>
      )}
        <Button textColor='white' style={FormStyles.button} onPress={()=> navigation.navigate('Shipping')}>
            PROCEED
          </Button>
        </View>
        
      }
    />        
  </>
  )
}

export default Cart
