import React from 'react'
import { TextInput, View, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { FormStyles } from '../styles'
import { Button } from 'react-native-paper'

const Login = ({navigation}) => {
  return (
        <SafeAreaView style={FormStyles.Form}>
            <View>
                <Text style={FormStyles.FormHeader}>LOGIN</Text>
            </View>
            <TextInput style={FormStyles.Input}
            placeholder='email'
            />
            <TextInput style={FormStyles.Input}
            placeholder='password'
            />
            <TouchableOpacity style={FormStyles.button}>
                <Text>Login</Text>
            </TouchableOpacity>
            <Button onPress={()=> navigation.navigate("signup")}>
                <Text>Create Account</Text>
            </Button>
        </SafeAreaView>
  )
}

export default Login
