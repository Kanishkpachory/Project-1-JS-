let x;

document.getElementById("timeInput").addEventListener("change", updateTimer);
document.getElementById("timeOnput").addEventListener("change", updateTimer);

function updateTimer() {
    const startInput = document.getElementById("timeOnput").value;
    const endInput = document.getElementById("timeInput").value;

    // Parse time input into date objects
    if (!startInput || !endInput) return; // Make sure both inputs are filled

    const now = new Date(); // Current date/time
    const [startHours, startMinutes] = startInput.split(":").map(Number);
    const [endHours, endMinutes] = endInput.split(":").map(Number);

    // Create new Date objects for start and end times (today)
    const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHours, startMinutes);
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHours, endMinutes);

    // If the startDate is after the endDate, assume it's the next day for the endDate
    if (startDate > endDate) {
        endDate.setDate(endDate.getDate() + 1);
    }

    clearInterval(x); // Clear previous intervals before starting a new one

    x = setInterval(function() {
        const now = new Date().getTime();
        const distanceCovered = now - startDate.getTime();
        const distancePending = endDate.getTime() - now;

        if (distancePending < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "EXPIRED";
            document.getElementById("progress-bar").style.width = "100%";
            return;
        }

        const oneDayInMillis = (24 * 60 * 60 * 1000);
        const oneHourInMillis = (60 * 60 * 1000);
        const oneMinInMillis = (60 * 1000);
        const oneSecondInMillis = (1000);

        const days = Math.floor(distancePending / oneDayInMillis);
        const hrs = Math.floor((distancePending % oneDayInMillis) / oneHourInMillis);
        const mins = Math.floor((distancePending % oneHourInMillis) / oneMinInMillis);
        const secs = Math.floor((distancePending % oneMinInMillis) / oneSecondInMillis);

        // Populate in UI
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hrs;
        document.getElementById("minutes").innerHTML = mins;
        document.getElementById("seconds").innerHTML = secs;

        // Calculate progress bar width
        const totalDistance = endDate.getTime() - startDate.getTime();
        const percentageDistance = (distanceCovered / totalDistance) * 100;

        // Set width for the progress bar
        document.getElementById("progress-bar").style.width = percentageDistance + "%";

    }, 1000);
}
