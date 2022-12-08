import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [joke, setJoke] = useState([]);
    const [error, setError] = useState("");
    const [rating, setRating] = useState("");
    const [message, setMessage] = useState("");

    //api calls
    const fetchJoke = async() => {
        try {
            const response = await axios.get("/api/joke");
            setJoke(response.data);
            setRating("");
            setMessage("");
        } catch(err) {
            setError("error retrieving joke: " + error);
        }
    };
    const updateJoke = async(id, rating) => {
        try {
            await axios.put("/api/joke/" + id + "/" + rating);
        } catch(err) {
            setError("error updating joke: " + error);
        }
    };
    
    useEffect(() => {
        fetchJoke();
    }, []);
    
    //helper functions
    const handleClick1 = event => {
        event.preventDefault();
        setRating("1");
    };
    const handleClick2 = event => {
        event.preventDefault();
        setRating("2");
    };
    const handleClick3 = event => {
        event.preventDefault();
        setRating("3");
    };
    const handleClick4 = event => {
        event.preventDefault();
        setRating("4");
    };
    const handleClick5 = event => {
        event.preventDefault();
        setRating("5");
    };
    const handleSubmit = event => {
        event.preventDefault();
        if (rating !== "") {
            setMessage("Thanks for your input. You rated this joke " + rating + " out of 5.");
            joke.map( joke => (
                updateJoke(joke.id, rating)
            ));
        } 
    };
    
    return (
    <div id="container">
        <br />
        <br />
        <br />
        {error}
        <button onClick={e => fetchJoke()}>Get A Joke</button>
        <div id="joke">
            {joke.map( joke => (
          	    <div id={joke.id}>
          	    <br />
          	        {joke.joke}<br />
          	        By {joke.writer} - Rating {joke.rating.toFixed(1)}<br />
          	        Ratings: {Object.keys(joke.ratings).length}
          	    </div>
          	))}
        </div>
        <h3>Rate the Joke</h3>
        <button onClick={handleClick1}>1</button>
        <button onClick={handleClick2}>2</button>
        <button onClick={handleClick3}>3</button>
        <button onClick={handleClick4}>4</button>
        <button onClick={handleClick5}>5</button><br />
        <button onClick={handleSubmit}>Submit Rating</button><br />
        {message}<br />
    </div>
)}

const Home = () => {
    return App();
};

export default Home;