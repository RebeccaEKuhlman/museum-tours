export class User {
    constructor(username, email, photoId, uni_affiliation, bio){
        this.username = username;
        this.email = email;
        this.photoId = photoId;
        this.uni_affiliation = uni_affiliation;
        this.bio = bio;
        
    }
}

    // username VARCHAR(30) NOT NULL PRIMARY KEY,
	// password VARCHAR(100) NOT NULL,
	// email VARCHAR(50) NOT NULL,
	// joinDate DATE NOT NULL,
	// photoId INT NOT NULL,
  	// uni_affilation VARCHAR(50),
  	// is_director BOOL DEFAULT False,
  	// bio VARCHAR(100),
  	// FOREIGN KEY (photoId) REFERENCES photos(photoId)