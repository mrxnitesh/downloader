function downloadVideo() {
    const videoUrl = document.getElementById('videoUrl').value;

    if (!videoUrl.trim()) {
        alert('Please enter a YouTube URL');
        return;
    }

    window.location.href = `/download?url=${encodeURIComponent(videoUrl)}`;
}
