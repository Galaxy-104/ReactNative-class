import React from "react";
import { View, Text, StyleSheet, Button } from "react-native"

function Counter({ count, onIncrease, onDecrease }){

    return (
        <View style={styles.wrapper}>
            <View style={styles.numberArea}>
                <Text style={styles.number}>{count}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="+1" onPress={onIncrease}/>
                <Button title="-1" onPress={onDecrease}/> 
            </View>
            
        </View>
    )

}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    numberArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        fontSize: 72,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
    }
})

export default Counter