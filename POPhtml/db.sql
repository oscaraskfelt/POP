\set ON_ERROR_STOP on

\c ai8812
drop database if exists pop;
create database pop;

\c pop

revoke all privileges on database pop from public;


drop table if exists task cascade;
drop table if exists popper cascade;


CREATE TABLE popper
(epost      VARCHAR(100),
popper_name VARCHAR(50),
losenord    VARCHAR(20),
PRIMARY KEY (epost));

CREATE TABLE task 
(id         SERIAL,
title       TEXT,
content     TEXT,
prio        VARCHAR(10),
startdatum  TIMESTAMP default now(),
slutdatum   TIMESTAMP,
popper      varchar(100),
PRIMARY KEY (id),
FOREIGN KEY (popper) REFERENCES popper(epost));


INSERT INTO popper (epost, losenord, popper_name)
VALUES ('exempel@exempel.com', '123456', 'Exempel Exempelsson'),
('goran@persson.se', 'sosse123', 'Göran Persson');


INSERT INTO task (title, prio, content, popper)
VALUES ('Task1', 'Grön', 'Content1', 'exempel@exempel.com'),
('Task2', 'Gul', 'Content2', 'exempel@exempel.com'),
('Task3', 'Röd', 'Content3', 'goran@persson.se');
