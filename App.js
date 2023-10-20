import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import HomeScreen from './screens/HomeScreen'
import CalandarScreen from './screens/CalandarScreen'
import DashBoardScreen from './screens/DashBoardScreen'
import SettingsScreen from './screens/SettingsScreen'

// const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function App(){

  return (
    <NavigationContainer>
      {/* 내비게이션 설정 */}
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name='Home' component={HomeScreen} options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => <Icon name='home' color={color} size={size}/>
        }}/>
        <Tab.Screen name='Calendar' component={CalandarScreen} options={{
          title: '달력',
          tabBarIcon: ({ color, size }) => <Icon name='calandar-today' color={color} size={size}/>          
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

