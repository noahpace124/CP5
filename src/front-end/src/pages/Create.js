import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [error, setError] = useState("");
    const [writer, setWriter] = useState("");
    const [joke, setJoke] = useState("");
    
    const createJoke = async() => {
        try {
            await axios.post("/api/joke", {writer: writer, joke: joke});
        }  catch(err) {
            setError("error adding joke: " + err);
        }
    };
    
    const addJoke = async(e) => {
        e.preventDefault();
        await createJoke();
        setWriter("");
        setJoke("");
      };
    
    return (
        <div id="container">
            <br />
            <br />
            <br />
            {error}
            <div id="form">
                <h3>Create A Joke</h3>
                <form onSubmit={addJoke}>
                    <div>
                      <label>
                        Joke: <input type="text" value={joke} onChange={e => setJoke(e.target.value)} /><br />
                        Your Name: <input type="text" value={writer} onChange={e => setWriter(e.target.value)} />
                      </label>  
                    </div>
                <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

const Create = () => {
  return App();
};

export default Create;