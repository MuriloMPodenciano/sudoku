const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());


app.listen(port,async () => {
  console.log(`Server is running on port ${PORT}`);
});
