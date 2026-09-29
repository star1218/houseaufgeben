function Student(firstName, lastName, birthYear, grades) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.grades = grades;

    this.attendance = new Array(25);
    this.attendanceCount = 0;
}

Student.prototype.getAge = function() {
    return new Date().getFullYear() - this.birthYear;
};

Student.prototype.getAverageGrade = function() {
    if (this.grades.length === 0) {
        return 0;
    }

    const sum = this.grades.reduce((a, b) => a + b, 0);

    return sum / this.grades.length;
};

Student.prototype.present = function() {
    if (this.attendanceCount < 25) {
        this.attendance[this.attendanceCount] = true;
        this.attendanceCount++;
    } else {
        console.log("Ліміт 25 занять досягнуто");
    }
};

Student.prototype.absent = function() {
    if (this.attendanceCount < 25) {
        this.attendance[this.attendanceCount] = false;
        this.attendanceCount++;
    } else {
        console.log("Ліміт 25 занять досягнуто");
    }
};

Student.prototype.getAttendance = function() {
    if (this.attendanceCount === 0) {
        return 0;
    }

    const presentCount = this.attendance
        .slice(0, this.attendanceCount)
        .filter(value => value === true).length;

    return presentCount / this.attendanceCount;
};

Student.prototype.summary = function() {
    const averageGrade = this.getAverageGrade();
    const averageAttendance = this.getAttendance();

    if (averageGrade > 90 && averageAttendance > 0.9) {
        return "Молодець!";
    }

    if (averageGrade <= 90 && averageAttendance <= 0.9) {
        return "Редиска!";
    }

    return "Добре, але можна краще";
};

const student1 = new Student(
    "Іван",
    "Петренко",
    2004,
    [95, 98, 92, 96]
);

const student2 = new Student(
    "Олег",
    "Коваленко",
    2003,
    [85, 88, 90, 82]
);

const student3 = new Student(
    "Марія",
    "Шевченко",
    2005,
    [65, 70, 75, 60]
);

student1.present();
student1.present();
student1.present();
student1.present();
student1.present();

student2.present();
student2.present();
student2.absent();
student2.present();
student2.present();

student3.absent();
student3.present();
student3.absent();
student3.present();
student3.absent();

const students = [student1, student2, student3];

students.forEach(function(student) {
    console.log("------------------------");
    console.log("Студент:", student.firstName, student.lastName);
    console.log("Вік:", student.getAge());
    console.log("Середній бал:", student.getAverageGrade());
    console.log("Відвідуваність:", student.getAttendance());
    console.log("Результат:", student.summary());
});