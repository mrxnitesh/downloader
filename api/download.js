// api/download.js

const express = require('express');
const app = express();

app.use(express.json());

app.post('/download', (req, res) => {
    const { url } = req.body;
    // Implement downloading logic using youtube-dl
    res.status(200).json({ message: 'Video downloaded successfully!' });
});

module.exports = app;
