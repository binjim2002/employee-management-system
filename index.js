require('dotenv').config();
const inquirer = require('inquirer');
const database = require('./config/db');

const db = database.init();

const mainMenuQuestions = [
    {
        name: 'action',
        message: 'What would you like to do?',
        type: 'list',
        choices: ['Add department', 'Add employee', 'Add role', 'View employees', 'View departments', 'View roles']
    }
];