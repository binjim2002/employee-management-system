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
    async getTable(table,cb){
        db.query('SELECT * FROM ' + table,(err,results)=>{
            if(err){
                console.log('Unable to retrieve data from ' + table);
            }
            this[table] = results;
            cb(results);
        })
    }
    async view(table){
        switch(table){
            case 'employee':
                db.query('SELECT e.id, e.first_name, e.last_name, r.title, r.salary, m.manager ' + 
                'FROM employee e LEFT JOIN role r ON r.id = e.role_id ' + 
                'LEFT JOIN (SELECT id, CONCAT_WS(first_name, last_name) as manager FROM employee) m ON m.id = e.manager_id', (err,result)=>{
                    if(err){
                        console.error('query failed')
                    }
                    console.table(result);
                    this.start();
                });