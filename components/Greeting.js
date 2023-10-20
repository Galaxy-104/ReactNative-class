import React from "react";
import { View, Text, StyleSheet } from 'react-native'

function Greeting(props){
    return (
        <View>
            <Text style={styles.greetingText}>
                안녕하세요, {props.name}님 
                리액트에 오신 것을 환영합니다!
            </Text>
        </View>
    )
}

export default Greeting

const styles = StyleSheet.create({
    greetingText: {
      fontSize: 18 // 50dp
    }
})