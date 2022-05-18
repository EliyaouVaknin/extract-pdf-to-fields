const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Resume')
const port = 3001;
const app = express();
app.listen (port, () => console.log (`server is live on port ${port}`));

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));
db.once('open', () => console.log("MongoDB Connected"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',express.static("public"));
app.use(fileUpload());

const ResumeSchema = mongoose.Schema({
    id: String,
    email: String,
    linkedIn: String,
    phone: String,
    rawData: String
})

const Resume = mongoose.model("Resume", ResumeSchema)

app.post("/extract-text", (req,res) => {
    if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
    }
    pdfParse(req.files.pdfFile).then(result => {
        res.send(result.text);
    })
});

app.post("/savedata", async (req, res) => {
    var myData = new Resume (
        {
            id: req.body.id,
            email: req.body.email,
            phone: req.body.phone,
            linkedIn: req.body.linkenInURL,
            rawData: req.body.text
        }
    )
    await myData.save()
    res.json(myData)
    
  });


