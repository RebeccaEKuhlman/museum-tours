app.post('/registration', async (request, response) => {
    try {
        console.log('Initiating PUT /registration request');
        console.log('Request has a body / payload containing:', request.body);
        console.log('Request has params containing:', request.query);
      
        const payload = request.body; // This payload should be an object containing update student data
        const id = request.query.id; // And pull the ID from the request params
        const { DBQuery, disconnect } = await connectToDatabase();
        const results = await DBQuery('POST user SET name = ? WHERE id = ?', [payload.name, id]);
        console.log('Results of my POST statement:', results);

      /**
       * username VARCHAR(30) NOT NULL PRIMARY KEY,
        password VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        joinDate DATE NOT NULL,
        photoId INT NOT NULL,
        uni_affilation VARCHAR(50),
        is_director BOOL DEFAULT False,
        bio VARCHAR(100),
        FOREIGN KEY (photoId) REFERENCES photos(photoId)
       * 
       */

      
        // Since we already know the id we're looking for, let's load the most up to date data
        const newlyCreatedRecord = await DBQuery('', [id]);
        disconnect();
        response.json(newlyCreatedRecord);
    } catch (err) {
        console.error('There was an error in PUT /students', err);
        response.status(500).json({ message: err.message });
    }
};