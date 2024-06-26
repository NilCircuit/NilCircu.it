const ipInput = document.getElementById('ipInput');
const responseContainer = document.getElementById('pingResponseContainer');
const responseText = document.getElementById('pingResponse');
const ping = new Ping();

async function pingSend() {
    const url = ipInput.value.startsWith('https://') ? ipInput.value : `https://${ipInput.value}`;

    try {
        // Fetch the IP address of the entered URL
        const ipAddress = await resolveIPAddress(url);

        // Ping the URL
        ping.ping(url, function(err, data) {
            if (err) {
                responseText.innerText = `Error loading resource: ${err}`;
                return;
            }

            // Display response time
            const responseTime = data;
            responseText.innerText = `Response Time (MS): ${responseTime}`;

            // Display IP address
            responseText.innerText += `\nIP Address: ${ipAddress}`;
        });
    } catch (error) {
        console.error('Error in pingSend:', error);
        responseText.innerText = `Error in pingSend: ${error.message}`;
    }
}

async function resolveIPAddress(url) {
    try {
        const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/html');
        return xmlDoc.URL.split('/')[2];
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return 'Unknown';
    }
}
