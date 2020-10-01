const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const Str = require('@supercharge/strings')

const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

let proxyToOriginalUrl = [];

//task 1: map a short url for a long url
app.post('/shorten', (req, res) => {
    let originalUrl = req.body.originalUrl;
    let proxyUrl = req.body.proxyUrl;

    console.log(originalUrl);
    console.log(proxyUrl);

    proxyToOriginalUrl[proxyUrl] = originalUrl;

    let response = {
        originalUrl: originalUrl,
        proxyUrl: proxyUrl
    };
    res.send(JSON.stringify(response));
})

//task 2: redirect short url to long url

//subtask 1: how to redirect
//subtask 2: how to send parameters in url
//subtask 3: use that parameter (using template string)

app.get('/s/:proxyUrl', (req, res) => {

    let proxyUrl = req.params.proxyUrl;

    // console.log(req.params.proxyUrl);
    res.redirect(proxyToOriginalUrl[proxyUrl]);
});



app.post('/makeShort', (req, res) => {

    let originalUrl = req.body.originalUrl;
    let proxyUrl = Str.random();

    console.log(originalUrl);
    console.log(proxyUrl);

    proxyToOriginalUrl[proxyUrl] = originalUrl;

    let response = {
        originalUrl: originalUrl,
        proxyUrl: proxyUrl
    };
    res.send(JSON.stringify(response));

})


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));