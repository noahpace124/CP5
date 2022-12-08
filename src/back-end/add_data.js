const axios = require("axios");

const jokes = require("./jokes.js");

const baseURL = "http://localhost:3000";

jokes.forEach(async (joke) => {
  const response = await axios.post(`${baseURL}/api/joke`, joke);
  if (response.status != 200)
    console.log(`Error adding ${joke.joke}, code ${response.status}`);
});