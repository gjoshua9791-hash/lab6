export function getAcademicStanding(gpa) {
    if (gpa >= 3.5) return 'Honors';
    if (gpa >= 2.0) return 'Good Standing';
    if (gpa >= 1.0) return 'Probation';
    return 'Risk of Dismissal';
}

export function getEnrollmentLoad(units) {
    if (units >= 12) return 'Full-time';
    if (units >= 6) return 'Part-time';
    return 'Less than part-time';
}

export function getRegistrationHold(student) {
    const standing = getAcademicStanding(student.gpa);
    if (student.unpaidDues > 500 ) {
        return {hasHold: true, reason: 'High Unpaid Dues'};
    }
    if (standing === 'Risk of Dismissal') {
        return {hasHold: true, reason: 'Academic Dismissal Risk'};
    }
    if (standing === 'Probation' && student.unpaidDues > 0) {
        return {hasHold: true, reason: 'Probation with Unpaid Dues'};
    }
    return {hasHold: false, reason: 'None'};
}

export function getRiskLevel(student) {
    let score = 0;
    if (student.gpa < 2.0) score += 2;
    if (student.gpa < 1.0) score += 2;
    if (student.unpaidDues > 500) score += 1;
    if (student.unpaidDues > 0) score += 1;
    if (student.units < 6) score += 1;
    if (score >= 4) return 'High';
    if (score >= 2) return 'Medium';
    return 'Low';
}