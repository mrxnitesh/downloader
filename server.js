const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route handler for downloading YouTube videos
app.get('/download', async (req, res) => {
    const videoUrl = req.query.url;

    // Validate YouTube URL
    if (!ytdl.validateURL(videoUrl)) {
        return res.status(400).send('Invalid YouTube URL');
    }

    try {
        // Get video information
        const info = await ytdl.getInfo(videoUrl);
        const videoTitle = info.videoDetails.title;

        // Filter available formats and select the first one
        const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
        const format = formats[0];

        // Set response headers for file download
        res.header('Content-Disposition', `attachment; filename="${videoTitle}.${format.container}"`);

        // Pipe the video stream to the response
        ytdl(videoUrl, { format: format }).pipe(res);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
