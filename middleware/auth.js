const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) => {
    const tokenHeader = req.headers.auth;

    if (!tokenHeader) return res.status(401).send({ error: 'token nao enviado!' });

    jwt.verify(tokenHeader, config.tokenSecretKey, (err, decoded) => {
        if(err) return res.status(401).send({error: 'token invalidao!'});
        res.locals.auth_data = decoded;
        return next();
    });
};

module.exports = auth;