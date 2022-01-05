//import { newsApiKey } from 'react-native-dotenv'
import { newsApiKey } from '@env'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import AriticleScreen from '../screens/AriticleScreen'

const Stack = createNativeStackNavigator()

export default AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Article" component={AriticleScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
