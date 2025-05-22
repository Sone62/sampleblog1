require("dotenv").config();
const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});
// quick tip
app.get('/tip function(req, res) {
    res.render('pages/tip
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

//Hougang-specific pages
app.get('/gen_hg', function(req, res) {
  res.render('pages/gen_hg');
});

app.get('/gen_recyclehg', function(req, res) {
  res.render('pages/genrecyclehg');
});

app.get('/gen_recyclehgbatt', function(req, res) {
  res.render('pages/gen_recyclehgbatt');
});

app.get('/gen_repairhg', function(req, res) {
  res.render('pages/genrepairhg');
});

app.get('/gen_repairhg', function(req, res) {
  res.render('pages/genrepairhg');
});

// Woodlands-specific pages
app.get('/gen_recyclewoodlands', function(req, res) {
  res.render('pages/gen_recyclewoodlands');
});

app.get('/gen_repairwoodlands', function(req, res) {
  res.render('pages/gen_repairwoodlands');
});

app.get('/gen_donatewoodlands', function(req, res) {
  res.render('pages/gen_donatewoodlands');
});

app.get('/gen_woodlands', function(req, res) {
  res.render('pages/gen_woodlands');
});

//backend to pass data to frontend
app.get('/channels', async (req, res) => {
  try {
    const channels = await prisma.Channels.findMany();
    res.render('pages/channels', { channels });
  } catch (error) {
    console.error(error);
    res.render('pages/channels', { channels: [] });
  }
});

// Show matching channels based on estate and category
app.get('/results', async (req, res) => {
  const { estate, category } = req.query;
  try {
    const channels = await prisma.Channels.findMany({
      where: {
        Estatecode: estate, // No parseInt
        Items: {
          contains: category,
          mode: 'insensitive',
        },
      },
    });
    res.render('pages/results', { channels });
  } catch (error) {
    console.error(error);
    res.render('pages/results', { channels: [] });
  }
});

// POST handler for filtering
app.post('/results', async (req, res) => {
  let where = {};
  if (req.body.estatecode) {
    where.Estatecode = req.body.estatecode;
  }
  const itemcategory = req.body.itemcategory;

  try {
    const channels = await prisma.Channels.findMany({
      where: {
        ...where,
        Itemcategory: {
          equals: itemcategory,
          mode: 'insensitive',
        },
      },
    });
    res.render('pages/results', { channels });
  } catch (error) {
    console.error(error);
    res.render('pages/results', { channels: [] });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});