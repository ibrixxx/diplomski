import React, {useEffect, useState} from 'react'
import {View, Text, FlatList, TouchableOpacity, SafeAreaView} from 'react-native'
import axios from "axios";
import {API_URL} from "../Constants/Constants";
import {useUser, useUserUpdate} from "../AuthProvider/AuthProvider";
import {Chip, Title} from "react-native-paper";

const EventsScreen = ({navigation}) => {
    const [data, setData] = useState([])
    const user = useUser()
    const setUser = useUserUpdate()

    useEffect(() => {
        const getEvents = () => {
            axios.get(`${API_URL}/events`
                , {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                })
                .then(function (response) {
                    setData(response.data.data)
                })
                .catch(function (error) {
                    console.log('error: ',error);
                })
        }
        getEvents()
    }, [])

    const onPress = async (item) => {
        await setUser({...user, currentEvent: item})
        await navigation.navigate('Guests')
    }

    return (
        <SafeAreaView style={{height: '100%', flex: 1, paddingVertical: '5%', alignItems: 'center'}}>
            <Title style={{color: 'black', flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '5%'}}>EVENTS</Title>
            <FlatList
                style={{height: '80%'}}
                data={data}
                renderItem={({item}) => <View style={{width: '100%',flex: 1, padding: '2%'}}><Chip icon="information" onPress={() => onPress(item)}><Text style={{color: 'black', fontWeight: 'bold', fontStyle: 'italic'}}>{item.name}</Text></Chip></View>}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default EventsScreen
