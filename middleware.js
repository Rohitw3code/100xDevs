const express = require('express');

const app = express();

let count = 0;

function requestCounter(req,res,next){
    count += 1;
    console.log("counter : "+count)
    next();
}

app.use(requestCounter);

app.get('/req1', function (req, res) {
    console.log("req1");
    res.send("Request 1");
});

app.get('/req2', function (req, res) {
    console.log("req2");
    res.send("Request 2");
});

app.get('/req3', function (req, res) {
    console.log("req3");
    res.send("Request 3");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});