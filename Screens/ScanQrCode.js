import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Camera} from "expo-camera";
import axios from "axios";
import {API_URL} from "../Constants/Constants";
import {useUser} from "../AuthProvider/AuthProvider";

const ScanQrCode = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [code, setCode] = useState(null);
    const user = useUser()

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const getGuest = async () => {
        if(code) {
            const newCode = code.substring(1, code.length - 1)
            const url = `${API_URL}/${user.currentEvent.id}/7/invitations/check/code/${newCode}`
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            });
            const {data} = res.data;
            await navigation.navigate('Details', {guest: data, eventId: user.currentEvent.id})
        }
    }

    return(
        <View style={styles.container}>
            <Camera
                onBarCodeScanned={async (...args) => {
                    const data = args[0].data;
                    const result = JSON.stringify(data);
                    console.log(result);
                    await setCode(result)
                    await getGuest()
                }}
                barCodeScannerSettings={{
                    barCodeTypes: ['qr'],
                }}
                style={{ flex: 1 }}
            />
        </View>
    );
}

export default ScanQrCode

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});
