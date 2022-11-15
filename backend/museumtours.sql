-- Create and Establish Connection
-- CREATE DATABASE museumtours;
USE museumtours;

CREATE TABLE photos(
	photoId INT PRIMARY KEY AUTO_INCREMENT,
  	photo_data VARCHAR(250),
  	caption VARCHAR(150),
	is_profile BOOL DEFAULT False
);


CREATE TABLE users(
	username VARCHAR(30) NOT NULL PRIMARY KEY,
	password VARCHAR(100) NOT NULL,
	email VARCHAR(50) NOT NULL,
	joinDate DATE NOT NULL,
	photoId INT NOT NULL,
  	uni_affilation VARCHAR(50),
  	is_director BOOL DEFAULT False,
  	bio VARCHAR(100),
  	FOREIGN KEY (photoId) REFERENCES photos(photoId)
);

CREATE TABLE museums(
	museum_name varchar(30) NOT NULL PRIMARY KEY,
	photoId INT NOT NULL,
	director VARCHAR(30) NOT NULL,
	FOREIGN KEY (director) REFERENCES users(username),
	num_exhibits int NOT NULL DEFAULT 0,
	FOREIGN KEY (photoId) REFERENCES photos(photoId)
);

CREATE TABLE tours(
	tour_Name VARCHAR(30) NOT NULL PRIMARY KEY,
	tourDate Date NOT NULL,
	tourTime Time NOT NULL,
	num_spaces_available int NOT NULL,
	total_space int NOT NULL,
	tour_description VARCHAR(30),
	price int,
	museum_name varchar(30) NOT NULL,
	FOREIGN KEY (museum_name) REFERENCES museums(museum_name),
	theme VARCHAR(30) NOT NULL
);

CREATE TABLE ratings(
	rating INT NOT NULL,
	username VARCHAR(30) NOT NULL,
	tour_Name VARCHAR(30) NOT NULL,
	museum_name VARCHAR(30) NOT NULL,
	FOREIGN KEY (username) REFERENCES users(username),
  	FOREIGN KEY (tour_Name) REFERENCES tours(tour_Name),
	FOREIGN KEY (museum_name) REFERENCES museums(museum_name),
	ratingID int NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (ratingID)
);

CREATE TABLE comments(
	commNum int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	content VARCHAR(100) NOT NULL,
	username VARCHAR(30) NOT NULL,
	tour_Name VARCHAR(30) NOT NULL,
	review_id INT NOT NULL,
	FOREIGN KEY (username) REFERENCES users(username),
   	FOREIGN KEY (tour_Name) REFERENCES tours(tour_Name),
   	like_sum int DEFAULT 0,
   	overComment int,
	FOREIGN KEY(review_id) REFERENCES ratings(ratingID)
);

CREATE TABLE booking(
    bookingID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(30) NOT NULL,
	tour_Name VARCHAR(30) NOT NULL,
	FOREIGN KEY (username) REFERENCES users(username),
   	FOREIGN KEY (tour_Name) REFERENCES tours(tour_Name)
);