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
import { Badge } from 'react-native-paper';

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
                iconName = focused ? 'shopping-cart' : 'shopping-cart';
                break;
              case 'Trips':
                iconName = focused ? 'plane' : 'plane';
                break;
              case 'Stores':
                iconName = focused ? 'home' : 'home';
                break;
              case 'Profile':
                iconName = focused ? 'user' : 'user';
                break;
            }
            return (
              <>
              <FontAwesome5 name={iconName} size={size} color={color} />
              {/* Display cart items count if the tab is 'Cart' */}
              {route.name === 'Cart' && cart.cartItems?.length > 0 && (
                <Badge style={{ position: 'absolute', top: 3, right: 1 }}>
                  {cart.cartItems?.length}
                </Badge>
              )}
            </>
            )
          },
          activeTintColor: 'blue',
          inactiveTintColor: 'black',
        })}
      >
        <Tab.Screen name='Explore' component={Explore} />
        <Tab.Screen name='Trips' component={TripScreen} />
        <Tab.Screen name='Stores' component={ShopsScreen} />
        <Tab.Screen name='Cart' component={Cart}/>
        <Tab.Screen name='Profile' component={ProfileScreen}/>
      </Tab.Navigator>
  );
}
