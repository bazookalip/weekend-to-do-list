const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
const router = require('./routes/tasks.router')

// ROUTES
app.use('/tasks', router)

app.listen(PORT, () => {
    console.log(`Running on port: ${port}`);
});