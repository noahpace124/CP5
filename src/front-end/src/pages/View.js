import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [error, setError] = useState("");
    const [jokes, setJokes] = useState([]);
    const [writer, setWriter] = useState("Server");
    
    const fetchJokes = async(writer) => {
        try {
            const response = await axios.get("/api/jokes/" + writer);
            setJokes(response.data);
        } catch(err) {
            setError("error retrieving jokes: " + error);
        }
    };
    
    const getJokes = async(e) => {
        e.preventDefault();
        fetchJokes(writer);
    };
    
    return (
        <div id="container">
            <br />
            <br />
            <br />
            {error}
            <div id="form">
                <h3>View Your Jokes</h3>
                <form onSubmit={getJokes}>
                    <div>
                      <label>
                        Name: <input type="text" value={writer} onChange={e => setWriter(e.target.value)} />
                        <input type="submit" value="Submit" />
                      </label>  
                    </div>
                </form>
            </div>
            <br />
            <div id="jokes">
		    <h3>Your Jokes</h3>
		    {jokes.map(joke => (
			     <div key={joke.id}>
          	        {joke.joke}<br />
          	        By {joke.writer} - Rating {joke.rating.toFixed(1)}<br />
          	        Ratings: {Object.keys(joke.ratings).length}<br />
          	        <br />
          	    </div>
          	 ))}
			</div>
		</div>
    );
}

const View = () => {
  return App();
};

export default View;