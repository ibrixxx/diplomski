import React from 'react'
import {SafeAreaView, Text} from 'react-native'
import {Button, Caption, DataTable, Title} from "react-native-paper";
import axios from "axios";
import {API_URL} from "../Constants/Constants";
import {useUser} from "../AuthProvider/AuthProvider";

const DetailsScreen = ({navigation, route}) => {
    const {guest, eventId} = route.params
    const user = useUser()

    const print = () => {
        axios.get(`${API_URL}/${eventId}/name-tag/${guest.id}/print`
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
            <Title style={{color: 'black', flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '5%'}}>{guest.first_name} {guest.last_name}</Title>
            <DataTable style={{width: '90%', height: '70%'}}>
                <DataTable.Row>
                    <Caption style={{flex: 1}}>Company: </Caption>
                    <Text style={{color: 'black', flex: 3, paddingTop: '1%'}}>{guest.company}</Text>
                </DataTable.Row>
                <DataTable.Row>
                    <Caption style={{flex: 1}}>Email: </Caption>
                    <Text style={{color: 'black', flex: 3, paddingTop: '1%'}}>{guest.email}</Text>
                </DataTable.Row>
                <DataTable.Row>
                    <Caption style={{flex: 1}}>City: </Caption>
                    <Text style={{color: 'black', flex: 3, paddingTop: '1%'}}>{guest.city.name}</Text>
                </DataTable.Row>
                <DataTable.Row>
                    <Caption style={{flex: 1}}>Phone: </Caption>
                    <Text style={{color: 'black', flex: 3, paddingTop: '1%'}}>{guest.phone}</Text>
                </DataTable.Row>
                <DataTable.Row>
                    <Caption style={{flex: 1}}>Status: </Caption>
                    <Text style={{color: 'black', flex: 3, paddingTop: '1%'}}>{guest.status}</Text>
                </DataTable.Row>
            </DataTable>
            <Button style={{width: '80%'}} mode="contained" onPress={print}>
                PRINT
            </Button>
        </SafeAreaView>
    )
}

export default DetailsScreen
