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

app.get('/channels', async (req, res) => {
  try {
    const channels = await prisma.Channels.findMany(); // Capital 'C'
    res.render('pages/channels', { channels });
  } catch (error) {
    console.error(error);
    res.render('pages/channels', { channels: [] });
  }
});


// Handle form submission
app.post('/results', async (req, res) => {
  const { channelId } = req.body;
  try {
    // Find the selected channel by ID
    const channel = await prisma.Channels.findUnique({
      where: { id: parseInt(channelId) }
    });
    res.render('pages/results', { results: channel ? [channel] : [] });
  } catch (error) {
    res.render('pages/results', { results: [] });
  }
});

//update to pass channel to home page
app.get('/', async function(req, res) {
  try {
    const channels = await prisma.Channels.findMany();
    res.render('pages/home', { channels });
  } catch (error) {
    res.render('pages/home', { channels: [] });
  }
});
//Route to handle search form submission
app.post('/search-results', async (req, res) => {
  const { type } = req.body;
  try {
    const results = await prisma.Channels.findMany({
      where: { Type: type }
    });
    res.render('pages/results', { results });
  } catch (error) {
    console.error(error);
    res.render('pages/results', { results: [] });
  }
});

// Example: Search by type, location, or item
app.post('/search-results', async (req, res) => {
  const { type, location, item } = req.body;
  try {
    const results = await prisma.Channels.findMany({
      where: {
        AND: [
          type ? { Type: { contains: type, mode: 'insensitive' } } : {},
          location ? {
            OR: [
              { Address: { contains: location, mode: 'insensitive' } },
              { Street: { contains: location, mode: 'insensitive' } },
              { Building: { contains: location, mode: 'insensitive' } },
              { PostCode: { equals: parseInt(location) || 0 } }
            ]
          } : {},
          item ? {
            OR: [
              { Name: { contains: item, mode: 'insensitive' } },
              { Items: { contains: item, mode: 'insensitive' } }
            ]
          } : {}
        ]
      }
    });
    res.render('pages/results', { results });
  } catch (error) {
    res.render('pages/results', { results: [] });
  }
});


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
