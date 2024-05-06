document.getElementById('download-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    console.log('Form submitted!'); // Add this line to log the form submission

    const videoUrl = document.getElementById('video-url').value;

    try {
        const response = await fetch('https://downloader-backend-j08j9o2dp-mr-niteshs-projects.vercel.app/api/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: videoUrl })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('message').innerText = 'Video downloaded successfully!';
        } else {
            document.getElementById('message').innerText = `An error occurred: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('message').innerText = 'An error occurred. Please try again later.';
    }
});
