import React from 'react';
import Main from './components/Main';
import Levels from './components/Levels';
import Level from './components/Level';
import EndLevel from './components/EndLevel';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, HeaderBackButton } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={Main}
                options={{title: 'Главная страница'}}
            />
            <Stack.Screen
                name="Levels"
                detachPreviousScreen={true}
                component={Levels}
                options={{title: 'Уровни'}}
            />
            <Stack.Screen
                name="EndLevel"
                component={EndLevel}
                options={{
                    title: ''
                }}
                
            />
            <Stack.Screen
                name="Level"
                component={Level}
                options={{title: 'Уровень'}}
            />
        </Stack.Navigator>
    </NavigationContainer>;
}