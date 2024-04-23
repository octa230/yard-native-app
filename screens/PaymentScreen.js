import React, { useContext, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { buttonStyles, FormStyles } from '../styles';
import { Store } from '../Store';
import Axios from 'axios'
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import {url} from '../utils'

const PaymentScreen = ({navigation}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [deliveryDate, setdeliveryDate] = useState(undefined)
  const [open, setOpen] = useState(false)
  const [deliveryMessage, setDeliveryMessage] = useState('')

  
  const {state, dispatch: ctxDispatch} = useContext(Store)
  const {userInfo, cart, cart: {paymentMethod}} = state

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    ctxDispatch({type:"PAYMENT_METHOD_SAVE", payload: method})

  };


  const onDismiss = useCallback(()=> {
    setOpen(false)
  },[setOpen])

  const onConfirm = useCallback((params)=> {
    setOpen(false);
    setdeliveryDate(params.date)
  }, [setOpen, setdeliveryDate])

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.ugx || c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.05 * cart.itemsPrice);
  cart.deliveryDate = deliveryDate
  cart.tripBill = cart.trip ? round2(cart.trip.bookedWeight * cart.trip.weightPrice ) : 0
  //console.log(cart.userTrip)


  switch(paymentMethod){
    case "cash":
      console.log(paymentMethod)
      break
    case "stripe":
      console.log(paymentMethod)
      break
    case "paypal":
      console.log(paymentMethod)
      break
    default:
      console.log("no method")
  }

  const placeOrderHandler = async()=>{
    console.log({"cart":cart})
     const { data } = await Axios.post(
      `${url}/orders`,
      {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.itemsPrice + cart.taxPrice,
        //timeslot: cart.timeslot,
        deliveryDate: cart.deliveryDate,
        //orderNotes: orderNotes,
        deliveryMessage: deliveryMessage,
        //surprise: surprise,
        //code: loyaltyCode,
        trip: cart.trip
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    ctxDispatch({type: "EMPTY_CART"})
    navigation.navigate("user-orders") 
  }

  const renderForm = () => {
    switch (selectedPaymentMethod) {
      case "stripe":
        return (
          <View style={{alignItems:"center", flexDirection: "column"}}>
            <TextInput
              placeholder="Card Number"
              onChangeText={(text) => setFormData({ ...formData, cardNumber: text })}
            />
            <TextInput
              placeholder="Expiry Date (MM/YY)"
              onChangeText={(text) => setFormData({ ...formData, expiryDate: text })}
            />
            <TextInput
              placeholder="CVC"
              onChangeText={(text) => setFormData({ ...formData, cvc: text })}
            />
          </View>
        );
      case "paypal":
        return (
          <View style={{alignItems:"center", flexDirection: "column"}}>
            <TextInput
              placeholder="PayPal Email"
              onChangeText={(text) => setFormData({ ...formData, paypalEmail: text })}
            />
            <TextInput
              placeholder="Password"
              onChangeText={(text) => setFormData({ ...formData, paypalPassword: text })}
              secureTextEntry
            />
          </View>
        )
        
      default:
        return (
          // Render form for cash payment
          <View style={{alignItems: "center"}}>
            <TouchableOpacity style={FormStyles.button} onPress={()=> placeOrderHandler()}>
            <Button textColor='white'>PlaceOrder: {paymentMethod}</Button>
          </TouchableOpacity>
          </View>
        );;
    }
  };
  return (
    <SafeAreaView style={{margin: 18, borderWidth: 1, borderColor:"white", borderRadius: 12, backgroundColor: "white"}}>
      <View style={{alignItems: "center", padding: 22, borderWidth: 1.5, borderRadius:8, borderColor:"#fafafa", backgroundColor: "#fafafa", margin: 5}}>
      <Text style={{alignSelf: "center", fontWeight: 800}}>Delivery Message / Notes</Text>
      </View>
      <View>
        <TextInput type="text" style={FormStyles.Input}
          value={deliveryMessage}
          onChangeText={text => setDeliveryMessage(text)}
        />
      </View>
      <View style={{padding: 20}}>
          <TouchableOpacity onPress={() => setOpen(true)} style={buttonStyles.button}>
                <Button textColor='white'>
                Select Date
                </Button>
              </TouchableOpacity>
            </View>
       <DatePickerModal
            title="DeliveryDate"
            locale="en-GB"
            mode='single'
            date={deliveryDate}
            visible={open}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
          />
      <View style={{alignItems: "center", padding: 22, borderWidth: 1.5, borderRadius:8, borderColor:"#fafafa", backgroundColor: "#fafafa", margin: 5}}>
        <Text style={{fontWeight:800}}>SELECT PAYMENT METHOD</Text>
      </View>
      <View style={{flexDirection: "row", justifyContent:"space-around", margin: 12}}>
      <TouchableOpacity onPress={() => handlePaymentMethodSelect('cash')} style={buttonStyles.button}>
        <Button
          textColor='white'
        >{selectedPaymentMethod === 'cash' ? 'Selected - ' : ''}Cash</Button>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePaymentMethodSelect('stripe')} style={buttonStyles.button}>
        <Button
          textColor='white'
        >{selectedPaymentMethod === 'stripe' ? 'Selected - ' : ''}Stripe</Button>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePaymentMethodSelect('paypal')} style={buttonStyles.button}>
        <Button
          textColor='white'
        >{selectedPaymentMethod === 'paypal' ? 'Selected - ' : ''}PayPal</Button>
      </TouchableOpacity>
    </View>
    {renderForm()}
    </SafeAreaView>
  );
};

export default PaymentScreen;
