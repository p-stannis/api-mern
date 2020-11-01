const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


const createUserToken = (userId, email) => {
    return jwt.sign({ id: userId, email: email }, config.tokenSecretKey, { expiresIn: config.tokenExpiresIn });
};

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de usuarios. ' + err });
    }
});

router.get('/byemail', (req, res) => {
    const { email } = req.query;
    Users.findOne({ email }, (err, data) => {
        if (err) return res.send({ error: 'erro na consulta de usuarios' });
        return res.send(data);
    });
});

router.post('/create', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes' });

    try {
        const existingUser = await Users.findOne({ email });

        if (existingUser) return res.status(400).send({ error: 'Usuario ja registrado' });

        const user = await Users.create(req.body);
        user.password = undefined;

        return res.status(201).send({ user, token: createUserToken(user.id, user.email) });
    }
    catch (err) {
        return res.status(500).send({ error: 'erro ao buscar usuario' + err });
    }
});

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes' });

    try {
        const user = await Users.findOne({ email }).select('+password');
        if (!user) return res.status(4000).send({ error: 'Usuario nao registrado' });

        const same = await bcrypt.compare(password, user.password);

        if (!same) return res.status(401).send({ error: 'erro ao autenticar usuario' });

        user.password = undefined;
        return res.send({ user, token: createUserToken(user.id, user.email) });
    }
    catch (err) {
        return res.status(500).send({ error: 'erro ao buscar usuario' + err });
    }
});

module.exports = router;