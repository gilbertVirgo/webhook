const express = require("express");
const app = express();

app.use(express.json());

const {exec} = require("child_process");

app.post("/github", async (req, res) => {
    try {
        const {name} = req.body.repository;

        const {stdout, stderr} = await exec(`bash ./deploy.sh ${name}`);

        if(stderr) throw stderr;
        if(stdout) console.log("Process out:", stdout);

        res.status(200).json({success: true});
    } catch(error) {
        console.error("Error:", error);

        res.status(500).json({error});
    }
}); 

app.get("/*", (req, res) => {
    res.send("Active");
}); 

require("dotenv").config();
const {PORT} = process.env;

app.listen(PORT, console.log(`Starting webhook listener on port ${PORT}`));