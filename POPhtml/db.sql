\set ON_ERROR_STOP on

\c ai8812
drop database if exists pop;
create database pop;

\c pop

revoke all privileges on database pop from public;


drop table if exists task cascade;

CREATE TABLE task (id serial, title text, content text, prio varchar(10), startdatum date, slutdatum date,
PRIMARY KEY (id));

INSERT INTO task (title, prio, content)
VALUES ('Task1', 'Grön', 'Content1'),
('Task2', 'Gul', 'Content2'),
('Task3', 'Röd', 'Content3');