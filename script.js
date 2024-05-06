// Add your JavaScript code here
document.getElementById('downloadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var url = document.getElementById('videoUrl').value;
    fetch('/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.text())
    .then(message => {
        document.getElementById('message').textContent = message;
    });
});
