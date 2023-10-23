import React, { useEffect, useState, useRef } from 'react'
import {
    addData,
    getCollection,
    getCurrentTime
} from '../apis/firebase'

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

function HomeScreen({ navigation, caretType, setCaretType, setPickCategory }){

    const date = new Date()
    const categories = ['자기계발', '업무', '오락', '여행', '연애', 'IT', '취미']
    const [todos, setTodos] = useState([])
    const [todoText, setTodoText] = useState('')
    const [warning, setWarning] = useState(false)
    const [loading, setLoading] = useState(true)
    const category = useRef('')
    const [placeholderText, setPlaceholderText] = useState('할일을 작성해주세요')

    const onInsertTodo = async (trimedText) => {
        if(!category.current){
            setTodoText('')
            setPlaceholderText('카테고리를 먼저 선택해주세요')
            setWarning(true)
            return
        }

        if(trimedText && trimedText.length > 2){
            // const nextId = todos.length + 1
            // const todoContents = trimedText.split(',')
            // const createdTime = new Date()

            
            if(todos.filter(todo => todo.title === trimedText).length > 0){
                setTodoText('')
                setPlaceholderText('할일이 이미 존재합니다')
                setWarning(true)
            }else{
                const newTodo = {
                    title: trimedText,
                    category: category.current || '자기계발',
                    isDone: false,
                    createdAt: getCurrentTime(),
                }

                await addData('todos', newTodo)
                Keyboard.dismiss()
                setTodoText('')
                category.current = ''
                setPickCategory('')
            }
        }else{
            setTodoText('')
            setPlaceholderText('3자 이상 입력하세요')
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
        setPickCategory(item)
    }

    useEffect(() => navigation.addListener('focus', () => console.log('페이지 로딩')), [])
    useEffect(() => navigation.addListener('blur', () => console.log('페이지 벗어남')), [])

    useEffect(() => {
        function onResult(querySnapshot){
            const list = []
            querySnapshot.forEach(doc => {
                list.push({
                    ...doc.data(),
                    id: doc.id,
                })
            })

            setTodos(list)

            if(loading){
                setLoading(false)
            }
        }

        function onError(error){
            console.error(`${error} occured when reading todos`)
        }

        return getCollection('todos', 
                                onResult, onError,
                                null,
                                {exists: true, condition: ['createdAt', 'asc']},
                                null
                            )
        

    }, [])

    if(loading){
        return (
            <View>
                <Text>로딩중...</Text>
            </View>
        )
    }

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
                placeholderText={placeholderText}
                setPlaceholderText={setPlaceholderText}
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
