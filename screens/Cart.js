import React, { useContext } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native'
import { Store } from '../Store'
import { buttonStyles, profileStyles, shopStyles} from '../styles'
import { Button, Card } from 'react-native-paper'
import axios from 'axios'
import { url } from '../utils'

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
    <ScrollView style={{flex: 1}}>
    <View style={{marginVertical: 12}}>
      <Card.Title title="ORDER ITEMS =>"/>
      <FlatList horizontal
        data={cartItems ?  cartItems : []}
        renderItem={({item})=> 
        <View style={{
            alignItems: "center", 
            //justifyContent:"center", 
            flexDirection:"row", 
            padding: 12,
            marginHorizontal: 12,
            borderRadius: 12,
            borderWidth: 1,
            height: 130,
            maxHeight: 130,
            backgroundColor: "white",
            borderColor:"white"
            }}>
            <View style={{maxWidth: 80}}>
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
                style={{maxWidth: 100, height: 100, width: 100, borderWidth: 1, borderColor: "#E5E4E2", borderRadius: 12, objectFit:"contain"}}
            />
            <Button icon="trash-can" textColor='black' onPress={()=> removeItemHandler(item)}/>
        </View>
        }
        keyExtractor={(item) => item._id}
      />
      </View>
      
      <View>
      {trip && (
        <Card style={{padding: 2, margin: 12}}>
        {!trip == {} ? (
          <View>
            <Card.Title title = {trip.arrivalDate ? `FROM K'LA:  ${new Date(trip.arrivalDate).toDateString()}` : ''}/>
            <Card.Title title = {trip.departureDate ? `BACK TO K'LA:  ${new Date(trip.departureDate).toDateString()}` : ''}/>
          </View>
        ):(
          <View style={{padding: 12, alignItems:"center"}}>
            <Text>NO TRIP BOOKED FOR THIS ORDER!</Text>
          </View>
        )}
        <Card.Content>
          <Button textColor='black' icon="arrow-right"
            onPress={()=> navigation.navigate('Trips')}
            style={{padding: -21, borderRadius: 12, borderColor: "white", borderWidth: 1.5, backgroundColor:"#9FE2BF"}}
          >
            BOOKED WEIGHT: {trip.bookedWeight ? trip.bookedWeight : 0}
          </Button>
          <Button onPress={()=> {
            ctxDispatch({type: "UNBOOK_TRIP"})
            Alert.alert('YOU\'VE GOT NO TRIP ')
          }}>UNBOOK</Button>
        </Card.Content>
      </Card>
      )}
      {shippingAddress && (
        <Card style={{padding: 23, margin: 12}}>
        <Card.Title title = 'SHIPPING ADDRESS!'/>
        <Card.Content>
          <Button textColor='black' icon='pencil'
            onPress={()=> navigation.navigate('shipping')}
            style={{padding: -21, borderRadius: 12, borderColor: "white", borderWidth: 1.5, backgroundColor:"#9FE2BF"}}
          >
            EDIT SHIPPING ADDRESS
          </Button>
          <Text variant="bodyMedium" style={{ marginVertical: 2, color: "black", fontWeight: 800}}>FULLNAME: {shippingAddress.fullName ||''}</Text>
          <Text variant="bodyMedium" style={{ marginVertical: 2, color: "black", fontWeight: 800}}>ADDRESS: {shippingAddress.address || ''}</Text>
          <Text variant="bodyMedium" style={{ marginVertical: 2, color: "black", fontWeight: 800}}>CITY: {shippingAddress.city || ''}</Text>
          <Text variant="bodyMedium" style={{ marginVertical: 2, color: "black", fontWeight: 800}}>COUNTRY: {shippingAddress.country || ''}</Text>
        </Card.Content>
      </Card>
      )}
      </View>
    
      <View style={{padding: 22, borderWidth: 1, borderColor:"#fefefe", borderRadius: 12, margin: 20}}>
        <Text>
        Subtotal ({cartItems?.reduce((a, c) => a + c.quantity, 0)}{' '}
            items + trip) : UGX: 
            {cartItems?.reduce((a, c) => a +(c.ugx || c.price * c.quantity), 0) + (trip.bookedWeight * trip.weightPrice) || 0}
        </Text>
      </View>
      <View style={{padding: 22, borderWidth: 1, borderColor:"#fefefe", borderRadius: 12, margin: 20}}>
        <Text>
         TRIP PRICE: {(trip.bookedWeight * trip.weightPrice) || 0}
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
      </ScrollView>
  )
}

export default Cart
