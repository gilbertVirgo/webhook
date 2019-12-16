const express = require("express");
const app = express();

app.use(express.json());

const { spawn } = require('child_process');
const fs = require("fs").promises;

app.post("/github", async (req, res) => {
    try {
        const {name} = req.body.repository;

        console.log("Starting deploy process");

        const cmd = spawn('bash', ['./deploy.sh', name]);

        const log = async data => await fs.appendFile("./log", data);

        cmd.stdout.on('data', log);
        cmd.stderr.on('data', log);

        res.status(200).json({success: true});
    } catch(error) {
        console.error("Error:", error);

        res.status(500).json({success: false, error});
    }
}); 

app.get("/*", (req, res) => {
    res.send("Active");
}); 

require("dotenv").config();
const {PORT} = process.env;

app.listen(PORT, console.log(`Starting webhook listener on port ${PORT}`));