class Comment {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }
    close () {
        this.disconnect();
    }
    async fetchAllComments () {
        const results = await this.DBQuery('SELECT * FROM comments');
        return results;
    }
    async fetchCommentsByOvercomment(overComment) {
        const results = await this.DBQuery('SELECT * FROM comments WHERE overComment = ?', [overComment]);
        return results;
    }
    async fetchCommentssByTourname (tour_Name) {
        const results = await this.DBQuery('SELECT * FROM comments WHERE tour_Name = ?', [tour_Name]);
        return results;
    }
 }
 module.exports = Comment;