import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DummyComp = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.DummyComp}>Diplomski</Text>
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
