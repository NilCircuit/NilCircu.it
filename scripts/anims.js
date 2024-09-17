
function Anims() {

    this.slideOffScreenRight = function(element, distance, duration) {
        element.style.transform = `translateX(${distance}px)`;
        let lastPos = distance;
        const start = performance.now();

        function easeOut(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function animation(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOut(progress);
            const newPos = lastPos - (distance * easedProgress);
            element.style.transform = `translateX(${newPos}px`;

            if (progress < 1) {
                requestAnimationFrame(animation);
            } else {
                lastPos = newPos;
            }
        }

        requestAnimationFrame(animation);
    }

    this.slideOnScreenRight = function(element, distance, duration) {
        let lastPos = element.getBoundingClientRect().left;
        const start = performance.now();

        function easeOut(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function animation(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOut(progress);
            const newPos = lastPos - (distance * easedProgress);
            element.style.transform = `translateX(${newPos - lastPos}px`;

            if (progress < 1) {
                requestAnimationFrame(animation);
            } else {
                lastPos = newPos;
            }
        }

        requestAnimationFrame(animation);
    }
    
}

const animate = new Anims();