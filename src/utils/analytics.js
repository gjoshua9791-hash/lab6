import { getAcademicStanding, getRegistrationHold } from './derived';

export function getTotalStudents(students) {
    return students.length;
}
export function getAverageGPA(students) {
    if (students.length === 0) return 0;
    const totalGPA = students.reduce((sum, student) => sum + student.gpa, 0);
    return totalGPA / students.length;
}
export function getHighestPerformingStudent(students) {
    if (students.length === 0) return null;
    return students.reduce((bestStudent, currentStudent) => (currentStudent.gpa > bestStudent.gpa) ? currentStudent : bestStudent);
}
export function getStandingDistribution(students) {
    return students.reduce((distribution, student) => {
        const standing = getAcademicStanding(student.gpa);
        distribution[standing] = (distribution[standing] || 0) + 1;
        return distribution;
    }, {});
}
export function getHoldCount(students) {
    return students.filter(student => getRegistrationHold(student).hasHold).length;
}
export function getStatsByMajor(students) {
    const grouped = students.reduce((result, student) => {
        if(!result[student.major]) {
            result[student.major] = { count: 0, totalGPA: 0, holdCount: 0 };
        }
        result[student.major].count++;
        result[student.major].totalGPA += student.gpa;
        if(getRegistrationHold(student).hasHold) {
            result[student.major].holdCount++;
        }
        return result;
    }, {});
    Object.keys(grouped).forEach(major => {
        grouped[major].averageGPA = grouped[major].totalGPA / grouped[major].count;
    });
    return grouped;
}