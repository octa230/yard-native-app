import React, { useContext, useState } from 'react'
import { Text, ScrollView, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { FormStyles, profileStyles, shopStyles } from '../styles'
import { Button } from 'react-native-paper'
import { Store } from '../Store'



const ProfileScreen = ({navigation}) => {
  const {state, dispatch: ctxDispatch} = useContext(Store)

  const handleLogout =()=>{
    ctxDispatch({type:"LOGOUT_USER"})
    navigation.navigate('Login')
  }


  return (
      <ScrollView>
        <View style={profileStyles.container}>
        <Text style={FormStyles.FormHeader}>USER ACTIONS</Text>

          <Button style={shopStyles.container} icon='chevron-right' onPress={()=> navigation.navigate('UserOrders')} labelStyle={{fontSize: 20}}>My Orders</Button>
          <Button style={shopStyles.container} icon='chevron-right' onPress={()=> navigation.navigate('ProfileSettings')} labelStyle={{fontSize: 20}}>Profile Settings</Button>
          <Button style={shopStyles.container} icon='chevron-right' onPress={()=> navigation.navigate('Shipping')} labelStyle={{fontSize: 20}}>My addresses</Button>
        </View>

        <View style={profileStyles.container}>
          <Text style={FormStyles.FormHeader}>SELLER ACTIONS</Text>
          <Button style={shopStyles.container} icon='chevron-right' onPress={()=> navigation.navigate('My Orders')} labelStyle={{fontSize: 20}}>Manage Orders</Button>
          <Button style={shopStyles.container} icon='chevron-right' onPress={()=> navigation.navigate('My Stores')} labelStyle={{fontSize: 20}}>My Shops</Button>
          <Button style={shopStyles.container} icon='chevron-right' onPress={()=> navigation.navigate('Manage Products')} labelStyle={{fontSize: 20}}>Manage Products</Button>
          <Button style={shopStyles.container} icon='chevron-right' onPress={()=> navigation.navigate('New Product')} labelStyle={{fontSize: 20}}>Create Products</Button>
        </View>
        
        <View style={profileStyles.container}>
          <Text style={FormStyles.FormHeader}>TRANSPORTER ACTIONS</Text>
          <Button style={shopStyles.container} icon='chevron-right' onPress={()=> navigation.navigate('Trip Bookings')} labelStyle={{fontSize: 20}}>My Bookings</Button>
          <Button style={shopStyles.container} icon='chevron-right' onPress={()=> navigation.navigate('New Trip')} labelStyle={{fontSize: 20}}>Create Trip</Button>
          <Button style={shopStyles.container} icon='chevron-right' onPress={()=> navigation.navigate('Manage Trips')} labelStyle={{fontSize: 20}}>Manage Trips</Button>
          <Button style={shopStyles.container} icon='chevron-right' onPress={()=> navigation.navigate('Transporter Profile')} labelStyle={{fontSize: 20}}>Create Profile</Button> 
        </View>

        <View style={profileStyles.container}>
        <Button style={shopStyles.container} onPress={()=> handleLogout()} icon='arrow-right' labelStyle={{fontSize: 20}}>Logout</Button>
        </View>
    </ScrollView>
  )
}

export default ProfileScreen
