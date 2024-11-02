// index.ts
import inquirer from 'inquirer';
import chalk from 'chalk';

interface Student {
    id: number;
    name: string;
    age: number;
}

let students: Student[] = [];
let nextId = 1;

const mainMenu = async () => {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['Add Student', 'Edit Student', 'Remove Student', 'View Students', 'Exit'],
    });

    switch (action) {
        case 'Add Student':
            await addStudent();
            break;
        case 'Edit Student':
            await editStudent();
            break;
        case 'Remove Student':
            await removeStudent();
            break;
        case 'View Students':
            viewStudents();
            break;
        case 'Exit':
            console.log(chalk.green('Goodbye!'));
            return;
    }

    // Repeat the menu
    await mainMenu();
};

const addStudent = async () => {
    const { name, age } = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Enter student name:' },
        { type: 'number', name: 'age', message: 'Enter student age:' },
    ]);

    const newStudent: Student = { id: nextId++, name, age };
    students.push(newStudent);
    console.log(chalk.green(`Student ${name} added successfully!`));
};

const editStudent = async () => {
    if (students.length === 0) {
        console.log(chalk.red('No students available to edit.'));
        return;
    }

    const { id } = await inquirer.prompt({
        type: 'list',
        name: 'id',
        message: 'Select a student to edit:',
        choices: students.map(student => ({ name: student.name, value: student.id })),
    });

    const student = students.find(s => s.id === id);
    if (student) {
        const { name, age } = await inquirer.prompt([
            { type: 'input', name: 'name', message: 'Enter new name:', default: student.name },
            { type: 'number', name: 'age', message: 'Enter new age:', default: student.age },
        ]);

        student.name = name;
        student.age = age;
        console.log(chalk.green(`Student ${id} updated successfully!`));
    }
};

const removeStudent = async () => {
    if (students.length === 0) {
        console.log(chalk.red('No students available to remove.'));
        return;
    }

    const { id } = await inquirer.prompt({
        type: 'list',
        name: 'id',
        message: 'Select a student to remove:',
        choices: students.map(student => ({ name: student.name, value: student.id })),
    });

    students = students.filter(student => student.id !== id);
    console.log(chalk.green(`Student removed successfully!`));
};

const viewStudents = () => {
    if (students.length === 0) {
        console.log(chalk.red('No students available.'));
        return;
    }

    console.log(chalk.blue('List of Students:'));
    students.forEach(student => {
        console.log(chalk.yellow(`ID: ${student.id}, Name: ${student.name}, Age: ${student.age}`));
    });
};

mainMenu();