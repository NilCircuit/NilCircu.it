function updateDateTime() {
    const currentDate = new Date();

    // Get individual components of the date and time
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    // Format the date and time as a string
    const formattedDate = `${month}/${day}/${year} | `;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Display the date and time in the HTML
    const timeText = document.getElementById('timeText');
    if (timeText) { // Ensure timeText element exists
        timeText.innerText = `${formattedDate} ${formattedTime}`;
    }
}

setInterval(updateDateTime, 10);

// Initial call to display current date and time immediately
updateDateTime();