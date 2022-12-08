import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
const [joke, setJoke] = useState([]);
const [error, setError] = useState("");

//api calls
    const fetchJoke = async() => {
        try {
            const response = await axios.get("/api/joke");
            setJoke(response.data);
        } catch(err) {
            setError("error retrieving joke: " + error);
        }
    };
    
    useEffect(() => {
        fetchJoke();
    },[]);
    
    return (
    <div id="container">
        {error}
        <button onClick={e => fetchJoke()}>Get A Joke</button>
        <div id="joke">
            {joke.map( joke => (
          	    <div id={joke.id}>
          	        {joke.joke}<br />
          	        By {joke.writer} - Rating {joke.rating}<br />
          	        Ratings: {Object.keys(joke.ratings).length}
          	    </div>
          	))}
        </div>
    </div>
)}

const Home = () => {
    return App();
};

export default Home;