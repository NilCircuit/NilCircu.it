const userIP = document.getElementById('IPText');
const urlInput = document.getElementById('urlInput');
const responseText = document.getElementById('pingResponse');

async function pingSend() {
    const proxyUrl = 'http://localhost:8080/';
    const targetUrl = urlInput.value.startsWith('http://') || urlInput.value.startsWith('https://')
        ? urlInput.value
        : `https://${urlInput.value}`;
    const url = `${proxyUrl}${encodeURIComponent(targetUrl)}`;

    try {
        const start = Date.now(); // Start time
        const response = await fetch(url, { method: 'HEAD' });
        const end = Date.now(); // End time

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseTime = end - start;
        responseText.innerText = `Response Time (MS): ${responseTime}`;
    } catch (error) {
        console.error('Error in pingSend:', error);
        responseText.innerText = `Error in ping: ${error.message}`;
    }
}


async function getUserIPAddress() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        userIP.innerText = `IP - ${data.ip}\nCity - ${data.city}\nRegion - ${data.region}\nCountry - ${data.country}\nPostal - ${data.postal} `;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        userIP.innerText = `IP - N/A\nCity - N/A\nRegion - N/A\nCountry - N/A\nPostal - N/A\n\nErr: ${error}`;
        return 'Unknown';
    }
}

getUserIPAddress()