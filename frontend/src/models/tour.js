export class Tour {
    constructor(tour_Name, tourDate, tourTime, tour_description, museum_name){
        this.tour_Name = tour_Name;
        this.tourDate = tourDate;
        this.tourTime = tourTime;
        this.tour_description = tour_description;
        this.museum_name = museum_name;
    }
}

    // tour_Name VARCHAR(30) NOT NULL PRIMARY KEY,
	// tourDate Date NOT NULL,
	// tourTime Time NOT NULL,
	// num_spaces_available int NOT NULL,
	// total_space int NOT NULL,
	// tour_description VARCHAR(30),
	// price int,
	// museum_name varchar(30) NOT NULL,
	// FOREIGN KEY (museum_name) REFERENCES museums(museum_name),
	// theme VARCHAR(30) NOT NULL