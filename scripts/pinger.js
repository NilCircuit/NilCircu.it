const userIP = document.getElementById('actualIP');
const ipInput = document.getElementById('ipInput');


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
        // Parse the URL to extract the hostname
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;

        // Fetch DNS records to get the IP address
        const dnsResponse = await fetch(`https://dns.google/resolve?name=${hostname}&type=A`);
        
        if (!dnsResponse.ok) {
            throw new Error(`Failed to fetch DNS records. Status: ${dnsResponse.status}`);
        }

        const dnsData = await dnsResponse.json();

        // Check if valid response and extract IP address
        if (dnsData && dnsData.Answer && dnsData.Answer.length > 0) {
            return dnsData.Answer[0].data;
        } else {
            throw new Error('No valid DNS response');
        }
    } catch (error) {
        console.error('Error resolving IP address:', error);
        return 'Unknown'; // Return 'Unknown' on error
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