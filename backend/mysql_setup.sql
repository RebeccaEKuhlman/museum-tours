-- create database db
CREATE DATABASE museumtours;

-- use newly create database
USE museumtours;

-- create table in db
CREATE TABLE test_table (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
);

-- insert sample entry
INSERT INTO test_table (id) VALUES (5);

-- select sample entry
SELECT * FROM test_table;

-- -- create table in db
-- CREATE TABLE `db`.`test_table` (
--     `id` INT NOT NULL AUTO_INCREMENT,
--     `value` VARCHAR(45),
--     PRIMARY KEY (`id`),
--     UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
-- );

-- -- insert sample entry
-- INSERT INTO `db`.`test_table` (`value`) VALUES ('Sample Value');


