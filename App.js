import 'react-native-gesture-handler';
import React from 'react';
import { StudentProvider } from './src/store/StudentContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <StudentProvider>
        <AppNavigator />
    </StudentProvider>
  );
}