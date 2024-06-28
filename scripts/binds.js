const timeContainer = document.getElementsByClassName('timeContainer')[0];
const ipContainer = document.getElementById('actualIP');
const ipToggleBtn = document.getElementById('ipToggle');
const dateToggleBtn = document.getElementById('dateToggle');
const ipToggleTxt = document.getElementsByClassName('ipToggleTxt')[0];
const dateToggleTxt = document.getElementsByClassName('dateToggleTxt')[0];
let ipToggled = false;
let dateToggled = false;

let onColorTxtShadow = `0 0 5px rgb(0, 255, 21), 0 0 10px rgb(0, 255, 21), 0 0 20px rgb(0, 255, 21)`;
let onColorTxtColor = `rgb(0, 255, 21)`;

let offColorTxtShadow = `0 0 5px rgb(255, 79, 79), 0 0 10px rgb(255, 79, 79), 0 0 20px rgb(255, 79, 79)`;
let offColorTxtColor = 'rgb(255, 0, 0)';

let onColorButtonShadow = `0 0 5px rgb(79, 255, 79), 0 0 10px rgb(79, 255, 79), 0 0 20px rgb(79, 255, 79)`;
let offColorButtonShadow = `0 0 5px rgb(255, 79, 79), 0 0 10px rgb(255, 79, 79), 0 0 20px rgb(255, 79, 79)`;

let onColorButtonColor = `rgba(0, 255, 0, 0.5)`;
let offColorButtonColor = `rgba(255, 0, 0, 0.5))`;


function toggleIP(){
    if (ipToggled == false) {
        // Slide off of screen
        animate.slideOnScreenRight(ipContainer, -500, 750)
        ipToggleBtn.style.boxShadow = offColorButtonShadow;
        ipToggleBtn.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
        ipToggleTxt.style.color = offColorTxtColor;
        ipToggleTxt.style.textShadow = '0 0 5px rgb(255, 79, 79), 0 0 10px rgb(255, 79, 79), 0 0 20px rgb(255, 79, 79)';
    } else if (ipToggled == true) {
        // Slide onto screen
        animate.slideOffScreenRight(ipContainer, 500, 750)
        ipToggleBtn.style.boxShadow = '0 0 5px rgb(79, 255, 79), 0 0 10px rgb(79, 255, 79), 0 0 20px rgb(79, 255, 79)';
        ipToggleBtn.style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
        ipToggleTxt.style.color = 'rgb(0, 255, 21)';
        ipToggleTxt.style.textShadow = '0 0 5px rgb(0, 255, 21), 0 0 10px rgb(0, 255, 21), 0 0 20px rgb(0, 255, 21)';
    }
    ipToggled = !ipToggled
}

function toggleDate(){
    if (dateToggled == false) {
        // Slide off of screen
        animate.slideOnScreenRight(timeContainer, -500, 750)
        dateToggleBtn.style.boxShadow = '0 0 5px rgb(255, 79, 79), 0 0 10px rgb(255, 79, 79), 0 0 20px rgb(255, 79, 79)';
        dateToggleBtn.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
    } else if (dateToggled == true) {
        // Slide onto screen
        animate.slideOffScreenRight(timeContainer, 500, 750)
        dateToggleBtn.style.boxShadow = '0 0 5px rgb(79, 255, 79), 0 0 10px rgb(79, 255, 79), 0 0 20px rgb(79, 255, 79)';
        dateToggleBtn.style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
    }
    dateToggled = !dateToggled
}