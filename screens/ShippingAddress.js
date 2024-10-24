import React, { useContext, useState } from 'react'
import { View, Alert, Text, ScrollView } from 'react-native'
import { FormStyles } from '../styles'
import { Button, TextInput } from 'react-native-paper'
import { Store } from '../Store'
import SafeScreen from '../components/SafeScreen'

const ShippingAddress = ({navigation}) => {


    const { state, dispatch: ctxDispatch} = useContext(Store)
    const {cart: {shippingAddress}} = state



    const [fullName, setFullName] = useState(shippingAddress.fullName || '')
    const [address, setAddress ] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fullName || !address || !city || !postalCode || !country) {
            // If any of the fields are empty, show an alert or handle the error as needed
            // For example:
            Alert.alert('Error', 'All fields are required');
            return;
        }
    
        // All fields are filled, dispatch the action to save the address
        ctxDispatch({
            type: "SAVE_ADDRESS",
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country
            }
        });
        //console.log(fullName, address, city, postalCode, country)
        navigation.navigate('Payment');
    }

  return (
        <ScrollView>
            <Text style={FormStyles.FormHeader}>ADDRESS</Text>
            <TextInput style={FormStyles.Input}
                label='Full Name'
                type="text"
                mode='outlined'
                required
                value={fullName}
                onChangeText={text => setFullName(text)}
            />
            <TextInput style={FormStyles.Input}
                label="Address"
                type="text"
                mode='outlined'
                required
                value={address}
                onChangeText={text => setAddress(text)}
            />
            <TextInput style={FormStyles.Input}
                label='City'
                type="text"
                mode='outlined'
                required
                value={city}
                onChangeText={text => setCity(text)}
            />
            <TextInput style={FormStyles.Input}
                label='Post Code'
                type="text"
                mode='outlined'
                required
                value={postalCode}
                onChangeText={text => setPostalCode(text)}
            />
            <TextInput style={FormStyles.Input}
                label='Country'
                type="text"
                mode='outlined'
                required
                value={country}
                onChangeText={text => setCountry(text)}
            />
            <Button textColor="white" style={FormStyles.button} onPress={handleSubmit}>
                DONE
            </Button>
        </ScrollView>
  )
}

export default ShippingAddress
