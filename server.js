const express = require("express");
const app = express();

app.post("/github", (req, res) => {
    console.log("req.body.repository", req.body.repository);

    res.status(200).json({success: true});
}); 

app.get("/*", (req, res) => {
    res.send("Active");
}); 

require("dotenv").config();
const {PORT} = process.env;

app.listen(PORT, console.log(`Starting webhook listener on port ${PORT}`));