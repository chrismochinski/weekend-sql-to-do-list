const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

//router/server side GET
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "todo" ORDER BY "id" LIMIT 50;';
  pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
  })
    .catch(error => {
      console.log('error making query!', error);
      res.sendStatus(500);
    });
});

//router/server side POST
router.post('/', (req, res) => {
  let newTask = req.body;
  console.log(`Adding task and description!`, newTask);

  let queryText = `INSERT INTO "todo" ("task", "description", "priority") 
                        VALUES ($1, $2, $3);`;
  pool.query(queryText, [newTask.task, newTask.description, newTask.priority])
    .then(result => {
      res.sendStatus(200);
    }).catch(error => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});

//router/server side DELETE
router.delete('/:id', (req,res) => {
  console.log(req.params);
  const taskID = req.params.id;
  const queryText = 'DELETE FROM "todo" WHERE "id" = $1;';
  pool.query(queryText, [taskID]).then((result) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log('Error in /todo DELETE function on todo.router.js', error);
    res.sendStatus(500);
  });
});

// router/server side PUT
router.put('/:id', (req,res) => {
  console.log('In PUT, req.params:', req.params);
  const taskID = req.params.id;
  const queryText = `UPDATE "todo" SET "isItDone" = 'TRUE' WHERE "id" = $1;`;
  pool.query(queryText, [taskID]).then((result) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log('Error in PUT:', error);
    res.sendStatus(500);
  });
});

module.exports = router;


