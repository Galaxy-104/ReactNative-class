import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/HomeScreen'
import CalandarScreen from './screens/CalandarScreen'
import DashBoardScreen from './screens/DashBoardScreen'
import SettingsScreen from './screens/SettingsScreen'

const Stack = createNativeStackNavigator()

function App(){

  return (
    <NavigationContainer>
      {/* 내비게이션 설정 */}
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='Calendar' component={CalandarScreen}/>
        <Stack.Screen name='DashBoard' component={DashBoardScreen}/>
        <Stack.Screen name='Settings' component={SettingsScreen}/>
      </Stack.Navigator>  
    </NavigationContainer>
  )
}

export default App;

