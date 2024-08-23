const express = require('express');
const router = express.Router();
const redis = require('../redis');

router.get('/', async (req, res) => {
  try {
    const addedTodos = parseInt(await redis.getAsync('added_todos')) || 0;
    res.json({ added_todos: addedTodos });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;
