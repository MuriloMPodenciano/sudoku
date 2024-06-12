const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());

app.post('/register', function(req, res) {
    const { username, password } = req.body;
    res.status(200).json( {code: 200, message:"User registered successfully"});
});

app.post('/login', function(req, res) {
    const { username, password } = req.body;
    res.status(200).json( {code: 200, message:"User logged in successfully"});
});

app.listen(port,async () => {
  console.log(`Server is running on port ${port}`);
});
