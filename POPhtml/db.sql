\set ON_ERROR_STOP on

\c ai8812
drop database if exists pop;
create database pop;

\c pop

revoke all privileges on database pop from public;


drop table if exists task cascade;

CREATE TABLE task 
(id         SERIAL,
titel       TEXT,
innehåll    TEXT,
startdatum  DATE,
slutdatum   DATE,
PRIMARY KEY (id));

CREATE TABLE user
(epost      VARCHAR,
losenord    VARCHAR
PRIMARY KEY (epost));

INSERT INTO task (titel, innehåll)
VALUES ('Task1', 'Content1'),
('Task2', 'Content2'),
('Task3', 'Content3');

INSERT INTO USER (epost, losenord)
VALUES ('exempel@exempel.com', '123456'),
('goran@persson.se', 'sosse123');