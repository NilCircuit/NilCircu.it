function loop() {
    // Calculate chroma color values
    let red = Math.sin(Date.now() / 1000) * 127 + 128;
    let green = Math.sin(Date.now() / 1000 + (2 * Math.PI / 3)) * 127 + 128;
    let blue = Math.sin(Date.now() / 1000 + (4 * Math.PI / 3)) * 127 + 128;

    element.style.borderColor = `rgb(${red}, ${green}, ${blue})`;
    element.style.boxShadow = `0 0 5px rgb(${red}, ${green}, ${blue}),  0 0 10px rgb(${red}, ${green}, ${blue}), 0 0 20px rgb(${red}, ${green}, ${blue})`;

    // Request the next frame
    requestAnimationFrame(loop);
}

// Start the loop by calling the function once
loop();