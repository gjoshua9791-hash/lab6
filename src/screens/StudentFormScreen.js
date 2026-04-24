import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import { useStudents } from '../store/StudentContext';
import {validateStudent} from '../utils/validation';

export default function StudentFormScreen({ route, navigation }) {
    const { addStudent, updateStudent, students } = useStudents();
    const existingStudent = route.params?.student;

    const [form, setForm] = useState( existingStudent ? { ...existingStudent, age: String(existingStudent.age), gpa: String(existingStudent.gpa), units: String(existingStudent.units), graduationYear: String(existingStudent.graduationYear), unpaidDues: String(existingStudent.unpaidDues) } : {
        name: '', studentId: '', age: '', gpa: '', major: '', units: '', graduationYear: '', unpaidDues: ''
    });
    const [errors, setErrors] = useState({});

    function handleChange(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    function handleSubmit() {
        const validationErrors = validateStudent(form, students, existingStudent?.id);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        
        const formatted = {
            ...form, id: existingStudent ? existingStudent.id : Date.now().toString(), age: Number(form.age), gpa: Number(form.gpa), units: Number(form.units), graduationYear: Number(form.graduationYear), unpaidDues: Number(form.unpaidDues),
        };
        
        if (existingStudent) {
            updateStudent(formatted);
        } else {
            addStudent(formatted);
        }
        navigation.goBack();
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{existingStudent ? 'Edit Student' : 'Add Student'}</Text>

            {Object.values(errors).map((error, index) => (
                <Text key={index} style={styles.error}>{error}</Text>
            ))}
            {[[ 'name', 'Name'], [ 'studentId', 'Student ID'], ['age', 'Age'], ['gpa', 'GPA'], ['major', 'Major'], ['units', 'Units'], ['graduationYear', 'Graduation Year'], ['unpaidDues', 'Unpaid Dues']].map(([field, label]) => (
                <TextInput key={field} style={styles.input} placeholder={label} value={String(form[field])} onChangeText={(value) => handleChange(field, value)} keyboardType={['age', 'gpa', 'units', 'graduationYear', 'unpaidDues'].includes(field) ? 'numeric' : 'default'} />
                ))}
            <Button title="Save Student" onPress={handleSubmit} />
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 4,
    },
});