import React, {useEffect, useState} from 'react'
import {View, Text, FlatList, TouchableOpacity, SafeAreaView} from 'react-native'
import axios from "axios";
import {API_URL} from "../Constants/Constants";
import {useUser} from "../AuthProvider/AuthProvider";
import {Button, Searchbar, Title} from "react-native-paper";

const GuestsScreen = ({navigation}) => {
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filterData, setFilterData] = React.useState([]);
    const [filterMode, setFilterMode] = React.useState(false);
    const user = useUser()

    useEffect(() => {
        const getGuests = () => {
            axios.get(`${API_URL}/${user.currentEvent.id}/guests`
                , {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                })
                .then(function (response) {
                    console.log(response.data)
                    setData(response.data.data)
                })
                .catch(function (error) {
                    console.log('error: ',error);
                })
        }
        getGuests()
    }, [])

    const onPress = (item) => {
        navigation.navigate('Details', {guest: item, eventId: user.currentEvent.id})
    }

    const scan = () => {
        navigation.navigate('Scan')
    }

    const add = () => {
        navigation.navigate('AddNew', {eventId: user.currentEvent.id, guestListId: 13})
    }

    const onChangeSearch = query => {
        setFilterMode(true)
        setSearchQuery(query)
        setFilterData(
            data.filter((person) => {
                if(person.first_name.toLowerCase().includes(query.toLowerCase()))
                    return person
                else if(person.last_name.toLowerCase().includes(query.toLowerCase()))
                    return person
            })
        )
        if(query === '')
            setFilterMode(false)
    }

    return (
        <SafeAreaView style={{height: '100%', flex: 1, paddingVertical: '5%', alignItems: 'center'}}>
            <Title style={{color: 'black', flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '5%'}}>GUESTS</Title>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{width: '90%', marginBottom: '2%'}}
            />
            <FlatList
                style={{height: '70%', width: '80%', alignContent: 'center'}}
                data={filterMode? filterData:data}
                renderItem={({item}) => <View style={{width: '100%',flex: 1, padding: '2%'}}>
                                            <TouchableOpacity onPress={() => onPress(item)}>
                                                <Text style={{color: 'black', justifyContent: 'center', alignItems: 'center', flex: 1}}>{item.first_name} {item.last_name}</Text>
                                            </TouchableOpacity>
                                        </View>}
                keyExtractor={item => item.id}
            />
            <View style={{width: '80%', marginTop: '5%', flexDirection: 'row'}}>
                <Button style={{width: '50%'}} mode="contained" onPress={scan}>
                    SCAN QR
                </Button>
                <Button style={{width: '50%'}} color={'lightgreen'} mode="contained" onPress={add}>
                    ADD GUEST
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default GuestsScreen
