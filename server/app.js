const dbPool = require('./db');
const express = require('express');
const axios = require('axios').default; 
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use(cors())

app.get('/', async (req, res) => {
    const rows = await dbPool.query('SELECT * FROM spaceData');
    res.status(200);
    res.send({
        result: JSON.stringify(rows)
    });
});

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);