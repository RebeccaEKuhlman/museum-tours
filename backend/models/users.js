/**const { nextTick } = require('process');
const jwt = require('jsonwebtoken' );
const accessTokenSecret  = 'mysupercoolsecret' ;**/

class User {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }
    close () {
        this.disconnect();
    }
    async fetchAllUsers () {
        const results = await this.DBQuery('SELECT * FROM users');
        return results;
    }
    async fetchUsersByName (username) {
        const results = await this.DBQuery('SELECT * FROM users WHERE name = ?', [username]);
        return results;
    }
    async authenticateUser  (username, password) {
        const users = await fetchUsersByName(username);
        console.log('Results of users query', users);
        if (users.length === 0) {
            console.error(`No users matched the username: ${username}`);
            return null;
        }
        const user = users[0];
        const { createHash } = require('crypto');
        function hash(string) {
            return createHash('sha256').update(string).digest('hex');
        }
        const hashed = hash(password + 'aB6nkeF0He3imq4AOhbO5kEljbveRpLn');
        const validPassword = await bcrypt.compare(hashed, user.password);
        if (validPassword) {
            const accessToken = jwt.sign({ ...users[0], claims: ['user'] }, accessTokenSecret );
            return accessToken;
        }
        return null;
        
     }
 }
 module.exports = User;
 