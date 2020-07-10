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
class Program {
    init(){
        
        this.employee = [];
        this.role = [];
        this.department = [];
        ['employee','role','department'].forEach(table => {
            this.getTable(table,res=>{});
        })
        
    }
    start(){
        this.prompt(mainMenuQuestions, result => {
            const parts = result.action.split(' ');
            switch(parts[0]){
                case 'Add':
                    this.add(parts[1]);
                    break;
                case 'View':
                    this.view(parts[1].substring(0,parts[1].length-1));
                    break;
            }
        })
    }