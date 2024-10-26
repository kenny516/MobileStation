import React from 'react';
import HomeScreen from "../screens/HomeScreen";
import CompteurForm from "../screens/Lubrifiant/CompteurForm";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

function AppNavigation(props) {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="CompteurForm" component={CompteurForm}  options={{headerShown: false}} />
            {/* Other screens can be added here */}
        </Stack.Navigator>
    );
}

export default AppNavigation;