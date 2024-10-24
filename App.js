import 'react-native-gesture-handler';
import { enGB, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)
import ProfileScreen from './screens/ProfileScreen';
import TripScreen from './screens/TripScreen';
import ShopsScreen from './screens/ShopsScreen';
import { NavigationContainer } from '@react-navigation/native';
import ShopViewScreen from './screens/ShopViewScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './screens/HomeScreen';
import Login from './screens/Login';
import Signup from './screens/Signup';
import CreateProducts from './screens/CreateProducts';
import CreateTrip from './screens/CreateTrip';
import ManageProducts from './screens/ManageProducts';
import ManageTrips from './screens/ManageTrips';
import UserOrders from './screens/UserOrders';
import MyBookings from './screens/MyBookings';
import MyOrders from './screens/MyOrders';
import MyShops from './screens/MyShops';
import PlaceOrder from './screens/PlaceOrder';
import ShippingAddress from './screens/ShippingAddress';
import PaymentScreen from './screens/PaymentScreen';
import { StoreProvider } from './Store';
import Cart from './screens/Cart';
import CreateShop from './screens/CreateShop';
import ManageProfile from './screens/ManageProfile';
import FilteringScreen from './screens/FilteringScreen';
import TransporterProfile from './screens/TransporterProfile';
import ProductScreen from './screens/ProductScreen';


export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <StoreProvider>
    <StoreProvider>
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UGYARD" component={Home} />
        <Stack.Screen name="Shop" component={ShopViewScreen} options={({route})=> ({title: route.params.shop.name})}/>
        <Stack.Screen name="Product" component={ProductScreen} options={({route})=> ({title: route.params.product.name})}/>
        <Stack.Screen name="Trips" component={TripScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Shops" component={ShopsScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="New Product" component={CreateProducts} />
        <Stack.Screen name="New Trip" component={CreateTrip} />
        <Stack.Screen name="Manage Products" component={ManageProducts} />
        <Stack.Screen name="Manage Trips" component={ManageTrips} />
        <Stack.Screen name="Transporter Profile" component={TransporterProfile} />
        <Stack.Screen name="UserOrders" component={UserOrders} />
        <Stack.Screen name="Trip Bookings" component={MyBookings} />
        <Stack.Screen name="My Orders" component={MyOrders} />
        <Stack.Screen name="My Stores" component={MyShops} />
        <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
        <Stack.Screen name="Shipping" component={ShippingAddress} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Create Shop" component={CreateShop} />
        <Stack.Screen name="Filter" component={FilteringScreen} />
        <Stack.Screen name="ProfileSettings" component={ManageProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
</StoreProvider>

    </StoreProvider>
  );
}
