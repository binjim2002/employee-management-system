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
                break;
            case 'role':
                db.query('SELECT r.id, r.title, d.name as department FROM role r JOIN department d ON d.id = r.department_id',(err,result)=>{
                    if(err){
                        console.error('query failed')
                    }
                    console.table(result);
                    this.start();
                });
                break;
            case 'department':
                db.query('SELECT * FROM department',(err,result)=>{
                    if(err){
                        console.error('query failed')
                    }
                    console.table(result);
                    this.start();
                })
                break;
        }

        
    }
    async add(table){
        let questions = [];
        
        
        db.query(`SHOW COLUMNS FROM ${table}`, (err, structure)=>{
            if(err){
                console.error(err)
            }
            
            structure.forEach(field => {
                
                if(field.Field !== 'id'){
                    
                    switch(field.Field){
                        case 'manager_id':  
                            questions.push({
                                name: 'manager_id',
                                type:'list',
                                choices:this.constructChoices('employee',['first_name','last_name'])
                            });
                            
                        break;
                        case 'role_id': 
                            questions.push({
                                name: 'role_id',
                                type:'list',
                                choices:this.constructChoices('role',['title'])
                            });
                        break;
                        case 'department_id': 
                            questions.push({
                                name: 'department_id',
                                type:'list',
                                choices:this.constructChoices('department',['name'])
                            });
                        break;
                        default:
                            questions.push({
                                name: field.Field,
                                message: field.Field + ":",
    
                            });
                            break; 
                    }
                        
                    
                    
                    
                }
            })
            
            this.promptInsert(questions, table);
           
        });
        
    }
    constructChoices(entity, valueKeys){
        let choices = [];
        let short = '';
        this[entity].forEach(item => {
            let name = '';
            valueKeys.forEach(key => {
                name += item[key] + ' ';
                short = item[key];
            })
            
            choices.push({name:name, value: item.id, short:short})
        });
        
        return choices;
    }
    async promptInsert(questions, table){
        this.prompt(questions,answers =>{
            let keyValues = '';
            
            Object.keys(answers).forEach((key,i)=>{
                keyValues += (i>0?', ':' ') + key + ' = "' + answers[key] + '"';
            })
          
            db.query('INSERT INTO ' + table + ' SET ' + keyValues, (err,result)=>{
                if(err){
                    console.error('INSERT FAILED')
                }
                this.getTable(table,_ => this.start())
                
            })
        })
    }
    async prompt(questions, callback){
        callback(await inquirer.prompt(questions));

    }

}
const program = new Program();
program.init();
program.start(); 