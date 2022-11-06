const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


  // router with query to get all genres from the database
router.get('/', (req, res) => {

  const sqlText = 'SELECT genres.name FROM genres;';

  pool.query(sqlText)
  .then((result) => {
    // console.log('response from genres', result.rows);
    res.send(result.rows);
  })
  .catch((error) => {
    console.error('error in get genres', error);
    res.sendStatus(500);
  })
  
});

module.exports = router;