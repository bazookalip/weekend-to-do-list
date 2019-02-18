const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');



// GET
router.get('/', (req, res) => {
    console.log('/tasks GET route was hit');
    pool.query('SELECT * FROM "tasks" ORDER BY id ASC')
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log('error with tasks select', error);
            res.sendStatus(500);
        });
});

// POST
router.post('/', (req, res) => {
    console.log('in /tasks POST route', req.body);
    pool.query(`INSERT INTO "tasks" ("task")
    VALUES ($1);`, [req.body.tasks])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error with task insert', error);
            res.sendStatus(500);
        });
});

// PUT
router.put('/:id', (req, res) => {
    //console.log('/tasks PUT request was hit');
    //console.log('req.params', req.params);
    if (req.body.status === 'done') {
        console.log('done!')
    } else {
        console.log('not done!')
    }
    pool.query(`UPDATE "tasks" SET "status"= $1 WHERE "id" = $2;`, [req.body.status, req.params.id])

        .then(() => {
            res.sendStatus(204);
        }).catch(error => {
            console.log('there was an error on the tasks PUT query', error);
            res.sendStatus(500);
        });
});


// DELETE
router.delete('/:id', (req, res) => {
    console.log('/task DELETE request was hit');
    console.log('req.params', req.params);
    pool.query(`DELETE FROM "tasks" WHERE "id"=$1;`, [req.params.id])
        .then(() => {
            res.sendStatus(204);
        }).catch(error => {
            console.log('there was an error on the task delete query', error);
            res.sendStatus(500);
        });
});


module.exports = router;


