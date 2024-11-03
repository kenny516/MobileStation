import React from 'react';
import HomeScreen from "../screens/HomeScreen";
import CompteurLubrifiant from "../screens/lubrifiant/CompteurLubrifiant";
import {createStackNavigator} from "@react-navigation/stack";
import AchatLubrifiant from "../screens/lubrifiant/AchatLubrifiant";
import SortiePompiste from "../screens/compteur/SortiePompiste";
import SalesTable from "../screens/lubrifiant/ListeVente";
import EtatStock from "../screens/stock/EtatStock";
import CompteurCarbu from "../screens/compteur/CompteurCarbu";

const Stack = createStackNavigator();

function AppNavigation(props) {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="CompteurLubrifiant" component={CompteurLubrifiant} options={{headerShown: false}} />
            <Stack.Screen name="AchatLubrifiant" component={AchatLubrifiant} options={{headerShown: false}} />
            <Stack.Screen name="SortiePompiste" component={SortiePompiste} options={{headerShown: false}} />
            <Stack.Screen name="SalesTable" component={SalesTable} options={{headerShown: false}} />
            <Stack.Screen name="EtatStock" component={EtatStock} options={{headerShown: false}} />
            <Stack.Screen name="CompteurCarbu" component={CompteurCarbu} options={{headerShown: false}} />
            {/* Other screens can be added here */}
        </Stack.Navigator>
    );
}

export default AppNavigation;