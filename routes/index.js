const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({ message: 'hello auth user' });
});


router.post('/', (req, res) => {
    return res.send({ message: 'hello from post inde' });
});

module.exports = router;