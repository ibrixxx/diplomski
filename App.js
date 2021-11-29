import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import AuthProvider from './AuthProvider/AuthProvider';
import MyScreens from './Navigation/MyScreens';

export default function App() {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
       <StatusBar backgroundColor={'white'} barStyle="dark-content"/>
       <AuthProvider>
         <NavigationContainer>
           <MyScreens />
         </NavigationContainer>
       </AuthProvider>
     </View>
  );
}