import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import moment from 'moment'

function TodoItem({ id, title, category, isDone, createdAt }){

  return (
      <View style={styles.item}>
        <View style={styles.titleMargin}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <Text>{category}({isDone? "종료" : "진행중"})</Text>
          <Text style={styles.dateText}>
            {createdAt && moment(createdAt.toDate()).format('hh:mm:ss')}
          </Text>
        </View>
      </View>
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