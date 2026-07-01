const pdfParse = require("pdf-parse");

console.log("TYPE:", typeof pdfParse);
console.log("VALUE:", pdfParse);
const fs = require("fs");
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

app.post("/upload", upload.single("resume"), async (req, res) => {

    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);

    const resumeText =
    pdfData.text.toLowerCase();

    const jobDescription =
    req.body.jobDescription.toLowerCase();

    const skills = [
        "c++",
        "java",
        "python",
        "html",
        "css",
        "javascript",
        "react",
        "node",
        "express",
        "mongodb",
        "sql",
        "git",
        "github"
    ];

    let matched = [];
    let missing = [];

    skills.forEach(skill => {

        if(
            jobDescription.includes(skill)
            &&
            resumeText.includes(skill)
        ){
            matched.push(skill);
        }

        else if(
            jobDescription.includes(skill)
        ){
            missing.push(skill);
        }

    });

    let score = 0;

    if(matched.length + missing.length > 0){

        score = Math.round(
            (matched.length /
            (matched.length + missing.length))
            * 100
        );

    }

    res.json({
        score,
        matched,
        missing
    });

});
app.get("/", (req, res) => {
    res.send("Resume Analyzer Backend Running");
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});