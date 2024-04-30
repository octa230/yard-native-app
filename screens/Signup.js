import React, { useContext, useState } from 'react'
import { TextInput, View, Text, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import { FormStyles } from '../styles'
import { Button } from 'react-native-paper'
import { Store } from '../Store'
import axios from 'axios'
import { url } from '../utils'

const Signup = ({navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone ] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setComfirmPassword] = useState('')

    const {state, dispatch: ctxDispatch} = useContext(Store)
    const {userInfo} = state

    const handleSubmitt= async()=>{
  
        if(!name || !email || !phone || !password || !confirmPassword){
            Alert.alert('All Fields Needed')
            return
        }else if(password !== confirmPassword){
            Alert.alert('passwords don\'t match')
            return
        }
        try{
            const {data} = await axios.post(`${url}/users/signup`, {
                name,
                email,
                phone,
                password
            })
            //console.log(data)
            //await AsyncStorage.setItem('userInfo', JSON.stringify(data))
            ctxDispatch({type: "LOGIN_USER", payload: data})
            //await AsyncStorage.setItem('userInfo', JSON.stringify(data))
            navigation.navigate('Profile')
        }catch(error){
            console.log(error)
        }
    }

  return (
        <SafeAreaView style={FormStyles.Form}>
            <View>
                <Text style={FormStyles.FormHeader}>Create Account</Text>
            </View>
            <TextInput style={FormStyles.Input}
                placeholder='name'
                onChangeText={text => setName(text)}
                value={name}
                type="text"
                required
            />
            <TextInput style={FormStyles.Input}
                placeholder='phone'
                onChangeText={text => setPhone(text)}
                value={phone}
                keyboardType='phone-pad'
                required
            />
            <TextInput style={FormStyles.Input}
                placeholder='email'
                onChangeText={text => setEmail(text)}
                value={email}
                type="text"
                required
            />
            <TextInput style={FormStyles.Input}
                placeholder='password'
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
                type="text"
                required
            />
            <TextInput style={FormStyles.Input}
                placeholder='confirm password'
                onChangeText={text => setComfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry={true}
                type="text"
                required
            />
            <TouchableOpacity style={FormStyles.button} onPress={()=>handleSubmitt()}>
                <Text>Done</Text>
            </TouchableOpacity>
            <Button onPress={()=> navigation.goBack()}>
                <Text>Login</Text>
            </Button>
        </SafeAreaView>
  )
}

export default Signup
