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
    writer: String,
    joke: String,
    rating: Number,
    ratings: Number //amount of ratings
});
jokeSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
jokeSchema.set('toJSON', {
  virtuals: true
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
app.delete('/api/jokes/:id', async (req, res) => { //deletes joke
   try {
       await Joke.deleteOne({
           _id: req.params.id
       });
       res.sendStatus(200);
   } catch(err) {
       console.log(err);
       res.sendStatus(500);
   } 
});
//actual functions
app.post('/api/joke', async (req, res) => { //makes joke
    const joke = new Joke({
       writer: req.body.writer,
       joke: req.body.joke,
       rating: 5,
       ratings: 0
    });
    try {
        await joke.save();
        res.send({joke:joke});
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
app.get('/api/joke/:writer', async (req, res) => { //gets jokes by writer
   try {
       let jokes = await Joke.find({writer:req.params.writer});
       res.send(jokes);
   } catch(err) {
        console.log(err);
        res.sendStatus(500);
   }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));