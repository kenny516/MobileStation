import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./src/screens/HomeScreen";
import CompteurForm from "./src/screens/Lubrifiant/CompteurForm";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="CompteurForm" component={CompteurForm}  options={{headerShown: false}} />
        {/* Other screens can be added here */}
      </Stack.Navigator>
  );
};

const App = () => {
  return (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
  );
};

export default App;
