import 'react-native-gesture-handler';
import ProfileScreen from '../screens/ProfileScreen';
import TripScreen from './TripScreen';
import Explore from '../screens/Explore';
import ShopsScreen from '../screens/ShopsScreen';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Home() {
  const Tab = createBottomTabNavigator()


  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Explore':
                iconName = focused ? 'compass' : 'compass';
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
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          activeTintColor: 'blue', // Change tab color as desired
          inactiveTintColor: 'black',
        })}
      >
        <Tab.Screen name='Explore' component={Explore} />
        <Tab.Screen name='Trips' component={TripScreen} />
        <Tab.Screen name='Stores' component={ShopsScreen} />
        <Tab.Screen name='Profile' component={ProfileScreen}/>
      </Tab.Navigator>
  );
}
