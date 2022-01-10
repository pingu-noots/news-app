import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
/* screens */
import HomeScreen from '../screens/HomeScreen'
import ArticleScreen from '../screens/ArticleScreen'
import ClipScreen from '../screens/ClipScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home1"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
    )
}

const ClipStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Clip" component={ClipScreen} />
        </Stack.Navigator>
    )
}

const screenOption = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName
        switch (route.name) {
            case 'Home':
                iconName = 'home'
                break
            case 'Clip':
                iconName = 'bookmark'
                break
        }
        return <FontAwesome name={iconName} size={size} color={color} />
    },
})

export default AppNavigaotor = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOption}>
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Clip"
                    component={ClipStack}
                    options={{ headerShown: false }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
