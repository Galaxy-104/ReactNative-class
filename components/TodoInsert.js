import React, { useState } from 'react'
import { 
  View,
  Text, 
  TextInput,
  TouchableOpacity, 
  StyleSheet,
  Keyboard 
} from 'react-native'

function TodoInsert({ 
  onInsertTodo, 
  todoText, 
  setTodoText, 
  warning, 
  setWarning,
  placeholderText,
  setPlaceholderText
}){

  const onPress = () => {
    const trimedText = todoText.trim()
    onInsertTodo(trimedText)
  }

  const handleChange = (text) => {
    if(/\n/.test(text)){
      onPress()
    }else{
      setTodoText(text)
      setWarning(false)
      setPlaceholderText('할일을 작성해주세요')
    }
  }

  const hideKeyboard = () => {
    Keyboard.dismiss()
  }
  
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholderText}
        placeholderTextColor={warning? "red" : '#a8c8ff'}
        selectionColor={'#d6e3ff'}
        style={[styles.input, { color: warning? 'red' : '#a8c8ff' }]}
        value={todoText}
        blurOnSubmit={false}
        onChangeText={handleChange}
        returnKeyType="done"
        maxLength={50}
        autoCorrect={false}
        onSubmitEditing={hideKeyboard}
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
    flex: 1,
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