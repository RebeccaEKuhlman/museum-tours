class Rating {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }
    close () {
        this.disconnect();
    }
    async fetchAllRatings () {
        const results = await this.DBQuery('SELECT * FROM ratings');
        return results;
    }
    async fetchRatingsByUsername (username) {
        const results = await this.DBQuery('SELECT * FROM ratings WHERE username = ?', [username]);
        return results;
    }
    async fetchRatingsByTourname (tour_Name) {
        const results = await this.DBQuery('SELECT * FROM ratings WHERE tour_Name = ?', [tour_Name]);
        return results;
    }
 }
 module.exports = Rating;