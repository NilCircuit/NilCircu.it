let timeContainer = document.getElementsByClassName('timeContainer')[0];
let ipContainer = document.getElementById('actualIP');
let toggled = false;

animate.slideOnScreenRight(ipContainer, -500, 750)

window.addEventListener('keydown', function(e){
    
    if (e.key == 'e') {
        if (toggled == false) {
            // Slide off of screen
            animate.slideOnScreenRight(timeContainer, -500, 750)
            animate.slideOffScreenRight(ipContainer, 500, 750)
        } else if (toggled == true) {
            // Slide onto screen
            animate.slideOffScreenRight(timeContainer, 500, 750)
            animate.slideOnScreenRight(ipContainer, -500, 750)
        }
        toggled = !toggled
    }

})