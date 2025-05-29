const express = require('express');
const app = express();
const path = require('path');
const home2Router = require('./routes/home2');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use('/home2', home2Router);

module.exports = app;