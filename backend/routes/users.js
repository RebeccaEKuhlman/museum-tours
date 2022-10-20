const express = require('express');
/**
* A router is a special Express object that can be used to define how to route and manage
* requests. We configure a router here to handle a few routes specific to students
*/
const router = express.Router();
// Note: we don't specify `/students`, just `/`. The association to `/students` happens
// in the root index.js file

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.put('/', async (req, res, next) => {
    if (req.query.email) {
        const updatedUser = await req.models.users.updateUser(req.body.email, req.body.username);
        res.json(updatedUser);
        next();
    }

    if (req.query.password) {
        const updatedUser = await req.models.users.updateUser(req.body.password, req.body.username);
        res.json(updatedUser);
        next();
    }

    if (req.query.photoid) {
        const updatedUser = await req.models.users.updateUser(req.body.photoid, req.body.username);
        res.json(updatedUser);
        next();
    }

    if (req.query.uni_affiliation) {
        const updatedUser = await req.models.users.updateUser(req.body.uni_affiliation, req.body.username);
        res.json(updatedUser);
        next();
    }

    if (req.query.is_director) {
        const updatedUser = await req.models.users.updateUser(req.body.is_director, req.body.username);
        res.json(updatedUser);
        next();
    }

    if (req.query.bio) {
        const updatedUser = await req.models.users.updateUser(req.body.bio, req.body.username);
        res.json(updatedUser);
        next();
    }
});


module.exports = router;