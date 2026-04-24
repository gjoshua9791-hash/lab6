import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RecordsScreen from '../screens/RecordsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import AlertsScreen from '../screens/AlertsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentFormScreen from '../screens/StudentFormScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerTitleAlign: 'center'}}>
            <Tab.Screen name="Records" component={RecordsStack} options={{ headerShown: false }} />
            <Tab.Screen name="Analytics" component={AnalyticsScreen} />
            <Tab.Screen name="Alerts" component={AlertsScreen} />
        </Tab.Navigator>
    );
}

function RecordsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center'}}>
            <Stack.Screen name="RecordsHome" component={RecordsScreen} options={{ title: 'Records' }} />
            <Stack.Screen name="StudentForm" component={StudentFormScreen} options={{ title: 'Student Form' }} />
        </Stack.Navigator>
    );
}