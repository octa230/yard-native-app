import React, { useContext, useState } from 'react'
import { TextInput, View, Alert, Text, TouchableOpacity } from 'react-native'
import { FormStyles } from '../styles'
import { Button } from 'react-native-paper'
import { Store } from '../Store'

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
        navigation.navigate('payment');
    }

  return (
        <View style={FormStyles.Form}>
            <View>
                <Text style={FormStyles.FormHeader}>NEW ADDRESS</Text>
            </View>
            <TextInput style={FormStyles.Input}
                placeholder='full name'
                type="text"
                required
                value={fullName}
                onChangeText={text => setFullName(text)}
            />
            <TextInput style={FormStyles.Input}
                placeholder='Address'
                type="text"
                required
                value={address}
                onChangeText={text => setAddress(text)}
            />
            <TextInput style={FormStyles.Input}
                placeholder='city'
                type="text"
                required
                value={city}
                onChangeText={text => setCity(text)}
            />
            <TextInput style={FormStyles.Input}
                placeholder='post Code'
                type="text"
                required
                value={postalCode}
                onChangeText={text => setPostalCode(text)}
            />
            <TextInput style={FormStyles.Input}
                placeholder='country'
                type="text"
                required
                value={country}
                onChangeText={text => setCountry(text)}
            />
            <TouchableOpacity style={FormStyles.button} onPress={handleSubmit}>
                <Text>Done</Text>
            </TouchableOpacity>
            <Button onPress={()=> navigation.goBack()} icon="arrow-left">
                <Text>Back</Text>
            </Button>
        </View>
  )
}

export default ShippingAddress
