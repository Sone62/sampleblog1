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


// Home page
app.get('/', async (req, res) => {
  try {
    const channels = await prisma.Channels.findMany();
    res.render('pages/home', { channels });
  } catch (error) {
    console.error(error);
    res.render('pages/home', { channels: [] });
  }
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

// gen1
app.get('/gen1', function(req, res) {
  res.render('pages/gen1');
});

// gen_donate
app.get('/gen_donate', function(req, res) {
  res.render('pages/gen_donate');
});

// gen_recycle
app.get('/gen_recycle', function(req, res) {
  res.render('pages/gen_recycle');
});
// gen_repair
app.get('/gen_repair', function(req, res) {
  res.render('pages/gen_repair');
});

// imagelibrary
app.get('/imagelibrary', function(req, res) {
  res.render('pages/imagelibrary');
});


//backend to pass data to frontend
app.get('/channels', async (req, res) => {
  try {
    const channels = await prisma.channels.findMany();
    console.log("test",channels);
    res.render('pages/channels', { channels });
  } catch (error) {
    console.error(error);
    res.render('pages/channels', { channels: [] });
  }
});

//Show matching channels in results
app.post('/results', async (req, res) => {
  const { type } = req.body;
  try {
    const results = await prisma.Channels.findMany({
      where: { Type: type }
    });
    res.render('pages/results', { results });
  } catch (error) {
    res.render('pages/results', { results: [] });
  }
});

app.post('/results', async (req, res) => {
  // handle search logic here
});

// Test Carbon Savings API
const carbonRoutes = require("./routes/carbon");
app.use("/api", carbonRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});