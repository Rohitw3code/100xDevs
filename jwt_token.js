const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const jwtPassword = "123456"

const app = express();

app.use(bodyParser.json());

app.get("/home",function(req,res){
    return res.json({
        msg:"Home page done"
    });
});

app.post("/signin",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    var token = jwt.sign({username:username},jwtPassword);
    return res.json({
        token,
    });

});



app.get("/users",function(req,res){
    const token = req.headers.authorization;
    const decoded = jwt.verify(token,jwtPassword);
    const username = decoded.username;
    return res.json({
        username:username,
        msg:"done"
    })
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

