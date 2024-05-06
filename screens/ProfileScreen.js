import React, { useContext, useState } from 'react'
import { Text, ScrollView, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { profileStyles, shopStyles } from '../styles'
import { Badge, Button } from 'react-native-paper'
import { Store } from '../Store'
import SafeScreen from '../components/SafeScreen'


const ProfileScreen = ({navigation}) => {
  const {state, dispatch: ctxDispatch} = useContext(Store)
  const {userInfo, cart} = state


  const handleLogout =()=>{
    ctxDispatch({type:"LOGOUT_USER"})
    navigation.navigate('login')
  }


  return (
    <SafeScreen>
      <ScrollView>
        <View style={profileStyles.topBar}>
        <TouchableOpacity onPress={()=> {
          if(!userInfo){
             navigation.navigate('login')
          }
        }}> 
          <Icon name="user" size={30}/>
        </TouchableOpacity>
        <Badge style={{alignSelf:"center"}}>
          {cart.cartItems?.length}
        </Badge>
        <Text onPress={()=> navigation.navigate('cart')}>
          <Icon name='shopping-basket' size={30}/>
        </Text>
        </View>
        <View>
        <View style={profileStyles.container}>
          <Text>USER ACTIONS</Text>
          <TouchableOpacity style={shopStyles.container} onPress={()=> navigation.navigate('user-orders')}>
            <Text>
              My Orders
            </Text>
            <Button>
        <Icon name="angle-right"/>
      </Button>
        </TouchableOpacity>
          <TouchableOpacity style={shopStyles.container} onPress={()=> navigation.navigate('profile-settings')}>
            <Text>
              Profile Settings
            </Text>
            <Button>
        <Icon name="angle-right"/>
      </Button>
        </TouchableOpacity>
          <TouchableOpacity style={shopStyles.container} onPress={()=> navigation.navigate('shipping')}>
            <Text>
              My addresses
            </Text>
            <Button>
        <Icon name="angle-right"/>
      </Button>
      </TouchableOpacity>
        </View>
        <View style={profileStyles.container}>
          <Text>SELLER ACTIONS</Text>
          <TouchableOpacity style={shopStyles.container} onPress={()=> navigation.navigate('my-shops')}>
            <Text>
              My Shops
            </Text>
            <Button>
        <Icon name="angle-right"/>
      </Button>
          </TouchableOpacity>
          <TouchableOpacity style={shopStyles.container} onPress={()=> navigation.navigate('my-orders')}>
            <Text>
              Manage Orders
            </Text>
            <Button>
        <Icon name="angle-right"/>
      </Button>
          </TouchableOpacity>
          <TouchableOpacity style={shopStyles.container} onPress={()=> navigation.navigate('manage-products')}>
            <Text>
              Manage Products
            </Text>
            <Button>
        <Icon name="angle-right"/>
      </Button>
          </TouchableOpacity>
          <TouchableOpacity style={shopStyles.container} onPress={()=> navigation.navigate('new-product')}>
            <Text>
              Create Products
            </Text>
            <Button>
        <Icon name="angle-right"/>
      </Button>
          </TouchableOpacity>
        </View>
        
        <View style={profileStyles.container}>
          <Text>TRANSPORTER ACTIONS</Text>
           <TouchableOpacity style={shopStyles.container} onPress={()=> navigation.navigate('trip-bookings')}>
            <Text>
              My Bookings
            </Text>
            <Button>
        <Icon name="angle-right"/>
      </Button>
          </TouchableOpacity> 
          <TouchableOpacity style={shopStyles.container} onPress={()=> navigation.navigate('new-trip')}>
            <Text>
              Create Trip
            </Text>
            <Button>
        <Icon name="angle-right"/>
      </Button>
          </TouchableOpacity>
          <TouchableOpacity style={shopStyles.container} onPress={()=> navigation.navigate('manage-trips')}>
            <Text>
              Manage Trips
            </Text>
            <Button>
        <Icon name="angle-right"/>
      </Button>
          </TouchableOpacity>
           <TouchableOpacity style={shopStyles.container} onPress={()=> navigation.navigate('transporter-profile')}>
            <Text>
              Create Profile
            </Text>
            <Button>
        <Icon name="angle-right"/>
      </Button>
          </TouchableOpacity> 
        </View>
          <View style={profileStyles.container}>
          <TouchableOpacity style={shopStyles.container} onPress={()=> handleLogout()}>
            <Text>
            Logout
            </Text>
            <Button>
        <Icon name="angle-right"/>
      </Button>
          </TouchableOpacity>
          </View>
        </View>
    </ScrollView>
    </SafeScreen>
  )
}

export default ProfileScreen
