const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const routes = require('./api/router');
const errorHandlers = require('./errors');
const passport = require('passport');
const passportConfig = require('./api/auth/passport-config');
const authRoutes = require('./api/auth/auth.router');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/its_books', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

app.use(express.static(path.join(__dirname,'public')));
// TO-DO body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

passportConfig.setup(passport);
app.use(passport.initialize());

app.set('view engine', 'ejs');
app.use('/api', morgan('tiny'));
app.use(authRoutes);
app.use('/api', routes);


// torna il frontend sviluppato in Angular (single page application)
app.use((_, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
})

app.use(errorHandlers);

module.exports = app;