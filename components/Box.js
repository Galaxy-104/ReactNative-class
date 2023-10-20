import React from "react";
import { View, StyleSheet } from "react-native"

function Box(props){

    return (
        <View style={[
            styles.box, 
            props.rounded && styles.rounded,
            sizes[props.size],
            {backgroundColor : props.color}
        ]}></View>
    )

}

const styles = StyleSheet.create({
    box: {
        width: 64,
        height: 64,
        backgroundColor: 'black',
    },
    // 변경하고 싶은 스타일
    rounded: {
        borderRadius: 16,
    },
    small: {
        width: 32,
        height: 32,
    },
    meidum: {
        width: 64,
        height: 64,
    },
    large: {
        width: 128,
        height: 128,
    }
})

export default Box

Box.defaultProps = {
    size: 'medium',
    color: 'black'
}

const sizes = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large
}