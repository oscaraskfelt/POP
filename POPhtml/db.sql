\set ON_ERROR_STOP on

\c ai8812
drop database if exists pop;
create database pop;

\c pop

revoke all privileges on database pop from public;


drop table if exists task cascade;

CREATE TABLE task (id serial, titel text, innehåll text, startdatum date, slutdatum date,
PRIMARY KEY (id));

INSERT INTO task (titel, innehåll)
VALUES ('Task1', 'Content1'),
('Task2', 'Content2'),
('Task3', 'Content3');