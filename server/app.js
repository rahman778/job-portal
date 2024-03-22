require('dotenv').config()
const express = require('express');
const cors = require('cors');

const connectDb = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
   res.send('Hello World!')
 })

 connectDb();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
