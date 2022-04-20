import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Dimensions, Image } from 'react-native';
import Profile from './Profile';
import CalorieTrackerScreen from './CalorieTracker';
import ExerciseRoutines from './ExcerciseRoutines';
import ExerciseIntervals from './ExcerciseInterval';
import HomeScreen from './HomeScreen'
import LoginScreen from './LoginScreen';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const Tab = createBottomTabNavigator();
    
//Navbar component (Nader said he'll work on this I think)
const NavBar = ({ navigation }) => {
    return (
        <Tab.Navigator 
        screenOptions={{
          header: () => null,
          tabBarShowLabel: false, 
          tabBarStyle: {
            position: 'absolute',
            bottom: 30,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#fff',
            borderRadius: 10,
            height: 70, 
            paddingBottom: 0
          }
        }}
      >
        <Tab.Screen name='Home Screen' 
          component={HomeScreen} 
          options={{ 
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image  source={require('../assets/home.png')} 
                  resizeMode='contain'
                  style={{
                      width: 25,
                      height: 25,
                      
                  }} 
                  />
                <Text style={{color: focused ? '#e32f45' : '#000', fontSize: 12}}>Home</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen  
          name='Profile' 
          component={Profile} 
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center',}}>
                  <Image  source={require('../assets/user.png')} 
                  resizeMode='contain'
                  style={{
                      width: 25,
                      height: 25
                  }}
                  />
                <Text style={{color: focused ? '#e32f45' : '#000', fontSize: 12}}>Profile</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen name='Calorie Tracker' 
          component={CalorieTrackerScreen} 
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image  source={require('../assets/fire.png')} 
                  resizeMode='contain'
                  style={{
                      width: 25,
                      height: 25
                  }}
                  />
                <Text style={{color: focused ? '#e32f45' : '#000', fontSize: 12}}>Calories</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen name='Exercise Routines' 
          component={ExerciseRoutines} 
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image  source={require('../assets/weight.png')} 
                  resizeMode='contain'
                  style={{
                      width: 25,
                      height: 25
                  }}
                  />
                <Text style={{color: focused ? '#e32f45' : '#000', fontSize: 12}}>Routines</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen name='Exercise Intervals' 
          component={ExerciseIntervals} 
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image  source={require('../assets/stopwatch.png')} 
                  resizeMode='contain'
                  style={{
                      width: 25,
                      height: 25
                  }}
                  />
                <Text style={{color: focused ? '#e32f45' : '#000', fontSize: 12}}>Intervals</Text>
              </View>
            ),
          }}
        />

      </Tab.Navigator>


    )
}

export default NavBar;