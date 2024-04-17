import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { buttonStyles, FormStyles, shopStyles } from '../styles';
import { Button } from 'react-native-paper';

const PaymentScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
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
  );
};

export default PaymentScreen;
