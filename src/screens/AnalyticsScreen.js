import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useStudents } from '../store/StudentContext';
import { getTotalStudents, getAverageGPA, getHighestPerformingStudent, getStandingDistribution, getHoldCount, getStatsByMajor } from '../utils/analytics';


export default function AnalyticsScreen() {
    const { students, isLoaded} = useStudents();
    if (!isLoaded) {
    return(
        <View style={styles.center}>
            <Text>Loading analytics...</Text>
        </View>
    );
}

    const totalStudents = getTotalStudents(students);
    const averageGPA = getAverageGPA(students);
    const topStudent = getHighestPerformingStudent(students);
    const standingDistribution = getStandingDistribution(students);
    const holdCount = getHoldCount(students);
    const majorStats = getStatsByMajor(students);

    return (
            <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Analytics Dashboard</Text>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>System Overview</Text>
                <Text>Total Students: {totalStudents}</Text>
                <Text>Average GPA: {averageGPA.toFixed(2)}</Text>
                <Text>Students With Holds: {holdCount}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Highest Performing Student</Text>
                {topStudent ? (
                <>
                    <Text>Name: {topStudent.name}</Text>
                    <Text>Student ID: {topStudent.studentId}</Text>
                    <Text>Major: {topStudent.major}</Text>
                    <Text>GPA: {topStudent.gpa}</Text>
                </>) : 
                ( <Text>No students available.</Text>)}
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Standing Distribution</Text>
                {Object.keys(standingDistribution).length > 0 ? (
                Object.entries(standingDistribution).map(([standing, count]) => (
                    <Text key={standing}> {standing}: {count}</Text>))
                ) : 
                (<Text>No standing data available.</Text>)}
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Statistics by Major</Text>
                {Object.keys(majorStats).length > 0 ? (
                Object.entries(majorStats).map(([major, stats]) => (
                    <View key={major} style={styles.majorBlock}>
                        <Text style={styles.majorTitle}>{major}</Text>
                        <Text>Students: {stats.count}</Text>
                        <Text>Average GPA: {stats.averageGPA.toFixed(2)}</Text>
                        <Text>Holds: {stats.holdCount}</Text>
                        </View>
                ))
                ) : 
            ( <Text>No major data available.</Text>)}
            </View>
            </ScrollView>
        );
        }



const styles = StyleSheet.create({
    container: {
        paddingBottom: 30,
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
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 14,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    majorBlock: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    majorTitle: {
        fontWeight: '700',
        marginBottom: 4,
    },
});