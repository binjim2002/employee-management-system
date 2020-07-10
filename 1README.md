# employee-management-system


I. Description

MY-EMPLOYEE-MANAGEMENT-SYSTEM IS is a server side app that provide to our user a database in which are stored information for each employee.
The issue that i am trying to resolve with this app is to simplify data management in any sort of organization. 
I understand that as a business owner, our clients may want to be able to view and manage the departments, roles, and employees in their companies
So that they can organize and plan the business. This tool will be vital in helping them resolve the issue. The tools that I used in building this app is mySQL, HTML, CSS and JavaScript 


Installation
Usage
Credits
License

1. Installation
MY-EMPLOYEE-MANAGEMENT SYSTEM is a friendly app that our clients will be able to use. This will be install to the HR's computer or the Business owner's compny in case there is not HR sur us small businesses. 
To install it you need to run config/schema.sql .
For Demo purposes you may want to additionally execute confi/seeds.sql .
2. Usage
Using MY-EMPLOYEE-MANAGEMENT-SYSTEM is easy and simple. As soon as you open the app, you will be prompt to a series of question such as:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

  * Update employee managers

  * View employees by manager

  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

By answering these questions, our user will be able to store in the database important informtaion about his compny such : Department Id and Department name; role id, role, title ,salary ; employee Id, first and lastname role and manager Id.

3. Credits

This app was design and built by binjim2002 (Jimmy B. Kazadi)

my URL:   
 https://github.com/binjim2002/employee-management-system
  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

We can frame this challenge as follows:

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

How do you deliver this? Here are some guidelines:

* Use the [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to your MySQL database and perform queries.

* Use [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.

* Use [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. There is a built-in version of `console.table`, but the NPM package formats the data a little better for our purposes.

* You may wish to have a separate file containing functions for performing specific SQL queries you'll need to use. Could a constructor function or a class be helpful for organizing these?

* You will need to perform a variety of SQL JOINS to complete this assignment, and it's recommended you review the week's activities if you need a refresher on this.

![Employee Tracker](Assets/employee-tracker.gif)

### Hints

* You may wish to include a `seed.sql` file to pre-populate your database. This will make development of individual features much easier.

* Focus on getting the basic functionality completed before working on more advanced features.

* Review the week's activities for a refresher on MySQL.

* Check out [SQL Bolt](https://sqlbolt.com/) for some extra MySQL help.

## Minimum Requirements

* Functional application.

* GitHub repository with a unique name and a README describing the project.

* The command-line application should allow users to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

## Bonus

* The command-line application should allow users to:

  * Update employee managers

  * View employees by manager

  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

## Commit Early and Often

One of the most important skills to master as a web developer is version control. Building the habit of committing via Git is important for two reasons:

* Your commit history is a signal to employers that you are actively working on projects and learning new skills.

* Your commit history allows you to revert your codebase in the event that you need to return to a previous state.

Follow these guidelines for committing:

* Make single-purpose commits for related changes to ensure a clean, manageable history. If you are fixing two issues, make two commits.

* Write descriptive, meaningful commit messages so that you and anyone else looking at your repository can easily understand its history.

* Don't commit half-done work, for the sake of your collaborators (and your future self!).

* Test your application before you commit to ensure functionality at every step in the development process.

We would like you to have well over 200 commits by graduation, so commit early and often!


## Submission on BCS

You are required to submit the following:

* The URL of the GitHub repository

* A video demonstrating the entirety of the app's functionality 

- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
