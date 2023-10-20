import React, { useState } from 'react'
import { 
  View,
  Text, 
  TextInput,
  TouchableOpacity, 
  StyleSheet,
  Keyboard 
} from 'react-native'

function TodoInsert(){
  const [ todoText, setTodoText ] = useState('')
  const onPress = () => {
    setTodoText('')
    Keyboard.dismiss()
  }
  
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='할일을 작성해주세요'
        placeholderTextColor='#a8c8ff'
        selectionColor={'d6e3ff'}
        style={styles.input}
        onChangeText={setTodoText}
        onSubmitEditing={onPress}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPress}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>추가</Text>
          </View>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingLeft: 10,
    borderColor: 'transparent',
    borderTopWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 20,
    color: '#a8c8ff',
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#a8c8ff',
    width: 80,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#fff',
    letterSpacing: 3,
    fontWeight: 'bold',
    fontSize: 15,
  }
})

export default TodoInsert