import React, { useState } from 'react'
import { Text, ScrollView, View, TouchableOpacity } from 'react-native'
import SearchBar from '../components/SearchBar'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { profileStyles, shopStyles } from '../styles'
import { Button } from 'react-native-paper'


const ProfileScreen = ({navigation}) => {
  const [showModel, setShowModel] = useState(false)


  return (
    <ScrollView>
        {/* <View>
          <SearchBar/>
        </View> */}
        <View style={profileStyles.topBar}>
        <TouchableOpacity onPress={()=> navigation.navigate('login')}> 
          <Icon name="user" size={30}/>
        </TouchableOpacity>
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
          <TouchableOpacity style={shopStyles.container} onPress={()=> navigation.navigate('my-addresses')}>
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
          <TouchableOpacity style={shopStyles.container} onPress={()=> navigation.navigate('my-trips')}>
            <Text>
            My Trips
            </Text>
            <Button>
        <Icon name="angle-right"/>
      </Button>
          </TouchableOpacity>
        </View>
          <View style={profileStyles.container}>
          <TouchableOpacity style={shopStyles.container}>
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
  )
}

export default ProfileScreen


{/* <Modal 
visible={showModel}
animationType='slide'
transparent={true}
onRequestClose={()=> setShowModel(false)}
>
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<View style={{ backgroundColor: 'white', padding: 12, borderRadius: 10 }}>
  <Text>Cart Empty</Text>
  <Button title="Close" 
    onPress={() => setShowModel(false)} 
    icon="cancel"
    style={{padding: 20}}
    >
    Close
  </Button>
</View>
</View>
</Modal> */}