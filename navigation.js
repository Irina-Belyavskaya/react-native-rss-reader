import React from "react"

import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

import MainScreen from './components/MainScreen'
import NewsScreen from "./components/NewsSreen"
import GreetingScreen from "./components/GreetingScreen"
// import NoteScreen from './components/NoteScreen'

const Stack = createStackNavigator();

export default function Navigate() {
  return <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen 
        name="Greeting"
        component={GreetingScreen}
        options={
          {
            title : "RSS - feeds",
            headerTitleStyle: {  
              color: 'white',
              fontSize: 25
            },
            headerStyle: { 
              backgroundColor: '#ff5858',
            },
            cardStyle: {
              backgroundColor: '#373737',
              color: 'white'
            }                      
          }
        }
      />
      <Stack.Screen 
        name="Main"
        component={MainScreen}
        options={
          {
            headerTitleStyle: {  
              color: 'white',
              fontSize: 25
            },
            headerStyle: { 
              backgroundColor: '#ff5858',
            },
            cardStyle: {
              backgroundColor: '#373737',
              color: 'white'
            }                      
          }
        }
      />
      <Stack.Screen 
        name="News"
        component={NewsScreen}
        options={
          {
            headerStyle: { backgroundColor: '#ff5858' },
            headerTitleStyle: { 
              color: 'white',
              fontSize: 25
            }
          }
        } 
      />            
    </Stack.Navigator>
  </NavigationContainer>
}