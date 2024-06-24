const ipInput = document.getElementById('ipInput')
const responseContainer = document.getElementById('pingResponseContainer')
const responseText = document.getElementById('pingResponse')
var ping = new Ping();





function pingSend(){
    const url = ipInput.value.startsWith('https://') ? ipInput.value : `https://${ipInput.value}`;
    
    ping.ping(url, function(err, data) {
        // Display error if an error is returned.
        if (err) {
            responseText.innerText = `Error loading resource: ${err}`;
        } else {
            responseText.innerText = ` Response Time (MS): ${data}`;
        }
    });
}
