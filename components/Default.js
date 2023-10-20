import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

function Default(){
  return (
    <View style={styles.container}>
      <Image source={require('../assets/imgs/todo.png')} style={styles.image}/>
      <Text style={styles.guideText}>현재 할일 목록이 비어있습니다.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  guideText: {
    fontSize: 20,
    marginTop: 30,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'cover'
  },
})

export default Default