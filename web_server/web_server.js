const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require('cors');
const https = require('https');

const {key, cert} = (() => {
	return {
		key: fs.readFileSync(`../certs/privkey.pem`, 'utf-8'),
		cert: fs.readFileSync(`../certs/fullchain.pem`, 'utf-8')
	}
})();

const https_app = express();
const http_app = express();

https_app.use(cors({origin: '*'}));
https_app.use(express.static(path.join(__dirname, "../pure_pazaak/dist/.")));
https_app.use(express.static(path.join(__dirname, "../pure_pazaak/dist/assets")));

https_app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../pure_pazaak/dist/index.html"));
});

http_app.get('*', function(req, res) {  
    res.redirect('https://' + req.headers.host + req.url);
});

https.createServer({key, cert}, https_app).listen(443, async function () {
    console.log(`HTTPS server started on port ${443}`);
});
http_app.listen(80, async function() {
	console.log(`HTTP server started on port ${80}`);
});
