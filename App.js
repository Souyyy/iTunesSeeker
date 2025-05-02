import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, StyleSheet } from 'react-native';

import HomeScreen from './components/HomeScreen';
import FavorisScreen from './components/FavorisScreen';
import AvisScreen from './components/AvisScreen';

import { store } from './redux/Store'; 
import { Provider } from 'react-redux';

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#212121',
            },
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 20,
              height: 60,
              marginLeft: 20,
              marginRight: 20,
              borderRadius: 15,
              backgroundColor: '#212121',
              borderColor: '#212121',
              elevation: 0,
              paddingHorizontal: 10,
            }
          }}
        >
          <Tab.Screen
            name="Favoris"
            component={FavorisScreen}
            options={{
              title: '',
              tabBarIcon: ({ focused }) => (
                <View style={styles.iconContainer}>
                  <Image
                    source={require('./assets/icons/favoris_off.png')}
                    style={[
                      styles.iconImage,
                      { tintColor: focused ? '#1db954' : '#fff' }
                    ]}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: '',
              tabBarIcon: ({ focused }) => (
                <View style={styles.iconContainer}>
                  <Image
                    source={require('./assets/icons/maison.png')}
                    style={[styles.iconImage, { tintColor: focused ? '#1db954' : '#fff' }]}
                  />
                </View>
              ),
            }}
          />
          
          <Tab.Screen
            name="Avis"
            component={AvisScreen}
            options={{
              title: '',
              tabBarIcon: ({ focused }) => (
                <View style={styles.iconContainer}>
                  <Image
                    source={require('./assets/icons/avis_off.png')}
                    style={[
                      styles.iconImage,
                      { tintColor: focused ? '#1db954' : '#fff' }
                    ]}
                  />
                </View>
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    top: 10,
    width: 30,
    height: 30,
  }
});