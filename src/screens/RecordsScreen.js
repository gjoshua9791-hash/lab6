import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useStudents } from '../store/StudentContext';
import { getAcademicStanding, getEnrollmentLoad, getRegistrationHold, getRiskLevel } from '../utils/derived';

export default function RecordsScreen() {
    const { students, loadSampleData, clearAllStudents, isLoaded } = useStudents();

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

            <FlatList
                data={students}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.empty}>No student records available.</Text>}
                renderItem={({ item }) => {
                    const standing = getAcademicStanding(item.gpa);
                    const load = getEnrollmentLoad(item.units);
                    const hold = getRegistrationHold(item);
                    const level = getRiskLevel(item);
                    
                    return (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text>Student ID: {item.studentId}</Text>
                        <Text>Major: {item.major}</Text>
                        <Text>GPA: {item.gpa}</Text>
                        <Text>Units: {item.units} </Text>
                        <Text>Graduation Year: {item.graduationYear}</Text>
                        <Text>Unpaid Dues: ${item.unpaidDues.toFixed(2)}</Text>

                        <View style={styles.divider} />
                        <Text style={styles.derivedLabel}>Academic Standing: {standing}</Text>
                        <Text style={styles.derivedLabel}>Enrollment Load: {load}</Text>
                        <Text style={styles.derivedLabel}>Registration Hold: {hold.hasHold ? `Yes (${hold.reason})` : 'In Good Standing'}</Text>
                        <Text style={styles.derivedLabel}>Risk Level: {level}</Text>
                    </View>
                );
            }}
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
    card: {
        backgroundColor: '#f9f9f9',
        padding: 14,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
    },
    divider: {
        marginVertical: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    derivedLabel: {
        fontWeight: '500',
        marginBottom: 4,
    },
});