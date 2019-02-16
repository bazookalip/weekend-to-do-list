const express = require('express');
const router = express.Router();
const pg = require('pg');


// DB CONNECTION
const pool = pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'weekend-to-do-app',
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('Postgresql connected');
});

pool.on('error', (error) => {
    console.log('Error with postgres pool', error);
});

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
    console.log('/tasks PUT request was hit');
    console.log('req.params', req.params);
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


