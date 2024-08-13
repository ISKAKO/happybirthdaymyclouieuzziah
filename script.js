document.getElementById('celebrateButton').addEventListener('click', function() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('cake-screen').style.display = 'flex';

    // Play the birthday song
    const birthdaySong = document.getElementById('birthdaySong');
    birthdaySong.play();

    // Access the user's microphone
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const mediaStreamSource = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            mediaStreamSource.connect(analyser);
            
            function detectBlow() {
                analyser.getByteFrequencyData(dataArray);
                let blowDetected = dataArray.some(value => value > 200); // Adjust threshold as needed
                if (blowDetected) {
                    blowOutCandles();
                } else {
                    requestAnimationFrame(detectBlow);
                }
            }
            
            detectBlow();
        })
        .catch(function(err) {
            console.log('The following error occurred: ' + err);
        });
});

document.getElementById('wrongChoiceButton').addEventListener('click', function() {
    document.getElementById('error-message').style.display = 'flex';
    document.getElementById('error-message').style.zIndex = '100'; // Ensure error message is on top
    setTimeout(() => {
        document.getElementById('error-message').style.display = 'none';
    }, 3000); // Hide error message after 3 seconds
});

document.getElementById('celebrateButton').addEventListener('click', function() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('good-girl-screen').style.display = 'flex';

    // Play the birthday song
    document.getElementById('birthdaySong').play();
});

function blowOutCandles() {
    let candles = document.getElementsByClassName('candle');
    for (let candle of candles) {
        candle.style.backgroundColor = '#ccc'; // Candle "blown out"
        candle.style.opacity = '0.5';
        candle.classList.add('blown-out'); // Add class to handle flame disappearance
    }

    // Show confetti
    let confettiContainer = document.getElementById('confetti');
    confettiContainer.innerHTML = ''; // Clear existing confetti
    for (let i = 0; i < 1000; i++) { // Increase the number of confetti pieces
        let confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.backgroundColor = getRandomColor();
        confettiPiece.style.left = Math.random() * 100 + 'vw';
        confettiPiece.style.top = Math.random() * -10 + 'vh'; // Start slightly above the viewport
        confettiContainer.appendChild(confettiPiece);
    }
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
