const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const routes = require('./api/router');
const errorHandlers = require('./errors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/its_books', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static(path.join(__dirname,'public')));
// TO-DO body parser
app.set('view engine', 'ejs');
app.use('/api', morgan('tiny'));
app.use('/api', routes);


// torna il frontend sviluppato in Angular (single page application)
app.use((_, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
})

app.use(errorHandlers);

module.exports = app;