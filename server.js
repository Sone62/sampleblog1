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
// Home page new
app.get('/', async (req, res) => {
  try {
    const channels = await prisma.Channels.findMany();
    res.render('pages/home_new', { channels });
  } catch (error) {
    console.error(error);
    res.render('pages/home_new', { channels: [] });
  }
});
// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// search
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

// gen_hg
app.get('/gen_hg', function(req, res) {
  res.render('pages/gen_hg');
});
// gen_recyclehg
app.get('/gen_recyclehg', function(req, res) {
  res.render('pages/genrecyclehg');
});
// gen_recyclehgbatt
app.get('/gen_recyclehgbatt', function(req, res) {
  res.render('pages/gen_recyclehgbatt');
});

//backend to pass data to frontend
app.get('/channels', async (req, res) => {
  try {
    const channels = await prisma.Channels.findMany();
    console.log("test",channels);
    res.render('pages/channels', { channels });
  } catch (error) {
    console.error(error);
    res.render('pages/channels', { channels: [] });
  }
});

// Show matching channels in results
app.post('/results', async (req, res) => {
  const { item } = req.body;
  try {
    const results = await prisma.Channels.findMany({
      where: {
        Items: { contains: item, mode: 'insensitive' }
      },
      orderBy: {
        DistanceFromHougang: 'asc'
      },
      take: 10
    });
    res.render('pages/results', { results, item });
  } catch (error) {
    console.error(error);
    res.render('pages/results', { results: [], item });
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});