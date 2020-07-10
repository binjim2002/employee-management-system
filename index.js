require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql')


const db = mysql.createConnection({
    host:'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
db.connect();

const mainMenuQuestions = [
    {
        name: 'action',
        message: 'What would you like to do?',
        type: 'list',
        choices: [
            'Add department', 'Add employee', 'Add role', 
            'View employees', 'View departments', 'View roles',
            'Update employee'
        ]
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
                case 'Update':
                    this.update(parts[1]);
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
                'LEFT JOIN (SELECT id, CONCAT_WS(" ",first_name, last_name) as manager FROM employee) m ON m.id = e.manager_id', (err,result)=>{
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
    async update(table){
        const updateQuestions = [
            {
                name: 'id',
                message: 'Which employee would you like to update?',
                type: 'list',
                choices: this.constructChoices('employee',['first_name','last_name'])
            },
            {
                name: 'manager_id',
                message: 'Please select the employee\'s manager',
                type: 'list',
                choices: this.constructChoices('employee',['first_name','last_name'])
            },
            {
                name: 'role_id',
                message: 'Please select a role',
                type: 'list',
                choices: this.constructChoices('role',['title'])
            }
        ]
        this.prompt(updateQuestions, answers => {
            let keyValues = '';
            
            Object.keys(answers).forEach((key,i)=>{
                keyValues += (i>0?', ':' ') + key + ' = "' + answers[key] + '"';
            })
            let sql = "UPDATE employee SET " + keyValues + " WHERE id = " + answers.id;
            db.query(sql,(err,result)=>{
                if(err){
                    console.error('update failed')
                }
                this.start()
            })
        })
        
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
    showAscii(){
        let ascii = "" +
            "ooooooooooo                         o888                                              \n" +
            " 888    88  oo ooo oooo  ooooooooo   888   ooooooo  oooo   oooo ooooooooo8 ooooooooo8 \n" +
            " 888ooo8     888 888 888  888    888 888 888     888 888   888 888oooooo8 888oooooo8  \n" +
            " 888    oo   888 888 888  888    888 888 888     888  888 888  888        888         \n" +
            "o888ooo8888 o888o888o888o 888ooo88  o888o  88ooo88      8888     88oooo888  88oooo888 \n" +
            "                         o888                        o8o888                           \n" +
            "oooo     oooo                                                                                               o8     oooooooo8                        o8                            \n" +
            " 8888o   888   ooooooo   oo oooooo    ooooooo     oooooooo8 ooooooooo8 oo ooo oooo   ooooooooo8 oo oooooo o888oo  888       oooo   oooo oooooooo8 o888oo ooooooooo8 oo ooo oooo   \n" +
            " 88 888o8 88   ooooo888   888   888   ooooo888  888    88o 888oooooo8   888 888 888 888oooooo8   888   888 888     888oooooo 888   888 888ooooooo  888  888oooooo8   888 888 888  \n" +
            " 88  888  88 888    888   888   888 888    888   888oo888o 888          888 888 888 888          888   888 888            888 888 888          888 888  888          888 888 888  \n" +
            "o88o  8  o88o 88ooo88 8o o888o o888o 88ooo88 8o 888     888  88oooo888 o888o888o888o  88oooo888 o888o o888o 888o  o88oooo888    8888   88oooooo88   888o  88oooo888 o888o888o888o \n" +
            "                                                 888ooo888                                                                   o8o888      "
         console.log(ascii);    
    }

}
const program = new Program();
program.init();
program.showAscii();
program.start(); 