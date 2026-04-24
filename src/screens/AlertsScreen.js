import React from 'react';
import  {View , Text, StyleSheet, ScrollView} from 'react-native';
import { useStudents } from '../store/StudentContext';
import { getAcademicStanding, getRegistrationHold, getRiskLevel } from '../utils/derived';
import StudentCard  from '../components/StudentCard';

export default function AlertsScreen() {
    const { students, isLoaded } = useStudents();
        if (!isLoaded) {
        return(
            <View style={styles.center}>
                <Text>Loading analytics...</Text>
            </View>
        );
    }

    const studentsWithHolds = students.filter(
        student => getRegistrationHold(student).hasHold);

    const highRiskStudents = students.filter(
        student => getRiskLevel(student) === 'High');

    const strugglingStudents = students.filter(student => {
        const standing = getAcademicStanding(student.gpa);
        return standing === 'Probation' || standing === 'Risk of Dismissal';
    });
    return(
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Alerts & Risk Dashboard</Text>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Students With Registration Holds ({studentsWithHolds.length})</Text>
            {studentsWithHolds.length > 0 ? (
            studentsWithHolds.map(student => (
                <StudentCard key={student.studentId} student={student} />
            ))) : 
            (<Text style={styles.emptyText}>No students with registration holds.</Text>)}
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>High-Risk Students ({highRiskStudents.length})</Text>
            {highRiskStudents.length > 0 ? (
            highRiskStudents.map(student => (
                <StudentCard key={student.studentId} student={student} />
            ))) : 
            (<Text style={styles.emptyText}>No high-risk students right now.</Text> )}
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Academically Struggling Students ({strugglingStudents.length})</Text>
            {strugglingStudents.length > 0 ? (
            strugglingStudents.map(student => (
                <StudentCard key={student.studentId} student={student} />
            ))
            ) : 
            (<Text style={styles.emptyText}>No students on probation or at risk of dismissal.</Text>)}
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 30,
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
    section: {
        marginBottom: 22,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    emptyText: {
        color: '#666',
        fontStyle: 'italic',
    },
});