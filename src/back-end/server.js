const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//setting up mongo schemes
const jokeSchema = new mongoose.Schema({
    id: Number,
    writer: String,
    joke: String,
    rating: Number, //the ratings
    ratings: [] //amount of ratings
});

const Joke = mongoose.model('Joke', jokeSchema);

//api functions
//helper functions
app.get('/api/jokes', async (req, res) => { //gets all jokes
    try {
        let jokes = await Joke.find();
        res.send(jokes);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    } 
});

//actual functions
app.post('/api/joke', async (req, res) => { //makes joke
    const joke = new Joke({
        id: Date.now(),
        writer: req.body.writer,
        joke: req.body.joke,
        rating: 5,
        ratings: ["5"]
    });
    try {
        await joke.save();
        res.send({joke:joke});
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});
app.get('/api/joke/:id', async (req, res) => { //gets joke by id
    try {
        let joke = await Joke.findOne({id:req.params.id});
        res.send(joke);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});
app.get('/api/joke', async (req, res) => { //gets a random joke
    try {
        let joke = await Joke.aggregate([{$sample: {size:1}}]);
        res.send(joke);    
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});
app.get('/api/jokes/:writer', async (req, res) => { //gets jokes by writer
   try {
       let jokes = await Joke.find({"writer": req.params.writer});
       res.send(jokes);
   } catch(err) {
        console.log(err);
        res.sendStatus(500);
   }
});
app.put('/api/joke/:id/:rating', async (req, res) => { //updates joke's ratings
    try {
        await Joke.updateOne(
            { id: req.params.id },
            { $push: { ratings: req.params.rating } }
        );
        let joke = await Joke.findOne({id:req.params.id});
        let sum = 0;
        for (let i = 0; i < Object.keys(joke.ratings).length; i++) {
            let number;
            if (joke.ratings[i] === "1") {number = 1}
            else if (joke.ratings[i] === "2") {number = 2}
            else if (joke.ratings[i] === "3") {number = 3}
            else if (joke.ratings[i] === "4") {number = 4}
            else if (joke.ratings[i] === "5") {number = 5}
            sum += number;
        }
        const amount = Object.keys(joke.ratings).length;
        let newRating = (sum / amount);
        await Joke.updateOne(
            { id: req.params.id },
            { $set: { rating: newRating } }
        );
        joke = await Joke.find({id:req.params.id});
        res.send(joke);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));