const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = 5000;

const pool = pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'weekend-to-do-app',
    max: 10,
    idleTimeoutMillis: 30000
});


app.get('/tasks', (req, res) => {
    console.log('/tasks GET route was hit');
    pool.query('SELECT * FROM "tasks"')
        .then((result) => {
           console.log(result.rows);
           res.send(result.rows);
        }).catch((error) => {
            console.log('error with tasks select', error);
            res.sendStatus(500);
        });
});

app.post('/tasks', (req, res) => {
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


pool.on('connect', () => {
    console.log('Postgresql connected');
});

pool.on('error', (error) => {
    console.log('Error with postgres pool', error);
});

app.use(bodyParser.urlencoded({ extended: true }));



app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
});