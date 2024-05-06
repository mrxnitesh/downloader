document.getElementById('downloadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var url = document.getElementById('videoUrl').value;
    fetch('https://downloader-backend-kej3mh2jr-mr-niteshs-projects.vercel.app/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred. Please try again later.';
    });
});
