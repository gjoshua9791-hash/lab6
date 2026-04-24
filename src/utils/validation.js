export function validateStudent(student, students, editingId = null){
    const errors = {};
    if (!student.name || student.name.trim() === '') {
        errors.name = 'Name is required';
    }
    if (!student.studentId || !student.studentId.trim()) {
        errors.studentId = 'Student ID is required';
    } else{
        const duplicate = students.some((existingStudent) => existingStudent.studentId === student.studentId && existingStudent.id !== editingId);
        if (duplicate) {
            errors.studentId = 'Student ID must be unique';
        }
    }
    if (student.age === '' || isNaN(Number(student.age))) {
        errors.age = 'Age is required and must be a number';
    } else {
        const age = Number(student.age);
        if (age < 15 || age > 80) {
            errors.age = 'Age must be between 15 and 80';
        }
    }
    if(student.gpa === '' || isNaN(Number(student.gpa))) {
        errors.gpa = 'GPA is required and must be a number';
    } else {
        const gpa = Number(student.gpa);
        if (gpa < 0.0 || gpa > 4.0) {
            errors.gpa = 'GPA must be between 0.0 and 4.0';
        }
    }
    if (!student.major || student.major.trim() === '') {
        errors.major = 'Major is required';
    }
    if (student.units === '' || isNaN(Number(student.units))) {
        errors.units = 'Units are required and must be a number';
    } else {
        const units = Number(student.units);
        if (units < 0 || units > 24) {
            errors.units = 'Units must be between 0 and 24';
        }
    }
    const currentYear = new Date().getFullYear();
    if (student.graduationYear === '' || isNaN(Number(student.graduationYear))){
        errors.graduationYear = 'Graduation Year is required and must be a number';
    } else {
        const graduationYear = Number(student.graduationYear);
        if (graduationYear < currentYear || graduationYear > currentYear + 10) {
            errors.graduationYear = `Graduation Year must be between ${currentYear} and ${currentYear + 10}`;
        }
    }
    if (student.unpaidDues === '' || isNaN(Number(student.unpaidDues))) {
        errors.unpaidDues = 'Unpaid Dues is required and must be a number';
    } else {
        const unpaidDues = Number(student.unpaidDues);
        if (unpaidDues < 0) {
            errors.unpaidDues = 'Unpaid Dues cannot be negative';
        }
    }
    return errors;
}
