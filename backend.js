const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const jwtPassword = "123456";


const app = express();

app.use(bodyParser.json());
mongoose.connect('mongodb+srv://rohitkr:123*rohit@laperdb.awqgyr8.mongodb.net/?retryWrites=true&w=majority')



const User = mongoose.model("TestUser", {
    name: String,
    email: String,
    password: String
});

app.use(express.json());

app.get("/home", function(req, res) {
    return res.json({
        "msg": "Home page displayed"
    });
});

app.post("/signup", async function(req, res) {
    try {
        const username = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const user = new User({
            name: username,
            email: email,
            password: password
        });

        await user.save();

        const token = jwt.sign({ user }, jwtPassword); // Change "your_secret_key" to your actual secret key
        return res.json({
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/token-sigin",function(req,res){
    const token = req.headers.authorization;
    const user = jwt.verify(token,jwtPassword);
    return res.json({
        user:user,
        msg:"token decoded"
    })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});