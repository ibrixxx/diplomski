import React from 'react'
import { View } from 'react-native'
import {Button, TextInput} from "react-native-paper";
import {API_URL} from "../Constants/Constants";
import axios from "axios";
import {useUser, useUserUpdate} from "../AuthProvider/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const user = useUser()
    const setUser = useUserUpdate()

    const login = async () => {
        await setEmail(email.trim())
        const options = {
            email,
            password
        }
        const res = await axios.post(`${API_URL}/auth/login`, options);
        const data  = res.data;
        console.log(data.access_token)
        if(data){
            await AsyncStorage.setItem('token', data.access_token)
            await setUser({...user, isAuthenticated: true, token: data.access_token})
        }
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', padding: '15%',}}>
            <TextInput
                label="Email"
                value={email}
                onChangeText={e => setEmail(e)}
                style={{marginBottom: '5%'}}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={e => setPassword(e)}
                secureTextEntry={true}
                style={{marginBottom: '25%'}}
            />
            <Button mode="contained" onPress={login}>
                Log in
            </Button>
        </View>
    )
}

export default LoginScreen
