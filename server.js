// Needed for dotenv
require("dotenv").config();

// Needed for Express
var express = require('express')
var app = express()

// Needed for EJS
app.set('view engine', 'ejs');

// Needed for public directory
app.use(express.static(__dirname + '/public'));

// Needed for parsing form data
app.use(express.json());       
app.use(express.urlencoded({extended: true}));

// Needed for Prisma to connect to database
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// Needed for Fetch API
const fetch = require('node-fetch');



// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// About page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// Search
app.get('/search', function(req, res) {
    res.render('pages/search');
});

// results
app.get('/results', function(req, res) {
    res.render('pages/results');
});

// gen
app.get('/gen', function(req, res) {
  res.render('pages/gen');
});

app.get('/channels', async (req, res) => {
  try {
    const channels = await prisma.Channels.findMany();
    res.render('pages/channels', { channels });
  } catch (error) {
    console.error(error);
    res.render('pages/channels', { channels: [] });
  }
});
app.post('/results', async (req, res) => {
  // handle search logic here
});

app.post('/results', async (req, res) => {
  const { category, channelId, description, location } = req.body;

  try {
    // Build the query conditions
    const where = {
      AND: [
        category ? { Type: { contains: category, mode: 'insensitive' } } : {},
        channelId ? { id: parseInt(channelId) } : {},
        description ? {
          OR: [
            { Desc: { contains: description, mode: 'insensitive' } },
            { Items: { contains: description, mode: 'insensitive' } }
          ]
        } : {},
        location ? {
          OR: [
            { Address: { contains: location, mode: 'insensitive' } },
            { Building: { contains: location, mode: 'insensitive' } }
          ]
        } : {}
      ]
    };

    // Query the Channels table
    const results = await prisma.Channels.findMany({ where });

    // Render the results page with the found channels
    res.render('pages/results', { results });
  } catch (error) {
    console.error(error);
    res.render('pages/results', { results: [] });
  }
});