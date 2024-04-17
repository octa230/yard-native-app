import React from 'react'
import { TextInput, View, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { FormStyles } from '../styles'
import { Button } from 'react-native-paper'

const Signup = ({navigation}) => {
  return (
        <View style={FormStyles.Form}>
            <View>
                <Text style={FormStyles.FormHeader}>LOGIN</Text>
            </View>
            <TextInput style={FormStyles.Input}
            placeholder='name'
            />
            <TextInput style={FormStyles.Input}
            placeholder='phone'
            />
            <TextInput style={FormStyles.Input}
            placeholder='email'
            />
            <TextInput style={FormStyles.Input}
            placeholder='password'
            />
            <TextInput style={FormStyles.Input}
            placeholder='confirm password'
            />
            <TouchableOpacity style={FormStyles.button}>
                <Text>Done</Text>
            </TouchableOpacity>
            <Button onPress={()=> navigation.goBack()}>
                <Text>Login</Text>
            </Button>
        </View>
  )
}

export default Signup
