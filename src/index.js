import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthLoadingScreen from './navigations/authLoading';
import AuthNavigator from './navigations/auth-navigator';
import AppNavigator from './navigations/app-navigator';

const Stack = createNativeStackNavigator();

const Index = () => {
    return (
        <Stack.Navigator initialRouteName="Load" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Load" component={AuthLoadingScreen}/>
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen name="App" component={AppNavigator} />
        </Stack.Navigator>
    );
}

export default Index;