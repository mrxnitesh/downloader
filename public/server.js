const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/download', async (req, res) => {
    const videoUrl = req.query.url;

    if (!ytdl.validateURL(videoUrl)) {
        return res.status(400).send('Invalid YouTube URL');
    }

    try {
        const info = await ytdl.getInfo(videoUrl);
        const videoTitle = info.videoDetails.title;
        const formats = ytdl.filterFormats(info.formats, 'videoandaudio');

        // Select the first available format
        const format = formats[0];

        res.header('Content-Disposition', `attachment; filename="${videoTitle}.${format.container}"`);
        ytdl(videoUrl, { format: format }).pipe(res);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
