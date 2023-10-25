import React, { useEffect, useState, useRef } from 'react'
import { 
  View, Text, 
  StyleSheet, 
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native'
import moment from 'moment'

import { updateData } from '../apis/firebase'

let lastTap = null

function TodoItem({ id, title, category, isDone, createdAt }){

  const [doubleTabbed, setDoubleTabbed] = useState(false)
  const [text, SetText] = useState("")
  const inputRef = useRef(null) 

  const handelDoubleTab = (e) => {
    setDoubleTabbed(!doubleTabbed)
    SetText(title)
  }
  const ishandleDoubleTap = () => {
    const now = Date.now()
    const delay = 300
    if(lastTap && (now - lastTap) < delay){
      return true
    }else{
      lastTap = now
      return false
    }
  }
  const handleTap = () => {
    updateData('todos', id, {
      isDone: !isDone
    })
  }
  const handlePress = (e) => {
    if(ishandleDoubleTap()){
      handelDoubleTab()
      handleTap()
    }else{
      handleTap()
    }
  }
  const handleBlur = (e) => {
    e.stopPropagation()
    setDoubleTabbed(!doubleTabbed)
    Keyboard.dismiss()
    updateDate('todos', id, {
      title: text.trim()
    })
  }
  const handleChange = (text) => {
    SetText(text)
  }
  const hideKeyboard = (e) => {
    Keyboard.dismiss()
  }

  useEffect(() => {
    if(inputRef.current){
      inputRef.current.focus()
    }
  })

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.item}>
        <View style={styles.titleMargin} onTouchStart={(e) => {e.stopPropagation()}}>
          {doubleTabbed?
            (
              <TouchableWithoutFeedback>
                <TextInput
                  value={text}
                  onblur={handleBlur}
                  ref={inputRef}
                  onChangeText={handleChange}
                  onSubmitEditing={hideKeyboard}
                />
              </TouchableWithoutFeedback>
            ) :
            <Text style={[styles.title, 
              {textDecorationLine: (isDone && !doubleTabbed) ? 'line-through' : 'none'}]}
            >
              {title}
            </Text>
          } 
        </View>
        <View>
          <Text>{category}({isDone? "종료" : "진행중"})</Text>
          <Text style={styles.dateText}>
            {createdAt && moment(createdAt.toDate()).format('YY-MM-DD')}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
      
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddinLeft: 10,
    paddingVertical: 10,
  },
  titleMargin: {
      marginRight: 10,
    },
  title: {
      fontWeight: 'bold',
      fontSize: 20,
  },
  dateText: {
      fontSize: 12,
  },
})

export default React.memo(TodoItem)