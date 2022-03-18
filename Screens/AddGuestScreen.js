import React, {useState} from 'react'
import {SafeAreaView, ScrollView, Text, View} from 'react-native'
import {Button, Caption, DataTable, TextInput, Title} from "react-native-paper";
import axios from "axios";
import {API_URL} from "../Constants/Constants";
import {useUser} from "../AuthProvider/AuthProvider";

const AddGuestScreen = ({navigation, route}) => {
    const {eventId, guestListId} = route.params
    const [guestId, setGuestId] = useState(null)
    const [fName, setfName] = React.useState("");
    const [lName, setlName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const user = useUser()

    const save = async () => {
        const options = {
            first_name: fName,
            last_name: lName,
            email: email,
            company: company,
            phone: phone,
            city_id: 421,
            country_id: 132,
            venue: 7,
            guest_list_id: 13
        }
        console.log(options)
        axios.post(`${API_URL}/${eventId}/guests`, options
            , {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            })
            .then(function (response) {
                setGuestId(response.data.data.id)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }

    const print = () => {
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
            <ScrollView style={{width: '90%', height: '70%'}}>
                    <TextInput
                        label="First Name"
                        value={fName}
                        onChangeText={e => setfName(e)}
                        style={{marginBottom: '5%'}}
                    />
                    <TextInput
                        label="Last Name"
                        value={lName}
                        onChangeText={e => setlName(e)}
                        style={{marginBottom: '5%'}}
                    />
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={e => setEmail(e)}
                        style={{marginBottom: '5%'}}
                    />
                    <TextInput
                        label="Company"
                        value={company}
                        onChangeText={e => setCompany(e)}
                        style={{marginBottom: '5%'}}
                    />
                    <TextInput
                        label="Phone"
                        value={phone}
                        onChangeText={e => setPhone(e)}
                        style={{marginBottom: '5%'}}
                    />
            </ScrollView>
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

export default AddGuestScreen
