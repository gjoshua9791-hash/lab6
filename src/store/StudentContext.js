import React, {createContext, useContext, useEffect, useReducer, useState } from 'react';
import { sampleData } from '../utils/data';
import { saveStudentsToStorage, loadStudentsFromStorage, clearStudentsFromStorage } from '../utils/storage';

const StudentContext = createContext();

const initialState = {
    students: [],
};

function studentReducer(state, action) {
    switch (action.type) {
        case 'SET_STUDENTS':
            return { ...state, students: action.payload};
        case 'ADD_STUDENT':
            return { ...state, students: [...state.students, action.payload]};
        case 'UPDATE_STUDENT':
                return {
                    ...state, students: state.students.map(student =>
                        student.id === action.payload.id ? action.payload : student),};

        case 'DELETE_STUDENT':
            return {
                ...state, students: state.students.filter((student) => student.id !== action.payload),
            };
        case 'CLEAR_STUDENTS':
            return { ...state, students: []};
        default:
            return state;

            }
        }

export function StudentProvider({ children }) {
    const [state, dispatch] = useReducer(studentReducer, initialState);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function initializeStudents() {
            const savedStudents = await loadStudentsFromStorage();
            dispatch({ type: 'SET_STUDENTS', payload: savedStudents });
            setIsLoaded(true);
        }
        initializeStudents();}, []);

    useEffect(() => {
        if (isLoaded) {
            saveStudentsToStorage(state.students);
        }
    }, [state.students, isLoaded]);

    const addStudent = (student) => {
        dispatch({ type: 'ADD_STUDENT', payload: student });
    };

    const updateStudent = (student) => {
        dispatch({ type: 'UPDATE_STUDENT', payload: student });
    };

    const deleteStudent = (id) => {
        dispatch({ type: 'DELETE_STUDENT', payload: id });
    };

    const clearAllStudents = async () => {
        dispatch({ type: 'CLEAR_STUDENTS' });
        await clearStudentsFromStorage();
    };

    const loadSampleData = () => {
        dispatch({ type: 'SET_STUDENTS', payload: sampleData });
    };

    return (
        <StudentContext.Provider value={{ students: state.students, addStudent, updateStudent, deleteStudent, clearAllStudents, loadSampleData, isLoaded }}>
            {children}
        </StudentContext.Provider>
    );
}

export function useStudents() {
    const context = useContext(StudentContext);
    if(!context) {
        throw new Error('useStudents must be used within a StudentProvider');
    }
    return context;
}
        