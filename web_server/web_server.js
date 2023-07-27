require('dotenv').config();

const path = require("path");
const express = require("express");
const cors = require('cors');
const https = require('https');

const https_app = express();

https_app.use(cors({origin: '*'}));
https_app.use(express.static(path.join(__dirname, "/dist/.")));
https_app.use(express.static(path.join(__dirname, "/dist/assets")));
https_app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "/dist/index.html"));
});

https.createServer({key: process.env.PRIVATE_KEY, cert: process.env.CERTIFICATE}, https_app).listen(443, async function () {
    console.log(`HTTPS server started on port ${443}`);
});