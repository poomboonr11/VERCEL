const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// load env vars
dotenv.config({path: './config/.env.local'});

const app = express();

const PORT = process.env.PORT || 3014;

app.listen(PORT,() => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))