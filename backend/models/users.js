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
    
 }
 module.exports = User;
 