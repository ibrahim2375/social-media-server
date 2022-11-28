const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // for login
const helmet = require('helmet'); // for request safe
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');

//db function
const connect_to_db = require('./config/database');

//server variables
var port = process.env.PORT || 5000;
var host = process.env.SERVER_HOST || 'localhost';

// configrations
const app = express();
require('dotenv').config();
app.use(express.static(__dirname + '/public'));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan('common'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: [process.env.ORIGIN_SITE],
    methods: ['GET', 'POST'],
    credentials: true
}));

//router
const router = require('./src/router/index');
app.use('/', router);

//server running
app.listen(process.env.PORT || 5000, () => {
    connect_to_db();
    console.log(`server running on port ${port} : Link : http://${host}:${port}`);
});