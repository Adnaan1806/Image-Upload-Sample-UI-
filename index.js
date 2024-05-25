document.getElementById('uploadInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const loadingDiv = document.getElementById('loading');
    const uploadedImage = document.getElementById('uploadedImage');

    loadingDiv.style.display = 'flex';
    uploadedImage.classList.add('hidden');

    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedImage.src = e.target.result;
        uploadedImage.classList.remove('hidden');
        loadingDiv.style.display = 'none';
    };
    reader.readAsDataURL(file);
});

document.getElementById('submitButton').addEventListener('click', function() {
    const fileInput = document.getElementById('uploadInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select an image to upload.');
        return;
    }

    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('resultText');

    loadingDiv.style.display = 'flex';
    resultDiv.classList.add('hidden');

    const formData = new FormData();
    formData.append('image', file);

    fetch('http://127.0.0.1/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        loadingDiv.style.display = 'none';
        resultText.textContent = data.result;
        resultDiv.classList.remove('hidden');
    })
    .catch(error => {
        loadingDiv.style.display = 'none';
        resultText.textContent = 'Error: ' + error.message;
        resultDiv.classList.remove('hidden');
    });
});
