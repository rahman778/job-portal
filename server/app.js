require('dotenv').config()
const express = require('express');
const cors = require('cors');

const keys = require('./config/keys');
const routes = require('./routes');
const connectDb = require('./config/db');

const { port } = keys;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDb();
require('./config/passport')(app);
app.use(routes);

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
