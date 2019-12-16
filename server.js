const express = require("express");
const app = express();

app.use(express.json());

app.post("/github", (req, res) => {
    try {
        console.log(req);
    } catch(error) {
        console.error(error);
    }

    res.status(200).json({success: true});
}); 

app.get("/*", (req, res) => {
    res.send("Active");
}); 

require("dotenv").config();
const {PORT} = process.env;

app.listen(PORT, console.log(`Starting webhook listener on port ${PORT}`));