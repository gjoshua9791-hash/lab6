import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'student_data';

export async function saveStudentsToStorage(students) {
    try {
        const jsonValue = JSON.stringify(students);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (error) {
        console.error('Failed to save students:', error);
    }
}

export async function loadStudentsFromStorage() {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.error('Failed to load students:', error);
        return [];
    }
}

export async function clearStudentsFromStorage() {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clean students:', error);
    }
}