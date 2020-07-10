INSERT INTO "department" (name) VALUES ('Sales');
INSERT INTO "department" (name) VALUES ('HR');
INSERT INTO "department" (name) VALUES ('Development');
INSERT INTO "department" (name) VALUES ('IT');

INSERT INTO "role" (title, salary, department_id) VALUES ('Head of Sales', 180000, 1);
INSERT INTO "role" (title, salary, department_id) VALUES ('Administrative Assistant', 60000, 2);
INSERT INTO "role" (title, salary, department_id) VALUES ('Designer', 120000, 3);
INSERT INTO "role" (title, salary, department_id) VALUES ('Network Administrator', 90000, 4);

INSERT INTO "employee" (first_name, last_name, role_id, manager_id) VALUES ('Sam', 'Johnson', 1, null);
INSERT INTO "employee" (first_name, last_name, role_id, manager_id) VALUES ('Anna', 'Bates', 2, 1);
INSERT INTO "employee" (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 4, 2);
