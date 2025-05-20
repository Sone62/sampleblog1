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

// Main landing page
app.get('/', async function(req, res) {

    // Try-Catch for any errors
    try {
        // Get all blog posts
        const blogs = await prisma.post.findMany({
                orderBy: [
                  {
                    id: 'desc'
                  }
                ]
        });

        // Render the homepage with all the blog posts
        await res.render('pages/home', { blogs: blogs });
      } catch (error) {
        res.render('pages/home');
        console.log(error);
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


// Test RESULTS
app.get('/results', function(req, res) {
    res.render('pages/results');
});


// Example: Fetch e-waste collection points from data.gov.sg API
fetch('https://data.gov.sg/api/action/datastore_search?resource_id=7b7c1c6b-6c3c-4c7e-8e3e-2e6e6e7e7e7e')
  .then(response => response.json())
  .then(data => {
    const points = data.result.records;
    points.forEach(point => {
      // Display or process each point
      console.log(point);
    });
  });


app.get('/ewaste', async (req, res) => {
  const fetch = require('node-fetch');
  const url = 'https://data.gov.sg/api/action/datastore_search?resource_id=7b7c1c6b-6c3c-4c7e-8e3e-2e6e6e7e7e7e';
  const response = await fetch(url);
  const data = await response.json();
  const ewaste_points = data.result.records;
  res.render('pages/ewaste', { ewaste_points });
});

// Tells the app which port to run on
app.listen(8080);