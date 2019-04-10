\set ON_ERROR_STOP on

\c ai8812
drop database if exists pop;
create database pop;

\c pop

revoke all privileges on database pop from public;


drop table if exists task cascade;
drop table if exists popper cascade;


CREATE TABLE task 
(id         SERIAL,
title       TEXT,
content     TEXT,
prio        VARCHAR(10),
startdatum  DATE,
slutdatum   DATE,
PRIMARY KEY (id));

CREATE TABLE popper
(epost      VARCHAR(100),
losenord    VARCHAR(20),
PRIMARY KEY (epost));

INSERT INTO task (title, prio, content)
VALUES ('Task1', 'Grön', 'Content1'),
('Task2', 'Gul', 'Content2'),
('Task3', 'Röd', 'Content3');

INSERT INTO popper (epost, losenord)
VALUES ('exempel@exempel.com', '123456'),
('goran@persson.se', 'sosse123');
