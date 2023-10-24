import React, { useEffect, useState, useRef } from 'react'
import {
    addData,
    getCurrentTime
} from '../apis/firebase'

import {
    getToday,
    getTomorrow
} from '../utils/time'

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

function HomeScreen({ navigation, caretType, setCaretType, setPickCategory, loading, todos, route }){

   
    const categories = ['자기계발', '업무', '오락', '여행', '연애', 'IT', '취미']
    const [todoText, setTodoText] = useState('')
    const [warning, setWarning] = useState(false)
    const category = useRef('')
    const [placeholderText, setPlaceholderText] = useState('할일을 작성해주세요')

    const date = (route.params && route.params.date)? new Date(route.params.date) : new Date()
    const today = getToday(date)
    const tomorrow = getTomorrow(getToday(date))
    const todosToday = todos.filter(todo => todo.createdAt?.toDate() >= today && todo.createdAt?.toDate() < tomorrow)
    const todosTodayLatest = [...todosToday]
    todosTodayLatest.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)

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
            {todosTodayLatest.length === 0? <Default/> : <TodoList todos={todos}/>}
            <TodoInsert 
                onInsertTodo={onInsertTodo} 
                todoText={todoText} 
                setTodoText={setTodoText}
                warning={warning}
                setWarning={setWarning}
                disabled={today.getTime() !== getToday(new Date()).getTime()}
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
