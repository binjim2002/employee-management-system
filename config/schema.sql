CREATE SCHEMA `employees` DEFAULT CHARACTER SET utf8mb4 ;

CREATE TABLE `employees`.`department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `employees`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(30) NULL,
  `salary` DECIMAL(10,2) NULL,
  `department_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `department_id_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `department_id`
    FOREIGN KEY (`department_id`)
    REFERENCES `employees`.`department` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `employees`.`employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(30) NULL,
  `last_name` VARCHAR(30) NULL,
  `role_id` INT NULL,
  `manager_id` INT NULL,
  PRIMARY KEY (`id`));