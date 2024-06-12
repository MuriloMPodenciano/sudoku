const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL)");
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ code: 400, message: "Username and password are required" });
  }

  db.get("SELECT username FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      return res.status(500).json({ code: 500, message: "Internal server error" });
    }
    if (row) {
      return res.status(400).json({ code: 400, message: "Username already exists" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ code: 500, message: "Error hashing password" });
      }
      
      db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], (err) => {
        if (err) {
          return res.status(500).json({ code: 500, message: "Error saving user" });
        }
        
        res.status(200).json({ code: 200, message: "User registered successfully" });
      });
    });
  });
});

app.post('/login', function(req, res) {
    const { username, password } = req.body;
    res.status(200).json( {code: 200, message:"User logged in successfully"});
});

app.listen(port,async () => {
  console.log(`Server is running on port ${port}`);
});
