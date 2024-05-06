import React, { useContext, useEffect, useState } from 'react'
import { TextInput, View, SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native'
import { FormStyles } from '../styles'
import { Button } from 'react-native-paper'
import axios from 'axios'
import { url } from '../utils'
import { Store } from '../Store'
import SafeScreen from '../components/SafeScreen'

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
        <SafeScreen>
            <View style={FormStyles.Form}>
            <View>
                <Text style={FormStyles.FormHeader}>LOGIN</Text>
            </View>
            <TextInput style={FormStyles.Input}
                placeholder='email'
                type="text"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput style={FormStyles.Input}
                placeholder='password'
                type="text"
                value={password}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity style={FormStyles.button} onPress={()=> handleSubmit()}>
                <Text>Login</Text>
            </TouchableOpacity>
            <Button onPress={()=> navigation.navigate("signup")}>
                <Text>Create Account</Text>
            </Button>
        </View>
        </SafeScreen>
  )
}

export default Login
