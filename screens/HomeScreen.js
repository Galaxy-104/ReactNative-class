import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native'

import Default from '../components/Default'
import DateHeader from '../components/DateHeader'
import TodoInsert from '../components/TodoInsert'
import TodoList from '../components/TodoList'

function HomeScreen({navigation}){

    const date = new Date()
    const [todos, setTodos] = useState([
        {id: 1, title: '공원에 산책가기', category: '여행', createdAt: '2023-08-22', isDone: false},
        {id: 2, title: '보고서 작성하기', category: '업무', createdAt: '2023-08-22', isDone: true},
        {id: 3, title: '자기전에 책읽기', category: '자기계발', createdAt: '2023-08-22', isDone: false},
    ])
    const [todoText, setTodoText] = useState('')
    const onInsertTodo = (trimedText) => {
        if(trimedText && trimedText.length > 2){
            const nextId = todos.length + 1
            const todoContents = trimedText.split(',')
            const createdTime = new Date()

            const newTodo = {
                id: todos.length + 1,
                title: todoContents[0],
                category: todoContents[1] || '자기계발',
                createdAt: `${createdTime.getFullYear()}-${createdTime.getMonth() + 1}-${createdTime.getDate()}`
            }

            if(todos.filter(todo => toto.title === newTodo.title).length > 0){
                setTodoText('할일이 이미 존재합니다')
            }else{
                setTodos([...todos, newTodo])
                keyboard.dismiss()
                setTodoText('')
            }
        }else{
            setTodoText('3자 이상 입력하세요')
        }
    }

    return (
        <SafeAreaView style={styles.block}>
            <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
            <DateHeader date={date}/>
            {todos.length === 0? <Default/> : <TodoList todos={todos}/>}
            <TodoInsert onInsertTodo={onInsertTodo} todoText={todoText} setTodoText={setTodoText}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1
    }
})

export default HomeScreen
