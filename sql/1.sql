CREATE TABLE students(id bigserial PRIMARY KEY, name varchar , phone varchar);

insert into students (name, phone) values('James', '+998999999999');
insert into students (name, phone) values('Victor', '+998999999999');
insert into students (name, phone) values('Jessica', '+998999999999');
insert into students (name, phone) values('Andrew', '+998999999999');
insert into students (name, phone) values('Kyrie', '+998999999999');

CREATE TABLE courses(id bigserial PRIMARY KEY, title text, level int default 1);

insert into courses (title, level) values ('Math advanced', 3);
insert into courses (title, level) values ('English intermediate', 9);
insert into courses (title, level) values ('Basketball', 11);
insert into courses (title, level) values ('Physics', 8);
insert into courses (title, level) values ('Chemistry', 9);

CREATE TABLE student_courses(student_id bigint , course_id bigint REFERENCES courses(id), constraint student_id_dk foreign key (student_id) references students(id));

insert into student_courses(student_id, course_id) values (1, 3);
insert into student_courses(student_id, course_id) values (1, 1);
insert into student_courses(student_id, course_id) values (2, 1);
insert into student_courses(student_id, course_id) values (3, 2);
insert into student_courses(student_id, course_id) values (4, 4);


-- studentlarni join orqali kurlari bilan chiqarish
SELECT students.name, courses.title as course from student_courses join students on student_courses.student_id = students.id join courses on student_courses.course_id = courses.id;
-- bitta kursda nechta student oqiyotganini chiqarish
SELECT count(students.name) as students_count, courses.title as course from student_courses join students on student_courses.student_id = students.id join courses on student_courses.course_id = courses.id group by courses.title;
-- student qoshib shu vaqtni ozida ikka course biriktirish
BEGIN;    insert into students (name, phone) values('gabriel', '940393330');  insert into student_courses(student_id, course_id) values (8, 2), (8, 3); COMMIT; 