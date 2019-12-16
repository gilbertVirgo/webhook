const express = require("express");
const app = express();

app.use(express.json());

const {exec} = require("child_process");

app.post("/github", async (req, res) => {
    try {
        const {name} = req.body.repository;

        const {stdout, stderr} = await exec(`bash ./deploy.sh ${name}`);

        res.status(200).json({success: true});

        if(stderr) throw stderr;
        if(stdout) console.log("Process out:", stdout);
    } catch(error) {
        console.error(error);

        res.status(500).json({error});
    }
}); 

app.get("/*", (req, res) => {
    res.send("Active");
}); 

require("dotenv").config();
const {PORT} = process.env;

app.listen(PORT, console.log(`Starting webhook listener on port ${PORT}`));