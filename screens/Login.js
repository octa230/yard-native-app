import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { FormStyles } from '../styles'
import { Button, TextInput } from 'react-native-paper'
import axios from 'axios'
import { url } from '../utils'
import { Store } from '../Store'

const Login = ({navigation}) => {

    const {state, dispatch: ctxDispatch} = useContext(Store)
    const {userInfo} = state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async () => {
        try {
            const { data } = await axios.post(`${url}/users/signin`, {
                email,
                password
            });
    
            //console.log(data)
            ctxDispatch({type: "LOGIN_USER", payload: data})    
            navigation.navigate("Profile")
            // Retrieve stored user info
        } catch (error) {
            console.error(error);
        }
    };

    //navigation.navigate("UGYARD")
    
  return (
        <View style={FormStyles.Form}>
        <Text style={FormStyles.FormHeader}>LOGIN</Text>
            <TextInput style={FormStyles.Input}
                label='email'
                mode='outlined'
                type="text"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput style={FormStyles.Input}
                label='password'
                mode='outlined'
                type="text"
                value={password}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
            />
            <Button style={FormStyles.button} textColor="white" icon='arrow-right' onPress={()=> handleSubmit()}>
                LOGIN
            </Button>
            <Button onPress={()=> navigation.navigate("signup")}>
                Create Account
            </Button>
        </View>
  )
}

export default Login
