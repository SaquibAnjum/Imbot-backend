const express = require('express');
const router = express.Router();
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');

router.post('/extract', async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    res.json({ text: article?.textContent || '' });
  } catch (error) {
    console.error('Web scrape error:', error);
    res.status(500).json({ error: 'Failed to extract web content' });
  }
});

module.exports = router;
