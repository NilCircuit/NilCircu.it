const timeContainer = document.getElementsByClassName('timeContainer')[0];
const ipContainer = document.getElementsByClassName('IPContainer')[0];
const ipToggleBtn = document.getElementById('ipToggle');
const dateToggleBtn = document.getElementById('dateToggle');
const ipToggleTxt = document.getElementsByClassName('ipToggleTxt')[0];
const dateToggleTxt = document.getElementsByClassName('dateToggleTxt')[0];
const clickSfx = document.getElementById('clickSfx');
let ipToggled = false;
let dateToggled = false;

let onColorTxtShadow = `0 0 5px rgb(0, 255, 21), 0 0 10px rgb(0, 255, 21), 0 0 20px rgb(0, 255, 21)`;
let offColorTxtShadow = `0 0 5px rgb(255, 79, 79), 0 0 10px rgb(255, 79, 79), 0 0 20px rgb(255, 79, 79)`;

let onColorTxtColor = `rgb(0, 255, 21)`;
let offColorTxtColor = 'rgb(255, 0, 0)';

let onColorButtonShadow = `0 0 5px rgb(79, 255, 79), 0 0 10px rgb(79, 255, 79), 0 0 20px rgb(79, 255, 79)`;
let offColorButtonShadow = `0 0 5px rgb(255, 79, 79), 0 0 10px rgb(255, 79, 79), 0 0 20px rgb(255, 79, 79)`;

let onColorButtonColor = `rgba(0, 255, 0)`;
let offColorButtonColor = `rgba(255, 0, 0)`;


function toggleIP(){
    clickSfx.load()
    clickSfx.play()
    if (ipToggled == false) {
        // Slide off of screen
        animate.slideOnScreenRight(ipContainer, -500, 750)
        ipToggleBtn.style.boxShadow = offColorButtonShadow;
        ipToggleBtn.style.backgroundColor = offColorButtonColor;
        ipToggleTxt.style.color = offColorTxtColor;
        ipToggleTxt.style.textShadow = offColorTxtShadow;
    } else if (ipToggled == true) {
        // Slide onto screen
        animate.slideOffScreenRight(ipContainer, 500, 750)
        ipToggleBtn.style.boxShadow = onColorButtonShadow;
        ipToggleBtn.style.backgroundColor = onColorButtonColor;
        ipToggleTxt.style.color = onColorTxtColor;
        ipToggleTxt.style.textShadow = onColorTxtShadow;
    }
    ipToggled = !ipToggled
}

function toggleDate(){
    clickSfx.load()
    clickSfx.play()
    if (dateToggled == false) {
        // Slide off of screen
        animate.slideOnScreenRight(timeContainer, -500, 750)
        dateToggleBtn.style.boxShadow = offColorButtonShadow;
        dateToggleBtn.style.backgroundColor = offColorButtonColor;
        dateToggleTxt.style.color = offColorTxtColor;
        dateToggleTxt.style.textShadow = offColorTxtShadow;
    } else if (dateToggled == true) {
        // Slide onto screen
        animate.slideOffScreenRight(timeContainer, 500, 750)
        dateToggleBtn.style.boxShadow = onColorButtonShadow;
        dateToggleBtn.style.backgroundColor = onColorButtonColor;
        dateToggleTxt.style.color = onColorTxtColor;
        dateToggleTxt.style.textShadow = onColorTxtShadow;
    }
    dateToggled = !dateToggled
}