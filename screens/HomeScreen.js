import 'react-native-gesture-handler';
import ProfileScreen from './ProfileScreen';
import TripScreen from './TripScreen';
import Explore from './Explore';
import ShopsScreen from './ShopsScreen';
import Cart from './Cart';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import { Store } from '../Store';

export default function Home() {
  const Tab = createBottomTabNavigator()
  const{state} = useContext(Store)
  const {cart} = state


  return (
      <Tab.Navigator
        screenOptions={( {route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Explore':
                iconName = focused ? 'compass' : 'compass';
                break;
              case 'Cart':
                iconName = focused ? 'shopping-basket' : 'shopping-basket';
                break;
              case 'Trips':
                iconName = focused ? 'paper-plane' : 'paper-plane';
                break;
              case 'Stores':
                iconName = focused ? 'tags' : 'tags';
                break;
              case 'Profile':
                iconName = focused ? 'user' : 'user';
                break;
            }
            return (

              <FontAwesome5 name={iconName} size={size} color={color} />
            )
          },
          tabBarActiveTintColor: '#004d25',
          tabBarInactiveTintColor: '#517067',
          tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <Tab.Screen name='Explore'  component={Explore} options={{tabBarShowLabel: false}} />
        <Tab.Screen name='Trips'  component={TripScreen} options={{tabBarShowLabel: false}} />
        <Tab.Screen name='Stores'  component={ShopsScreen} options={{tabBarShowLabel: false}} />
        <Tab.Screen name='Cart'  component={Cart} options={{tabBarBadge: cart.cartItems?.length, tabBarBadgeStyle:{color:"white", backgroundColor: "green"}}}/>
        <Tab.Screen name='Profile'  component={ProfileScreen} options={{tabBarShowLabel: false}}/>
      </Tab.Navigator>
  );
}
