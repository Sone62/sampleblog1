const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Show the form
router.get('/', (req, res) => {
  res.render('pages/home2');
});

// Handle form submission and query
router.post('/', async (req, res) => {
  const { estatecode, itemcategory } = req.body;
  let results = [];
  try {
    results = await prisma.item.findMany({
      where: {
        estateCode: estatecode,
        category: itemcategory,
      },
    });
  } catch (e) {
    console.error(e);
  }
  res.render('pages/home2', { results });
});

module.exports = router;