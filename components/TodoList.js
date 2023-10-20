import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'

function TodoList({ todos }){
  return (
    <FlatList
      data={todos}
      style={styles.container}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <View style={styles.line}/>}
      renderItem={({item}) => (
        <View style={styles.item}>
          <View style={styles.titleMargin}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View>
            <Text>{item.category}</Text>
            <Text style={styles.dateText}>{item.createdAt}</Text>
          </View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  line: {
    backgroundColor: "#ddd",
    height: 1,
  },
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

export default TodoList