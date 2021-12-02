const dbPool = require('./db');
const express = require('express');
const axios = require('axios').default; 
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use(cors())

const spaceXAPIServie = "https://api.spacexdata.com/v3"

app.get('/', async (req, res) => {
    res.status(200);
    res.send("Space Station API");
}); 

app.get('/capsules', async (req, res) => {
    try {
        const response = await axios.get(`${spaceXAPIServie}/capsules`)
        const capsules = response.data
        res.status(200);
        res.json(capsules);
    } 
    catch (err) {
        res.status(500);
        res.send({
            error: err.message
        });
    }
    
});

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);