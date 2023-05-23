const gameUploadForm = document.getElementById('game-upload-form');
const gameFileInput = document.getElementById('game-file');
const gameContainer = document.getElementById('game-container');

gameUploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const gameFile = gameFileInput.files[0];
    if (gameFile && gameFile.type === 'application/javascript') {
        const reader = new FileReader();
        reader.onload = function (e) {
            const gameCode = e.target.result;
            const scriptElement = document.createElement('script');
            scriptElement.text = gameCode;
            gameContainer.innerHTML = '';
            gameContainer.appendChild(scriptElement);
        };
        reader.readAsText(gameFile);
    } else {
        alert('Please select a valid JavaScript game file!');
    }
});
