const loader = document.getElementById('waitForClick');
const music = document.getElementById('background-music');
const volumeControl = document.getElementById('volumeControl');
const canvas = document.getElementById('waveformCanvas');
const canvasCtx = canvas.getContext('2d');
const nextBtn = document.getElementById('skipBtn');
const smoothingFactor = 0.8; // Adjust smoothing factor (0.0 to 1.0, where higher values mean smoother but slower updates)
const soundLabel = document.getElementById('speakerIcon');
const volumeLabel = document.getElementById('volumeLabel');
const playingText = document.getElementById('playerText');
let lastSong = -1;
let audioContext;
let audioSrc;
let analyser;
let bufferLength;
let dataArray;
let smoothedDataArray; // Array to hold smoothed waveform data
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

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = '#00ff44';

    canvasCtx.beginPath();

    const sliceWidth = canvas.width * 1.0 / bufferLength;
    let x = 0;
    const intenistyFactor = 2;

    for (let i = 0; i < bufferLength; i++) {
        const v = (smoothedDataArray[i] / 128.0 - 1)  * intenistyFactor + 1;
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
    canvasCtx.strokeStyle = '#fffb00'; // Change stroke color for square waveform

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

    getRandomSong()

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
    if (this.value <= 0) {
        soundLabel.src = './images/mute.png';
    } else if (this.value < 0.4) {
        soundLabel.src = './images/low-vol.png';
    } else if (this.value >= 0.4) {
        soundLabel.src = './images/high-vol.png';
    }

    volumeLabel.innerText = `${Math.ceil(this.value * 100)}%`
    
});

// Set initial volume
music.volume = volumeControl.value;




function getRandomSong(){
    // Chooses random song

    let randomSong = Math.floor(Math.random() * 14);
    console.log(randomSong);
    music.load()

    if (lastSong == randomSong) {
        getRandomSong()
    } else {
        if (randomSong === 0) {
            lastSong = 0;
            music.src = './sounds/dodge_this.mp3';
            document.title = 'NilCircuit | Dodge This';
            playingText.innerText = 'Now playing - Dodge This';
        } else if (randomSong === 1) {
            lastSong = 1;
            music.src = './sounds/speed_is_life.mp3';
            document.title = 'NilCircuit | Speed Is Life';
            playingText.innerText = 'Now playing - Speed Is Life';
        } else if (randomSong === 2) {
            lastSong = 2;
            music.src = './sounds/CuteDepressed.mp3';
            document.title = 'NilCircuit | Cute Depressed';
            playingText.innerText = 'Now playing - Cute Depressed';
        } else if (randomSong === 3) {
            lastSong = 3;
            music.src = './sounds/wyw.mp3';
            document.title = 'NilCircuit | What You Want';
            playingText.innerText = 'Now playing - What You Want';
        } else if (randomSong === 4) {
            lastSong = 4;
            music.src = './sounds/Young_Kid.mp3';
            document.title = 'NilCircuit | Young Kid';
            playingText.innerText = 'Now playing - Young Kid';
        } else if (randomSong === 5) {
            lastSong = 5;
            music.src = './sounds/TOXIC.mp3';
            document.title = 'NilCircuit | TOXIC';
            playingText.innerText = 'Now playing - TOXIC';
        } else if (randomSong === 6) {
            lastSong = 6;
            music.src = './sounds/COWBELL_GOTH.mp3';
            document.title = 'NilCircuit | COWBELL GOTH';
            playingText.innerText = 'Now playing - COWBELL GOTH';
        } else if (randomSong === 7) {
            lastSong = 7;
            music.src = './sounds/On_My_Own.mp3';
            document.title = 'NilCircuit | On My Own';
            playingText.innerText = 'Now playing - On My Own';
        } else if (randomSong === 8) {
            lastSong = 8;
            music.src = './sounds/LOVELY_BASTARDS.mp3';
            document.title = 'NilCircuit | LOVELY BASTARDS';
            playingText.innerText = 'Now playing - LOVELY BASTARDS';
        } else if (randomSong === 9) {
            lastSong = 9;
            music.src = './sounds/NXSTY_BLOOD.mp3';
            document.title = 'NilCircuit | NXSTY BLOOD';
            playingText.innerText = 'Now playing - NXSTY BLOOD';
        } else if (randomSong === 10) {
            lastSong = 10;
            music.src = './sounds/spotifydown.com - Gillette.mp3';
            document.title = 'NilCircuit | Gillette';
            playingText.innerText = 'Now playing - Gillette';
        } else if (randomSong === 11) {
            lastSong = 11;
            music.src = './sounds/spotifydown.com - kompa pasión.mp3';
            document.title = 'NilCircuit | Kompa Pasión';
            playingText.innerText = 'Now playing - Kompa Pasión';
        } else if (randomSong === 12) {
            lastSong = 12;
            music.src = './sounds/spotifydown.com - This Feeling.mp3';
            document.title = 'NilCircuit | This Feeling';
            playingText.innerText = 'Now playing - This Feeling';
        } else if (randomSong === 13) {
            lastSong = 13;
            music.src = './sounds/spotifydown.com - On Top (feat. T-Shirt).mp3';
            document.title = 'NilCircuit | On Top';
            playingText.innerText = 'Now playing - On Top';
        }
    }

    
    music.play()
}

nextBtn.addEventListener('click', getRandomSong)

const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.01 });

sections.forEach(section => {
    observer.observe(section);
});




const pointer = document.getElementById('cursor');
const pointerPoint = document.getElementById('cursorPoint');

pointer.style.pointerEvents = 'none';
pointerPoint.style.pointerEvents = 'none';

let mainLoop = (e) => {
    let xPos = e.clientX;
    let yPos = e.clientY;

    // I want you to set the pointer (div) position here
    pointerPoint.style.left = xPos + 'px';
    pointerPoint.style.top = yPos + 'px';
    // pointerPoint.style.transform = 'translate(-50%, -50%)';
    pointer.style.left = (xPos + 5) + 'px';
    pointer.style.top = (yPos + 5) + 'px';
    
    console.log(`Pos: ${pointer.style.left}, ${pointer.style.top}`)

    let currentElement = document.elementFromPoint(xPos, yPos);

    if (currentElement.className == 'btn' || currentElement.className == 'button') {
        pointer.style.boxShadow = '0 0 5px rgb(247, 0, 45),  0 0 10px rgb(247, 0, 450), 0 0 20px rgb(247, 0, 45)';
        pointerPoint.style.boxShadow = '0 0 5px rgb(247, 0, 45),  0 0 10px rgb(247, 0, 450), 0 0 20px rgb(247, 0, 45)';
        pointer.style.borderColor = 'rgb(247, 0, 45)';
        pointerPoint.style.borderColor = 'rgb(247, 0, 45)';
        console.log(`Hovering over a selectable: ${currentElement.className}`)
    } else {
        pointer.style.boxShadow = '0 0 5px rgb(255, 115, 0),  0 0 10px rgb(255, 115, 0), 0 0 20px rgb(255, 115, 0)';
        pointerPoint.style.boxShadow = '0 0 5px rgb(255, 115, 0),  0 0 10px rgb(255, 115, 0), 0 0 20px rgb(255, 115, 0)';
        pointer.style.borderColor = 'rgb(255, 115, 0)';
        pointerPoint.style.borderColor = 'rgb(255, 115, 0)';
        console.log('No element hovered!')
    }

}

window.addEventListener('mousemove', mainLoop)



