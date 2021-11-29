import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import { useUser, useUserUpdate } from "../AuthProvider/AuthProvider";
import DummyComp from "../Components/DummyComp";

const Stack = createNativeStackNavigator();

const authTabs = () => <Stack.Screen
    name="AuthTabs"
    component={DummyComp}
    options={{headerShown: false}}
/>

const appTabs = () => <Stack.Screen
    name="AppTabs"
    component={DummyComp}
    options={{headerShown: false}}
/>

export default function MyScreens() {
    const user = useUser()
    const setUser = useUserUpdate()
    const [isReady, setIsReady] = useState(false)

    const isTokenExpired = (expire_date) => {
        const expires = new Date(expire_date)
        const today = new Date()
        return today.getTime() >= expires.getTime();
    }

    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            await setUser({...user, token: token})
            
        } 
        catch (error) {
            console.log(error);
        }
        finally {
            setIsReady(true);
        }
    }

    useEffect(  () => {
        getData()
    }, [])

    if(!isReady)
        return (<View style={{flex: 6, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: '100%'}}>
                    <Text>Splash Screen</Text>
                </View>);

    return (
        <Stack.Navigator>
            
          <Stack.Group>
            {user.isAuthenticated? <>{appTabs()}{authTabs()}</>:<>{authTabs()}{appTabs()}</>}
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen
                name="Login"
                component={DummyComp}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Register"
                component={DummyComp}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Verify"
                component={DummyComp}
                options={{headerShown: false}}
            />
          </Stack.Group>

          <Stack.Group> 
            <Stack.Screen
                name="Notifications"
                component={DummyComp}
                options={{headerShown: false}}
            />
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
