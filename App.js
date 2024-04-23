import 'react-native-gesture-handler';
import { enGB, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)
import { Platform } from 'react-native';
import ProfileScreen from './screens/ProfileScreen';
import TripScreen from './screens/TripScreen';
import ShopsScreen from './screens/ShopsScreen';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ShopViewScreen from './screens/ShopViewScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/HomeScreen';
import Login from './screens/Login';
import Signup from './screens/Signup';
import CreateProducts from './screens/CreateProducts';
import CreateTrip from './screens/CreateTrip';
import ManageProducts from './screens/ManageProducts';
import ManageTrips from './screens/ManageTrips';
import UserOrders from './screens/UserOrders';
import MyAddresses from './screens/MyAddresses';
import MyBookings from './screens/MyBookings';
import MyOrders from './screens/MyOrders';
import MyShops from './screens/MyShops';
import MyTrips from './screens/MyTrips';
import PlaceOrder from './screens/PlaceOrder';
import ShippingAddress from './screens/ShippingAddress';
import PaymentScreen from './screens/PaymentScreen';
import { StoreProvider } from './Store';
import Cart from './screens/Cart';
import * as ImagePicker from "expo-image-picker"
import ManageProfile from './screens/ManageProfile';
import FilteringScreen from './screens/FilteringScreen';


export default function App() {
  const [activeScreen, setActiveScreen] = useState('explore')
  const Stack = createNativeStackNavigator()


  useEffect(()=>{
    (async()=>{
      if(Platform.OS !== "web"){
        const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(libraryStatus !== "granted"){
          alert('Sorry, we need camera roll permissions to make this work!');
        }
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus.status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
      }
    })
  }, [])


  return (
    <StoreProvider>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UGYARD" component={Home}/>
        <Stack.Screen name="Shop" component={ShopViewScreen}/>
        <Stack.Screen name="Trips" component={TripScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="Shops" component={ShopsScreen}/>
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name="signup" component={Signup}/>
        <Stack.Screen name='new-product' component={CreateProducts}/>
        <Stack.Screen name='new-trip' component={CreateTrip}/>
        <Stack.Screen name='manage-products' component={ManageProducts}/>
        <Stack.Screen name='manage-trips' component={ManageTrips}/>
        <Stack.Screen name='user-orders' component={UserOrders}/>
        <Stack.Screen name='my-addresses' component={MyAddresses}/>
        <Stack.Screen name='trip-bookings' component={MyBookings}/>
        <Stack.Screen name='my-orders' component={MyOrders}/>
        <Stack.Screen name='my-shops' component={MyShops}/>
        <Stack.Screen name='my-trips' component={MyTrips}/>
        <Stack.Screen name='place-order' component={PlaceOrder}/>
        <Stack.Screen name='shipping' component={ShippingAddress}/>
        <Stack.Screen name='payment' component={PaymentScreen}/>
        <Stack.Screen name='cart' component={Cart}/>
        <Stack.Screen name="Filter" component={FilteringScreen}/>
        <Stack.Screen name="profile-settings" component={ManageProfile}/>
      </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
