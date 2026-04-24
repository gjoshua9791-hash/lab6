import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import { getAcademicStanding, getEnrollmentLoad, getRegistrationHold, getRiskLevel } from '../utils/derived';

export default function StudentCard({student, onEdit, onDelete}) {
    const standing = getAcademicStanding(student.gpa);
    const load = getEnrollmentLoad(student.units);
    const hold = getRegistrationHold(student);
    const risk = getRiskLevel(student);

    return (
        <View style={styles.card}>
            <Text style={styles.name}>{student.name}</Text>
            <Text>Student ID: {student.studentId}</Text>
            <Text>Major: {student.major}</Text>
            <Text>GPA: {student.gpa}</Text>
            <Text>Units: {student.units} </Text>
            <Text>Graduation Year: {student.graduationYear}</Text>
            <Text>Unpaid Dues: ${student.unpaidDues.toFixed(2)}</Text>

            <View style={styles.divider} />
            <Text style={styles.derivedLabel}>Academic Standing: {standing}</Text>
            <Text style={styles.derivedLabel}>Enrollment Load: {load}</Text>
            <Text style={styles.derivedLabel}>Registration Hold: {hold.hasHold ? `Yes (${hold.reason})` : 'In Good Standing'}</Text>
            <Text style={styles.derivedLabel}>Risk Level: {risk}</Text>

            <View style={styles.actions}>
                <Button title="Edit" onPress={onEdit} />
                <Button title="Delete" onPress={onDelete} color="red" />
            </View>
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
    actions: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
