// storing vediosin the database
packages to install 

npm install express multer mongodb mongoose gridfs-stream body-parser

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB URI and connection
const mongoURI = 'your_mongodb_uri_here';
const conn = mongoose.createConnection(mongoURI);

// Initialize GridFS
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Set up GridFs storage with Multer
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: 'uploads',
    };
  },
});
const upload = multer({ storage });

// POST route to upload the video file
app.post('/upload', upload.single('videoFile'), (req, res) => {
  res.status(201).json({ file: req.file });
});

// Connect and start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

