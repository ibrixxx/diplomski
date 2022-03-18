import React, {useState} from 'react'
import {SafeAreaView, Text, View} from 'react-native'
import {Button, Caption, DataTable, TextInput, Title} from "react-native-paper";
import axios from "axios";
import {API_URL} from "../Constants/Constants";
import {useUser} from "../AuthProvider/AuthProvider";

const DetailsScreen = ({navigation, route}) => {
    const {eventId} = route.params
    const [guestId, setGuestId] = useState(null)
    const [email, setEmail] = React.useState("");
    const user = useUser()

    const save = () => {
        console.log(API_URL)
    }

    const print = () => {
        console.log('0p')
        axios.get(`${API_URL}/${eventId}/name-tag/${guestId}/print`
            , {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            })
            .then(function (response) {
                if(response.status === 200)
                    navigation.navigate('Guests')
                console.log(response)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }

    return (
        <SafeAreaView style={{height: '100%', flex: 1, paddingVertical: '5%', alignItems: 'center'}}>
            <Title style={{color: 'black', flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '5%'}}>NEW GUEST</Title>
            <View style={{width: '90%', height: '70%'}}>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={e => setEmail(e)}
                        style={{marginBottom: '5%'}}
                    />
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={e => setEmail(e)}
                        style={{marginBottom: '5%'}}
                    />
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={e => setEmail(e)}
                        style={{marginBottom: '5%'}}
                    />
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={e => setEmail(e)}
                        style={{marginBottom: '5%'}}
                    />
            </View>
            <View style={{width: '80%', marginTop: '5%', flexDirection: 'row'}}>
                <Button style={{width: '50%'}} color={'lightgreen'} mode="contained" onPress={save}>
                    SAVE
                </Button>
                <Button disabled={!guestId} style={{width: '50%'}} mode="contained" onPress={print}>
                    PRINT
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default DetailsScreen
