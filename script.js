document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('downloadForm');
    const message = document.getElementById('message');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        
        const videoUrl = form.videoUrl.value.trim();

        if (!videoUrl) {
            showMessage('Please enter a valid YouTube video URL.', 'error');
            return;
        }

        try {
            const response = await fetch('/api/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: videoUrl })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            showMessage(data.message, 'success');
        } catch (error) {
            showMessage('An error occurred. Please try again later.', 'error');
        }
    });

    function showMessage(msg, type) {
        message.textContent = msg;
        message.className = type;
    }
});
