import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import IndexScreen from '../scenes/uploadPortal';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Index" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Index" component={IndexScreen}/>
        </Stack.Navigator>
    );
}

export default AppNavigator;