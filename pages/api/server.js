/**
 Create a server with the following specifications:

1. import express and dotenv node modules
3. create the server with express and name it app
4. use port 8080 as default port
5. enable body parser to accept json data
6. state which port the server is listening to and log it to the console
*/

const express = require('express');
const dotenv = require('dotenv').config();
const PORT = 8080

const app = express();

// enable body parser to accept json data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add router to the server and name it openai
app.use('/openai', require('./router'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// export the express api
module.exports = app;
