function CustomConsole() {
    this.create = function(x, y, clr, txtClr, borderRadius, width, height, id) {
        console.log(`Desired X: ${x}px`);
        console.log(`Desired Y: ${y}px`);
        console.log(`Desired color: rgb(${clr})`);
        console.log(`Desired text color: rgb(${txtClr})`);
        console.log(`Desired Border Radius: ${borderRadius}px`);
        console.log(`Desired Width: ${width}px`);
        console.log(`Desired Height: ${height}px`);
        console.log(`Desired ID: ${id}`);

        this.object = document.createElement('div');
        this.object.style.position = 'absolute';
        this.object.style.paddingLeft = '10px';
        this.object.style.paddingRight = '10px';
        this.object.style.paddingTop = '10px';
        this.object.style.paddingBottom = '10px';
        this.object.style.fontFamily = 'arial';
        this.object.style.left = x + 'px';
        this.object.style.top = y + 'px';
        this.object.style.backgroundColor = `rgb(${clr})`;
        this.object.style.color = `rgb(${txtClr})`;
        this.object.style.borderRadius = borderRadius + 'px';
        this.object.style.width = width + 'px';
        this.object.style.height = height + 'px';
        this.object.id = id;

        document.body.appendChild(this.object);
    }

    this.startChroma = function(){
        // Calculate chroma color values
        let red = Math.sin(Date.now() / 1000) * 127 + 128;
        let green = Math.sin(Date.now() / 1000 + (2 * Math.PI / 3)) * 127 + 128;
        let blue = Math.sin(Date.now() / 1000 + (4 * Math.PI / 3)) * 127 + 128;

        this.object.style.borderColor = `rgb(${red}, ${green}, ${blue})`;
        this.object.style.boxShadow = `0 0 5px rgb(${red}, ${green}, ${blue}),  0 0 10px rgb(${red}, ${green}, ${blue}), 0 0 20px rgb(${red}, ${green}, ${blue})`;
        console.log(`[CHROMA]: ${red}, ${green}, ${blue}`)

        // Request the next frame
        requestAnimationFrame(this.startChroma);
        
    }

    this.log = function(msg) {
        if (this.object) {
            this.object.innerText = `> ${msg}`;
        } else {
            console.error('No object created yet. Call create() first.');
        }
    }
}