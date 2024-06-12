const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const boardsFile = path.join(__dirname, 'boards.json');
const boardsData = JSON.parse(fs.readFileSync(boardsFile, 'utf8'));

const privateKey = fs.readFileSync('private.key', 'utf8');
const publicKey = fs.readFileSync('public.key', 'utf8');

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL)");
});

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ code: 403, message: "No token provided" });
  }

  jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      return res.status(401).json({ code: 401, message: "Failed to authenticate token" });
    }

    req.userId = decoded.id;
    next();
  });
};

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

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ code: 400, message: "Username and password are required" });
    }

    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
        if (err) {
            return res.status(500).json({ code: 500, message: "Internal server error" });
        }
        if (!row) {
            return res.status(400).json({ code: 400, message: "Invalid username or password" });
        }

        bcrypt.compare(password, row.password, (err, match) => {
            if (err) {
                return res.status(500).json({ code: 500, message: "Error comparing password" });
            }
            if (!match) {
                return res.status(400).json({ code: 400, message: "Invalid username or password" });
            }

            const token = jwt.sign({ username: row.username }, privateKey, { algorithm: 'RS256', expiresIn: '5m' });
            res.status(200).json({ code: 200, message: "User logged in successfully", token });
        });
    });
});

app.get('/board', verifyToken, (req, res) => {
  const randomIndex = Math.floor(Math.random() * boardsData.length);
  const randomBoard = boardsData[randomIndex];
  res.status(200).json({ code: 200, message: "Access granted to board", board: randomBoard });
});

app.listen(port,async () => {
  console.log(`Server is running on port ${port}`);
});
