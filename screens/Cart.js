import React, { useContext } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { Store } from '../Store'
import { buttonStyles} from '../styles'
import { Button, Card } from 'react-native-paper'
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
    <SafeScreen>
    <ScrollView style={{flex: 1}}>
    <View style={{marginVertical: 12}}>
      <FlatList 
        horizontal
        data={cartItems ?  cartItems : []}
        renderItem={({item})=> 
        <View style={{
            alignItems: "center", 
            //justifyContent:"center", 
            flexDirection:"row", 
            padding: 12,
            marginHorizontal: 12,
            borderRadius: 1,
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
        <Card style={{padding: 2, margin: 4, backgroundColor: "white", borderRadius: 0}}>
        {!trip == {} ? (
          <View>
            <Card.Title title = {trip.arrivalDate ? `FROM K'LA:  ${new Date(trip.arrivalDate).toDateString()}` : ''}/>
            <Card.Title title = {trip.departureDate ? `BACK TO K'LA:  ${new Date(trip.departureDate).toDateString()}` : ''}/>
          </View>
        ):(
          <Card.Title title="NO TRIP BOOKED FOR THIS ORDER!"/>
        )}
        <Card.Content>
          <Button textColor='black'
            icon={'plus'}
            onPress={()=> navigation.navigate('Trips')}
            style={{borderRadius: 12, borderColor: "white", borderWidth: 1.5}}
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
        <Card style={{padding: 3, margin: 4, borderRadius: 0, backgroundColor: "white"}}>
        <Card.Title title = 'SHIPPING ADDRESS!'/>
        <Card.Content>
          <Text variant="bodyMedium" style={{ marginVertical: 2, color: "black", fontWeight: 800, padding:10}}>FULLNAME: {shippingAddress.fullName ||''}</Text>
          <Text variant="bodyMedium" style={{ marginVertical: 2, color: "black", fontWeight: 800, padding:10}}>ADDRESS: {shippingAddress.address || ''}</Text>
          <Text variant="bodyMedium" style={{ marginVertical: 2, color: "black", fontWeight: 800, padding:10}}>CITY: {shippingAddress.city || ''}</Text>
          <Text variant="bodyMedium" style={{ marginVertical: 2, color: "black", fontWeight: 800, padding:10}}>COUNTRY: {shippingAddress.country || ''}</Text>
          <Button textColor='black' icon='pencil'
            onPress={()=> navigation.navigate('shipping')}
            style={{padding: -21, borderRadius: 12, borderColor: "white", borderWidth: 1.5}}
          >
            EDIT SHIPPING ADDRESS
          </Button>
        </Card.Content>
      </Card>
      )}
      </View>
    
      <Card style={{padding: 3, borderRadius: 0, backgroundColor: "white", margin: 4}}>
      <Text style={{ marginVertical: 2, color: "black", fontWeight: 800, padding:10}}>
        Subtotal ({cartItems?.reduce((a, c) => a + c.quantity, 0)}{' '}
            items + trip) : UGX: 
            {cartItems?.reduce((a, c) => a +(c.ugx || c.price * c.quantity), 0) + (trip.bookedWeight * trip.weightPrice) || 0}
        </Text>
        <Text style={{ marginVertical: 2, color: "black", fontWeight: 800, padding:10}}>
         TRIP PRICE: {(trip.bookedWeight * trip.weightPrice) || 0}
        </Text>
      </Card>
      <TouchableOpacity style={buttonStyles.button} onPress={()=> navigation.navigate('shipping')}>
        <Button textColor='white'
            icon="arrow-right">
                Proceed
            </Button>
      </TouchableOpacity>
    </ScrollView>
    </SafeScreen>
  )
}

export default Cart
