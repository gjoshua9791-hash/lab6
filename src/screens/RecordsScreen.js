import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, Switch } from 'react-native';
import { useStudents } from '../store/StudentContext';
import StudentCard  from '../components/StudentCard';
import { useNavigation } from '@react-navigation/native';
import { useState, useMemo } from 'react';
import { getAcademicStanding, getRegistrationHold } from '../utils/derived';

export default function RecordsScreen() {
    const { students, loadSampleData, clearAllStudents, deleteStudent, isLoaded } = useStudents();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [filterMajor, setFilterMajor] = useState('All');
    const [filterStanding, setFilterStanding] = useState('All');
    const [showHoldsOnly, setShowHoldsOnly] = useState(false);

    const processedStudents = useMemo(() => {
        let results = [...students];

        if(filterMajor !== 'All') {
            results = results.filter((s) => s.major === filterMajor);
        }
        if(filterStanding !== 'All') {
            results = results.filter((s) => getAcademicStanding(s.gpa) === filterStanding);
        }
        if(showHoldsOnly) {
            results = results.filter((s) => getRegistrationHold(s).hasHold);
        }

        if(searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            results = results.filter((s) => s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q) || s.major.toLowerCase().includes(q));
        }

        results.sort((a, b) => {
            switch(sortBy) {
                case 'gpa':
                    return b.gpa - a.gpa;
                case 'units':
                    return b.units - a.units;
                case 'graduationYear':
                    return a.graduationYear - b.graduationYear;
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        return results;
    }, [students, searchQuery, sortBy, filterMajor, filterStanding, showHoldsOnly]);

    if(!isLoaded) {
        return (
            <View style={styles.center}>
                <Text>Loading student records...</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={processedStudents}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
            ListHeaderComponent={
                <View>
                <Text style={styles.title}>Student Records</Text>
                <Text style={styles.subtitle}>Total Students: {processedStudents.length}</Text>

                <View style={styles.buttonGroup}>
                <Button title="Load Sample Data" onPress={loadSampleData} />
                </View>
                <View style={styles.buttonGroup}>
                <Button title="Clear All Records" onPress={clearAllStudents} color="red" />
                </View>
                <View style={styles.buttonGroup}>
                    <Button title="Add New Student" onPress={() => navigation.navigate('StudentForm')}/>
                </View>
                <View style={styles.controls}>
                    <TextInput style={styles.input} placeholder="Search by name, ID, or major" value={searchQuery} onChangeText={setSearchQuery} />

                    <Text>Sort By:</Text>
                    <View style={styles.row}>
                    <Button title="Name" onPress={() => setSortBy('name')} />
                    <Button title="GPA" onPress={() => setSortBy('gpa')} />
                    <Button title="Units" onPress={() => setSortBy('units')} />
                    <Button title="Grad Year" onPress={() => setSortBy('graduationYear')} />
                    </View>

                    <Text>Filter by Major:</Text>
                    <View style={styles.row}>
                    <Button title="All" onPress={() => setFilterMajor('All')} />
                    <Button title="CS" onPress={() => setFilterMajor('Computer Science')} />
                    <Button title="Business" onPress={() => setFilterMajor('Business')} />
                    </View>

                    <Text>Filter by Standing:</Text>
                    <View style={styles.row}>
                    <Button title="All" onPress={() => setFilterStanding('All')} />
                    <Button title="Good" onPress={() => setFilterStanding('Good Standing')} />
                    <Button title="Probation" onPress={() => setFilterStanding('Probation')} />
                    </View>

                    <View style={styles.switchRow}>
                    <Text>Show Holds Only</Text>
                    <Switch value={showHoldsOnly} onValueChange={setShowHoldsOnly} />
                    </View>
                </View>
                </View>
            }
            ListEmptyComponent={
                <Text style={styles.empty}>No student records available.</Text>
            }
            renderItem={({ item }) => (
                <StudentCard
                student={item}
                onEdit={() => navigation.navigate('StudentForm', { student: item })}
                onDelete={() => deleteStudent(item.id)}

    />

  )}
/>
        
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
    controls: {
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 6,
        marginBottom: 10,
        backgroundColor: '#fff',
    },

});