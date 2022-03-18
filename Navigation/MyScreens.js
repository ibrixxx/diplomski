import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import { useUser, useUserUpdate } from "../AuthProvider/AuthProvider";
import DummyComp from "../Components/DummyComp";
import LoginScreen from "../Screens/LoginScreen";
import EventsScreen from "../Screens/EventsScreen";
import GuestsScreen from "../Screens/GuestsScreen";
import DetailsScreen from "../Screens/DetailsScreen";
import ScanQrCode from "../Screens/ScanQrCode";
import AddGuestScreen from "../Screens/AddGuestScreen";

const Stack = createNativeStackNavigator();

const authTabs = () => <Stack.Screen
    name="AuthTabs"
    component={LoginScreen}
    options={{headerShown: false}}
/>

const appTabs = () =>
    <>
        <Stack.Screen
            name="Events"
            component={EventsScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="Guests"
            component={GuestsScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="Scan"
            component={ScanQrCode}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="AddNew"
            component={AddGuestScreen}
            options={{headerShown: false}}
        />
    </>

export default function MyScreens() {
    const user = useUser()
    const setUser = useUserUpdate()
    const [isReady, setIsReady] = useState(false)

    useEffect(  () => {
        const getData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if(token !== null)
                    await setUser({...user, token: token, isAuthenticated: true})
                else
                    setUser({...user, isAuthenticated: false})
            }
            catch (error) {
                console.log(error);
            }
            finally {
                await setIsReady(true);
            }
        }
        getData()
    }, [])

    if(!isReady)
        return (<View style={{flex: 6, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: '100%'}}>
                    <Text>Splash Screen</Text>
                </View>);

    return (
        <Stack.Navigator>

          <Stack.Group>
            {user.isAuthenticated? appTabs():authTabs()}
          </Stack.Group>

        </Stack.Navigator>
    );
}

//LOGO ANIMATION FADE IN
// const fadeAnim = useRef(new Animated.Value(0)).current;
//
// const fadeIn = () => {
//     // Will change fadeAnim value to 1 in 5 seconds
//     Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//     }).start();
// };
//
// <Animated.Image
//     onLoad={fadeIn}
//     style={[
//         {opacity: fadeAnim,
//             transform: [
//                 {
//                     scale: fadeAnim.interpolate({
//                             inputRange: [0,1],
//                             outputRange: [0.85, 1],
//                         }
//                     )
//                 }
//             ]},
//         {
//             width: '80%',
//             height: '20%',
//         }
//     ]}
//     resizeMode={'contain'}
//     source={require('../assets/novilogo.jpg')}/>
