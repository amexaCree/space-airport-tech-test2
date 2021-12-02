const dbPool = require('./db');
const express = require('express');
const axios = require('axios').default; 
const cors = require('cors')
const SpaceDataStore = require('./stores/spaceData');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use(cors())

const spaceXAPIServie = "https://api.spacexdata.com/v3"

const store = new SpaceDataStore()

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

app.get('/landpads', async (req, res) => {
    const rows = await dbPool.query('SELECT * FROM spaceData');
    res.status(200);
    res.send({
        result: JSON.stringify(rows)
    });
});

app.post('/landpads', async (req, res, next) => {
    if (!req.body.id) {
        res.status(400).send({
            error: "Please provide landpad id."
        });
    }
    else {
        next()
    }
})

app.post('/landpads', async (req, res, next) => {
    try {
        const landpad = await store.show(req.body.id);
        if (!!landpad) {
            console.log("retreived landpad data from database..")
            console.log("~", landpad)
            res.json(landpad);
        }
        else {
            next()
        }
    } catch(err) {
        console.log("err", err)
        res.status(500);
        res.send({
            error: err.message
        });
    }
})

app.post('/landpads', async (req, res) => {

    try {
        const id = req.body.id
        const response = await axios.get(`${spaceXAPIServie}/landpads/${id}`)
        let landpad = response.data

        let landpadData = {
            id: landpad.id,
            fullName: landpad.full_name,
            status: landpad.status,
            location: landpad.location.name,
        }

        const result = await store.create(landpadData)
        res.status(200);
        console.log("new landpad data saved..")
        console.log("~~", landpadData)
        res.json(landpadData);
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