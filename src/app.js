//mongodb

const express = require("express");
require("./config/db");
const dotenv = require('dotenv');
const morgan = require('morgan');
// const bodyparser = require("body-parser");
const multer = require('multer');
const bcrypt = require("bcrypt");
const session = require("express-session");

const ejs = require("ejs");

const bodyParser = express.json;
const cors = require("cors");
const path = require("path");
const routes = require("./routes");


// Create server app
const app = express();

// Configure session middleware
// app.use(
//     session({
//         secret: process.env.SESSION_SECRET || "12345",
//         resave: false,
//         saveUninitialized: true,
//         cookie: {
//             maxAge: 1 * 60 * 60 * 1000,
//             // maxAge: 1 * 60 ,
//         },
//     })
// );

// Define the storage strategy for file uploads
const storage = multer.memoryStorage();
// Initialize multer with the storage strategy
const upload = multer({ storage: storage });

// set ejs as view engine
app.set("view engine","ejs")

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use("/avatars", express.static(path.resolve(__dirname, "../avatars")))

app.use(bodyParser());
app.use(cors());
app.use("/", routes);


module.exports = app;
