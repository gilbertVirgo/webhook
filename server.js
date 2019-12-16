const express = require("express");
const app = express();

app.use(express.json());

const { spawn } = require('child_process');

app.post("/github", async (req, res) => {
    try {
        const {name} = req.body.repository;

        console.log("Starting deploy process");

        const cmd = spawn('bash', ['./deploy.sh', name]);

        cmd.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        cmd.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        cmd.on('close', (code) => {
            console.log(`Process exited with code ${code}`);

            console.log(`Handled push request on repository "${name}"`);

            res.status(200).json({success: true});
        });
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