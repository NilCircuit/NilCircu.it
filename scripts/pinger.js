const userIP = document.getElementById('actualIP');
const ipInput = document.getElementById('ipInput');
const responseText = document.getElementById('pingResponse');


async function pingSend() {
    const url = ipInput.value.startsWith('https://') ? ipInput.value : `https://${ipInput.value}`;

    try {
        // Ping the URL
        ping.ping(url, function(err, data) {
            if (err) {
                responseText.innerText = `Error loading resource: ${err}`;
                return;
            }

            // Display response time
            const responseTime = data;
            responseText.innerText = `Response Time (MS): ${responseTime}`;

        });
    } catch (error) {
        console.error('Error in pingSend:', error);
        responseText.innerText = `Error in ping: ${error.message}`;
    }
}
async function getUserIPAddress() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        userIP.innerText = `IP - ${data.ip}\nCity - ${data.city}\nRegion - ${data.region}\nCountry - ${data.country}\nPostal - ${data.postal}`;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return 'Unknown';
    }
}

getUserIPAddress()