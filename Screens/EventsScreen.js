import React, {useEffect, useState} from 'react'
import {View, Text, FlatList, TouchableOpacity, SafeAreaView} from 'react-native'
import axios from "axios";
import {API_URL} from "../Constants/Constants";
import {useUser, useUserUpdate} from "../AuthProvider/AuthProvider";
import {Chip, Title} from "react-native-paper";
import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const EventsScreen = ({navigation}) => {
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const user = useUser()
    const setUser = useUserUpdate()

    const getEvents = () => {
        axios.get(`${API_URL}/events`
            , {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            })
            .then(function (response) {
                setData(response.data.data)
                setRefreshing(false)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }

    useEffect(() => {
        getEvents()
    }, [])

    const onPress = async (item) => {
        await setUser({...user, currentEvent: item})
        await navigation.navigate('Guests')
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token')
            await setUser({...user, isAuthenticated: false})
        }
        catch (e){
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={{height: '100%', flex: 1, paddingVertical: '5%', alignItems: 'center'}}>
            <View style={{flex: 1, flexDirection: 'row', marginTop: '5%', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <Title style={{color: 'black'}}>EVENTS</Title>
                <Chip style={{position: 'absolute', top: 16, right: 16}} mode='outlined' icon={() => <SimpleLineIcons name="logout" size={16} color="black" />} onPress={logout}>
                    <Text style={{color: 'gray'}}>logout</Text>
                </Chip>
            </View>
            <FlatList
                style={{height: '80%'}}
                data={data}
                renderItem={({item}) => <View style={{width: '100%',flex: 1, padding: '2%'}}><Chip icon="information" onPress={() => onPress(item)}><Text style={{color: 'black', fontWeight: 'bold', fontStyle: 'italic',fontSize: 22}}>{item.name}</Text></Chip></View>}
                keyExtractor={item => item.id}
                onRefresh={() => {setRefreshing(true); getEvents()}}
                refreshing={refreshing}
            />
        </SafeAreaView>
    )
}

export default EventsScreen
