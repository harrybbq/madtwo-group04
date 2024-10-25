import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screens/HomeScreen';
import Weather from './Screens/WeatherScreen';
import Scoreboard from './Screens/ScoreboardScreen'
import Login from './Screens/LoginScreen'
import RunScreen from './Screens/RunScreen';
import WalkScreen from './Screens/WalkScreen';
import CycleScreen from './Screens/CycleScreen';
import GymMapScreen from './Screens/GymMapScreen';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Weather" component={Weather} />
                <Stack.Screen name="Scoreboard" component={Scoreboard} />
                <Stack.Screen name="RunScreen" component={RunScreen} />
                <Stack.Screen name="WalkScreen" component={WalkScreen} />
                <Stack.Screen name="CycleScreen" component={CycleScreen} />
                <Stack.Screen name="GymMapScreen" component={GymMapScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
