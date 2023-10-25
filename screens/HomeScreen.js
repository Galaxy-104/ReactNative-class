import React, { useEffect, useState, useRef } from 'react'
import {
    addData,
    removeData,
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
    TouchableHighlight,
    Modal, Pressable, Alert
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

    const [modalOpen, setModalOpen] = useState(false)
    const [todoToRemove, setTodoToRemove] = useState({id: null, title: ''})

    const removeTodo = (id, title) => {
        setModalOpen(true)
        setTodoToRemove({id, title})
    }

    const handleRemove = () => {
        setModalOpen(false)
        removeData('todos', todoToRemove.id)
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
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalOpen}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.')
                    setModalOpen(!modalOpen)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.guideText}>
                            "{todoToRemove.title}"을 제거하시겠습니까?
                        </Text>
                        <View style={styles.alignHorizontal}>
                            <Pressable
                                style={[styles.button, styles.buttonClose, styles.remove]}
                                onPress={handleRemove}
                            >
                                <Text style={styles.textStyle}>삭제</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalOpen(false)}
                            >
                                <Text style={styles.textStyle}>닫기</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

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
            {todosTodayLatest.length === 0? <Default/> : <TodoList todos={todos} removeTodo={removeTodo}/>}
            <TodoInsert 
                onInsertTodo={onInsertTodo} 
                todoText={todoText} 
                setTodoText={setTodoText}
                warning={warning}
                setWarning={setWarning}
                placeholderText={placeholderText}
                setPlaceholderText={setPlaceholderText} 
                disabled={today.getTime() !== getToday(new Date()).getTime()}
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 50,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    alignHorizontal: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    guideText: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    button: {
        width: 70,
        height: 40,
        borderRadius: 10,
        padding: 0,
        elevation: 2,
        marginTop: 30,
        marginRight: 5,
        justifyContent: 'center'
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#a8c8ff',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    remove: {
        backgroundColor: 'red',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    }
})

export default HomeScreen
