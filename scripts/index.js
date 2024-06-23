const loader = document.getElementById('waitForClick');
const music = document.getElementById('background-music');
const volumeControl = document.getElementById('volumeControl');

const canvas = document.getElementById('waveformCanvas');
const canvasCtx = canvas.getContext('2d');

let audioContext;
let audioSrc;
let analyser;
let bufferLength;
let dataArray;
let smoothedDataArray; // Array to hold smoothed waveform data
const smoothingFactor = 0.8; // Adjust smoothing factor (0.0 to 1.0, where higher values mean smoother but slower updates)

let currentWaveform = 'waveform'; // Default to audio waveform

function initializeAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioSrc = audioContext.createMediaElementSource(music);
        analyser = audioContext.createAnalyser();

        audioSrc.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 2048;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        smoothedDataArray = new Uint8Array(bufferLength); // Initialize smoothed data array
    }
}

function smoothArray(oldArray, newArray, factor) {
    for (let i = 0; i < oldArray.length; i++) {
        oldArray[i] = oldArray[i] * factor + newArray[i] * (1 - factor);
    }
}

function drawWaveform() {
    analyser.getByteTimeDomainData(dataArray);

    // Smooth the dataArray
    smoothArray(smoothedDataArray, dataArray, smoothingFactor);

    canvasCtx.fillStyle = '#282c34';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 3;
    canvasCtx.strokeStyle = '#00ff00';

    canvasCtx.beginPath();

    const sliceWidth = canvas.width * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const v = smoothedDataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
}

function drawSquareWave() {
    analyser.getByteTimeDomainData(dataArray);

    // Smooth the dataArray
    smoothArray(smoothedDataArray, dataArray, smoothingFactor);

    canvasCtx.fillStyle = '#282c34';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 3;
    canvasCtx.strokeStyle = '#ff0000'; // Change stroke color for square waveform

    canvasCtx.beginPath();

    const sliceWidth = canvas.width * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const v = smoothedDataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
            canvasCtx.lineTo(x, canvas.height - y); // Draw the square waveform (mirrored below x-axis)
        }

        x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
}

function toggleWaveform(type) {
    currentWaveform = type;
}

function draw() {
    requestAnimationFrame(draw);

    if (!analyser) return;

    if (currentWaveform === 'waveform') {
        drawWaveform();
    } else if (currentWaveform === 'square') {
        drawSquareWave();
    }
}

function loadSite() {
    loader.style.opacity = 0;

    let randomSong = Math.floor(Math.random() * 10);
    console.log(randomSong);

    // Chooses random song
    if (randomSong === 0) {
        music.src = './sounds/dodge_this.mp3';
    } else if (randomSong === 1) {
        music.src = './sounds/speed_is_life.mp3';
    } else if (randomSong === 2) {
        music.src = './sounds/CuteDepressed.mp3';
    } else if (randomSong === 3) {
        music.src = './sounds/wyw.mp3';
    } else if (randomSong === 4) {
        music.src = './sounds/Young_Kid.mp3';
    } else if (randomSong === 5) {
        music.src = './sounds/spotifydown.com - TOXIC.mp3';
    } else if (randomSong === 6) {
        music.src = './sounds/spotifydown.com - COWBELL GOTH.mp3';
    } else if (randomSong === 7) {
        music.src = './sounds/spotifydown.com - On My Own.mp3';
    } else if (randomSong === 8) {
        music.src = './sounds/spotifydown.com - LOVELY BASTARDS.mp3';
    } else if (randomSong === 9) {
        music.src = './sounds/spotifydown.com - NXSTY BLOOD.mp3';
    }

    setTimeout(function () {
        music.volume = 0.075; // Set initial volume
        music.play();
        loader.remove();
        initializeAudioContext(); // Initialize the audio context when the music starts playing
        draw(); // Start drawing the waveform
    }, 350);
    window.removeEventListener('click', loadSite);
}

window.addEventListener('click', loadSite);

volumeControl.addEventListener('input', function () {
    music.volume = this.value;
});

// Set initial volume
music.volume = volumeControl.value;
