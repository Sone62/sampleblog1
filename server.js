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

app.get('/tip', function(req, res) {
  res.render('pages/tip');
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

// items specific
app.get('/gen_ewaste', function(req, res) {
  res.render('pages/gen_ewaste');
});

app.get('/gen_clothes', function(req, res) {
  res.render('pages/gen_clothes');
});

app.get('/gen_recyclebatt', function(req, res) {
  res.render('pages/gen_recyclebatt');
});
app.get('/gen_furniture', function(req, res) {
  res.render('pages/gen_furniture');
});

app.get('/gen_bags', function(req, res) {
  res.render('pages/gen_bags');
});
app.get('/gen_book', function(req, res) {
  res.render('pages/gen_book');
});


//AMK-specific pages
app.get('/gen_amk', function(req, res) {
  res.render('pages/gen_amk');
});

app.get('/gen_donateamk', function(req, res) {
  res.render('pages/gen_donateamk');
});

app.get('/gen_recycleamk', function(req, res) {
  res.render('pages/gen_recycleamk');
});

app.get('/gen_repairamk', function(req, res) {
  res.render('pages/gen_repairamk');
});

//Hougang-specific pages
app.get('/gen_hg', function(req, res) {
  res.render('pages/gen_hg');
});

app.get('/gen_recyclehg', function(req, res) {
  res.render('pages/gen_recyclehg');
});



app.get('/gen_recyclehgbatt', function(req, res) {
  res.render('pages/gen_recyclehgbatt');
});

app.get('/gen_repairhg', function(req, res) {
  res.render('pages/gen_repairhg');
});

app.get('/gen_donatehg', function(req, res) {
  res.render('pages/gen_donatehg');
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
  const { estatecode, itemcategory } = req.query;
  try {
    const channels = await prisma.Channels.findMany({
      where: {
        Estatecode: estatecode,
        Itemcategory: itemcategory
      }
    });
    res.render('pages/results', { channels, estatecode, itemcategory });
  } catch (error) {
    console.error(error);
    res.render('pages/results', { channels: [], estatecode, itemcategory });
  }
});

// POST handler for filtering
app.post('/results', async (req, res) => {
  const { estatecode, itemcategory } = req.body;

  try {
    const channels = await prisma.Channels.findMany({
      where: {
        Estatecode: estatecode,
        Itemcategory: itemcategory
      }
    });

    res.render('pages/results', { channels, estatecode, itemcategory });
  } catch (error) {
    console.error(error);
    res.render('pages/results', { channels: [], estatecode, itemcategory });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});