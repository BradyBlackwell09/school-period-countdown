
const normalSchedule = [
    { name: "Period 1", start: "08:15", end: "09:00" },
    { name: "Period 2", start: "09:06", end: "09:51" },
    { name: "Period 3", start: "09:57", end: "10:42" },
    { name: "Period 4", start: "10:48", end: "11:33" },
    { name: "Period 5", start: "11:39", end: "12:25" },
    { name: "Lunch", start: "12:25", end: "13:07" }, // Corrected Lunch start time
    { name: "Period 6", start: "13:13", end: "13:58" },
    { name: "Period 7", start: "14:04", end: "14:49" },
    { name: "Period 8", start: "14:55", end: "15:40" },
];

let currentSchedule = normalSchedule;

function switchSchedule(schedule) {
    currentSchedule = schedule;
    updateScheduleDisplay();
    toggleSidebar(); // Close sidebar after switching schedule
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open"); // Toggle the 'open' class for sliding effect
}

function updateScheduleDisplay() {
    const scheduleContainer = document.getElementById("schedule");
    scheduleContainer.innerHTML = ""; // Clear existing schedule

    currentSchedule.forEach((period, index) => {
        const periodDiv = document.createElement("div");
        periodDiv.className = "period";
        const label = document.createElement("label");
        label.innerText = period.name; // Display the name as is
        const timer = document.createElement("span");
        timer.id = `Period${index}_Timer`; // Ensure unique IDs
        periodDiv.appendChild(label);
        periodDiv.appendChild(timer);
        scheduleContainer.appendChild(periodDiv);

        console.log(`Created element for ${period.name} with ID: ${timer.id}`);
    });

    updateCountdowns(); // Start updating countdowns
}

function updateCountdowns() {
    const now = new Date;
    const currentTimeInSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    console.log(`Current time in seconds: ${currentTimeInSeconds}`);

    currentSchedule.forEach((period, index) => {
        const [startHour, startMinute] = period.start.split(":").map(Number);
        const periodStartTimeInSeconds = (startHour * 3600) + (startMinute * 60);
        const [endHour, endMinute] = period.end.split(":").map(Number);
        const periodEndTimeInSeconds = (endHour * 3600) + (endMinute * 60);

        console.log(`Period: ${period.name}, Start: ${periodStartTimeInSeconds}, End: ${periodEndTimeInSeconds}`);

        let countdown = 0;
        if (currentTimeInSeconds < periodStartTimeInSeconds) {
            countdown = periodStartTimeInSeconds - currentTimeInSeconds;
        } else if (currentTimeInSeconds >= periodStartTimeInSeconds && currentTimeInSeconds < periodEndTimeInSeconds) {
            countdown = periodEndTimeInSeconds - currentTimeInSeconds;
        } else {
            countdown = -1; // Period ended
        }

        const timerElement = document.getElementById(`Period${index}_Timer`);
        if (timerElement) {
            console.log(`Updating ${period.name}: ${countdown >= 0 ? formatCountdown(countdown) : "Ended"}`);
            timerElement.innerText = countdown >= 0 ? formatCountdown(countdown) : "Ended";
        } else {
            console.error(`Timer element for ${period.name} not found`);
        }
    });

    // Countdown for next day start
    const nextDayStart = new Date(now);
    nextDayStart.setHours(8, 15, 0, 0); // Assuming school starts at 8:15
    if (now >= nextDayStart) { // After school hours
        nextDayStart.setDate(nextDayStart.getDate() + 1);
    }
    const countdownNextDay = Math.floor((nextDayStart - now) / 1000);
    const countdownNextDayElement = document.getElementById("countdownNextDay");
    if (countdownNextDayElement) {
        countdownNextDayElement.innerText = formatCountdown(countdownNextDay);
    }
    console.log(`Next day start countdown in seconds: ${countdownNextDay}`);
}

function formatCountdown(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
}

// Initialize schedule display
updateScheduleDisplay();
setInterval(updateCountdowns, 1000); // Update countdown
