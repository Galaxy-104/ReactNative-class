import React, { useEffect, useState, useRef } from 'react'
import { 
    SafeAreaView, 
    View, Text, 
    StyleSheet, 
    StatusBar, 
    Keyboard,
    FlatList,
    TouchableHighlight
} from 'react-native'

import Default from '../components/Default'
import DateHeader from '../components/DateHeader'
import TodoInsert from '../components/TodoInsert'
import TodoList from '../components/TodoList'
import DropdownItem from '../components/DropdownItem'

function HomeScreen({ navigation, caretType, setCaretType }){

    const date = new Date()
    const categories = ['자기계발', '업무', '오락', '여행', '연애', 'IT', '취미']
    const [todos, setTodos] = useState([
        {id: 1, title: '공원에 산책가기', category: '여행', createdAt: '2023-08-22', isDone: false},
        {id: 2, title: '보고서 작성하기', category: '업무', createdAt: '2023-08-22', isDone: true},
        {id: 3, title: '자기전에 책읽기', category: '자기계발', createdAt: '2023-08-22', isDone: false},
    ])
    const [todoText, setTodoText] = useState('')
    const [warning, setWarning] = useState(false)
    const category = useRef('')

    const onInsertTodo = (trimedText) => {
        if(!category.current){
            setTodoText('카테고리를 먼저 선택해주세요')
            setWarning(true)
            return
        }

        if(trimedText && trimedText.length > 2){
            const nextId = todos.length + 1
            const todoContents = trimedText.split(',')
            const createdTime = new Date()

            const newTodo = {
                id: todos.length + 1,
                title: todoContents[0],
                category: category.current || '자기계발',
                createdAt: `${createdTime.getFullYear()}-${createdTime.getMonth() + 1}-${createdTime.getDate()}`
            }

            if(todos.filter(todo => todo.title === newTodo.title).length > 0){
                setTodoText('할일이 이미 존재합니다')
                setWarning(true)
            }else{
                setTodos([newTodo, ...todos])
                Keyboard.dismiss()
                setTodoText('')
                category.current = ''
            }
        }else{
            setTodoText('3자 이상 입력하세요')
            setWarning(true)
        }
    }

    const closeDropdown = () => {
        caretType && setCaretType(false)
    }

    const handleOutSideOfMenu = () => {
        closeDropdown()
    }

    const selectCategory = (item, e) => {
        closeDropdown()
        category.current = item
    }

    useEffect(() => navigation.addListener('focus', () => console.log('페이지 로딩')), [])
    useEffect(() => navigation.addListener('blur', () => console.log('페이지 벗어남')), [])

    return (
        <SafeAreaView 
            style={styles.block}
            onTouchStart={handleOutSideOfMenu}
        >
            <StatusBar backgroundColor="#a8c8ffff"></StatusBar>

            {caretType && (
                <View 
                    style={styles.dropdownShadow}
                    onTouchStart={(e) => {
                        e.stopPropagation()
                    }}    
                >
                    <FlatList
                        data={categories}
                        keyExtractor={item => item}
                        renderItem={({item}) => (
                            <DropdownItem category={item} selectCategory={(e) => selectCategory(item, e)}/>
                        )}
                        style={styles.dropdownList}
                    />
                </View>
            )}

            <DateHeader date={date}/>
            {todos.length === 0? <Default/> : <TodoList todos={todos}/>}
            <TodoInsert 
                onInsertTodo={onInsertTodo} 
                todoText={todoText} 
                setTodoText={setTodoText}
                warning={warning}
                setWarning={setWarning}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1
    },
    dropdownList: {
        padding: 5,
    },
    dropdownShadow: {
        shadowOffset: { width: 0, height: 20 },
        shadowColor: '#000',
        shadowOpacity: 0.25,
        backgroundColor: '#fff',
        zIndex: 1,
        elevation: 1,
        position: 'absolute',
        top: -15,
        borderRadius: 5,
        margin: 15,
    },
})

export default HomeScreen
