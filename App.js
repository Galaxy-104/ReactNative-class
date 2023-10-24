import React, { useState, useRef, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import HomeScreen from './screens/HomeScreen'
import CalendarScreen from './screens/CalendarScreen'
import DashBoardScreen from './screens/DashBoardScreen'
import SettingsScreen from './screens/SettingsScreen'

import DropdownCategory from './components/DropdownCategory'

import { getCollection } from './apis/firebase'

// const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function App(){

  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [caretType, setCaretType] = useState(false)
  const [pickCategory, setPickCategory] = useState('')


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
        setLoading(false)
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

  return (
    <NavigationContainer>
      {/* 내비게이션 설정 */}
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name='Home' children={(props) => <HomeScreen 
          {...props} 
          caretType={caretType} 
          setCaretType={setCaretType} 
          setPickCategory={setPickCategory}
          todos={todos}
          loading={loading}
        /> } options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => <Icon name='home' color={color} size={size}/>,
          headerTitle: (props) => <DropdownCategory {...props} caretType={caretType} setCaretType={setCaretType} pickCategory={pickCategory}/>,
          headerStyle: {
            backgroundColor: '#a8c8ff',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff'
          }
        }}/>
        <Tab.Screen name='Calendar' component={CalendarScreen} options={{
          title: '달력',
          tabBarIcon: ({ color, size }) => <Icon name='calendar-today' color={color} size={size}/>          
        }}/>
        <Tab.Screen name='DashBoard' component={DashBoardScreen} options={{
          title: '통계',
          tabBarIcon: ({ color, size }) => <Icon name='dashboard' color={color} size={size}/>          
        }}/>
        <Tab.Screen name='Settings' component={SettingsScreen} options={{
          title: '설정',
          tabBarIcon: ({ color, size }) => <Icon name='settings' color={color} size={size}/>          
        }}/>
      </Tab.Navigator>  
    </NavigationContainer>
  )
}

export default App;

