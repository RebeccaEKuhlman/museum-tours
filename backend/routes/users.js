app.post('/registration', async (request, response) => {
    try {
        console.log('Initiating PUT /registration request');
        console.log('Request has a body / payload containing:', request.body);
        console.log('Request has params containing:', request.query);
      
        const bodyParser = require('body-parser');
        app.use(bodyParser.json());
        const payload = request.body; // This payload should be an object containing user data
        const rawPass = request.query.password;
        const { createHash } = require('crypto');
        function hash(string) {
             return createHash('sha256').update(string).digest('hex');
        }
        const hashed = hash(rawPass + 'aB6nkeF0He3imq4AOhbO5kEljbveRpLn');
        const { DBQuery, disconnect } = await connectToDatabase();
        const date = new Date();
        const results = await DBQuery('INSERT INTO users(name) password(hashed) joinDate(date) photoId(0) VALUES (?)'
        , [payload.name]);
        console.log('Results of my POST statement:', results);
            //aB6nkeF0He3imq4AOhbO5kEljbveRpLn
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
        console.error('There was an error in POST /users', err);
        response.status(500).json({ message: err.message });
    }
});