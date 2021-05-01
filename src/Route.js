import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';// 

import Login from './pages/login';
import Register from './pages/register';


const Stack = createStackNavigator();

const Route = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Login"} headerMode="none">
                <Stack.Screen name={"Login"} component={Login}
                // options={{
                //     headerTransparent: true,
                // }}
                />
                <Stack.Screen name={"Register"} component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};
export default Route;