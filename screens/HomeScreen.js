import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native'

import DateHeader from '../components/DateHeader'

function HomeScreen({navigation}){

    const date = new Date()
    
    return (
        <SafeAreaView style={styles.block}>
            <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
            <DateHeader date={date}/>
            <View>
                <Text>할일 목록</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1
    }
})

export default HomeScreen
