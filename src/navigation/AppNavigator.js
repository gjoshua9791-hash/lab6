import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RecordsScreen from '../screens/RecordsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import AlertsScreen from '../screens/AlertsScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerTitleAlign: 'center'}}>
            <Tab.Screen name="Records" component={RecordsScreen} />
            <Tab.Screen name="Analytics" component={AnalyticsScreen} />
            <Tab.Screen name="Alerts" component={AlertsScreen} />
        </Tab.Navigator>
    );
}