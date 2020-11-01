const express = require('express');

const app = express();

const mongoose = require(`mongoose`);
const bodyParser = require('body-parser');
const config = require('./config/config');

const url = config.bd_string;

const options = {  poolSize: 5, useNewUrlParser: true, useUnifiedTopology: true }


mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (error) => {
    console.log('error no banco' + error);
});

mongoose.connection.on('disconnected', () => {
    console.log('disconnected from mongo');
});

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(8080);

module.exports = app;
