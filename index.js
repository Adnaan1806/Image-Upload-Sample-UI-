document.getElementById('uploadInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const loadingDiv = document.getElementById('loading');
    const uploadedImage = document.getElementById('uploadedImage');

    // Show loading animation
    loadingDiv.style.display = 'flex';
    uploadedImage.classList.add('hidden');

    // Simulate a delay for loading (e.g., uploading)
    setTimeout(() => {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage.src = e.target.result;
            uploadedImage.classList.remove('hidden');
            // Hide loading animation
            loadingDiv.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }, 2000); // Simulating a 2 second delay for the loading animation
});
