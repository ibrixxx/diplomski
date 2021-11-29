import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const DummyComp = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.DummyComp}>Diplomski</Text>
            <Button onPress={() => navigation.navigate('Register')} title={'navigiraj'}/>
        </View>
    )
}

export default DummyComp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    DummyComp: {
        color: 'black',
        fontSize: 24,
    }
})
