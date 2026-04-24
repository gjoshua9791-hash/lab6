import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useStudents } from '../store/StudentContext';
import StudentCard  from '../components/StudentCard';
import { useNavigation } from '@react-navigation/native';

export default function RecordsScreen() {
    const { students, loadSampleData, clearAllStudents, deleteStudent, isLoaded } = useStudents();
    const navigation = useNavigation();

    if(!isLoaded) {
        return (
            <View style={styles.center}>
                <Text>Loading student records...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Student Records</Text>
            <Text style={styles.subtitle}>Total Students: {students.length}</Text>
            <View style={styles.buttonGroup}>
                <Button title="Load Sample Data" onPress={loadSampleData} />
                </View>
                <View style={styles.buttonGroup}>
                <Button title="Clear All Records" onPress={clearAllStudents} color="red" />
                </View>
                <View style={styles.buttonGroup}>
                <Button title="Add New Student" onPress={() => navigation.navigate('StudentForm')} />
            </View>

            <FlatList
                data={students}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.empty}>No student records available.</Text>}
                renderItem={({ item }) => (
                    <StudentCard student={item}
                        onEdit={() => navigation.navigate('StudentForm', { student: item })}
                        onDelete={() => deleteStudent(item.id)}
    />

  )}
/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 16,
    },
    buttonGroup: {
        marginBottom: 12,
    },
    empty: {
        textAlign: 'center',
        marginTop: 24,
        fontSize: 16,
        color: '#666',
    },

});