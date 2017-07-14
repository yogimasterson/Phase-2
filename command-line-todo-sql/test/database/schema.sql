DROP DATABASE IF EXISTS todo_list_test;
CREATE DATABASE todo_list_test;

\c todo_list_test

DROP TABLE IF EXISTS todos;
CREATE TABLE todos(
	id SERIAL PRIMARY KEY,
	task VARCHAR(140) NOT NULL
);