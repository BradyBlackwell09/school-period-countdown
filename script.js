const normalSchedule = [
    { name: "Period 1", start: "08:15", end: "08:53" },
    { name: "Period 2", start: "08:59", end: "09:37" },
    { name: "Period 3", start: "09:43", end: "10:21" },
    { name: "Period 4", start: "10:27", end: "11:05" },
    { name: "Period 5", start: "11:11", end: "11:49" },
    { name: "Lunch", start: "12:33", end: "13:10" },
    { name: "Period 6", start: "11:55", end: "12:33" },
    { name: "Period 7", start: "13:16", end: "13:54" },
    { name: "Period 8", start: "14:00", end: "14:38" },
];

const pepRallySchedule = [
    { name: "Period 1", start: "08:15", end: "08:53" },
    { name: "Period 2", start: "08:59", end: "09:37" },
    { name: "Period 3", start: "09:43", end: "10:21" },
    { name: "Period 4", start: "10:27", end: "11:05" },
    { name: "Period 5", start: "11:11", end: "11:49" },
    { name: "Period 6", start: "11:55", end: "12:33" },
    { name: "Lunch", start: "12:33", end: "13:10" },
    { name: "Period 7", start: "13:16", end: "13:54" },
    { name: "Period 8", start: "14:00", end: "14:38" },
    { name: "Pep Rally", start: "14:45", end: "15:40" },
];

const chapelSchedule = [
    { name: "Period 1", start: "08:15", end: "08:53" },
    { name: "Period 2", start: "08:59", end: "09:38" },
    { name: "Period 3", start: "09:44", end: "10:23" },
    { name: "Chapel", start: "10:29", end: "11:14" },
    { name: "Period 4", start: "11:20", end: "12:00" },
    { name: "Period 5", start: "12:06", end: "12:46" },
    { name: "Lunch", start: "12:46", end: "13:28" },
    { name: "Period 6", start: "13:34", end: "14:12" },
    { name: "Period 7", start: "14:18", end: "14:56" },
    { name: "Period 8", start: "15:02", end: "15:40" },
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

    currentSchedule.forEach(period => {
        const periodDiv = document.createElement("div");
        periodDiv.className = "period";
        const label = document.createElement("label");
        label.innerText = period.name;
        const timer = document.createElement("span");
        timer.id = `${period.name.replace(/\s+/g, '')}Timer`;
        periodDiv.appendChild(label);
        periodDiv.appendChild(timer);
        scheduleContainer.appendChild(periodDiv);
    });

    updateCountdowns(); // Start updating countdowns
}

function updateCountdowns() {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    currentSchedule.forEach(period => {
        const [startHour, startMinute] = period.start.split(":").map(Number);
        const periodStartTime = startHour * 60 + startMinute;

        const [endHour, endMinute] = period.end.split(":").map(Number);
        const periodEndTime = endHour * 60 + endMinute;

        if (currentTime < periodStartTime) {
            const countdown = Math.max(0, periodStartTime - currentTime);
            document.getElementById(`${period.name.replace(/\s+/g, '')}Timer`).innerText = formatCountdown(countdown);
        } else if (currentTime >= periodStartTime && currentTime < periodEndTime) {
            const countdown = Math.max(0, periodEndTime - currentTime);
            document.getElementById(`${period.name.replace(/\s+/g, '')}Timer`).innerText = formatCountdown(countdown);
        } else {
            document.getElementById(`${period.name.replace(/\s+/g, '')}Timer`).innerText = "Ended";
        }
    });

    // Countdown for next day start
    const nextDayStart = new Date();
    nextDayStart.setHours(8, 15, 0, 0); // Assuming school starts at 8:15
    if (now.getHours() >= 15) { // After school hours
        nextDayStart.setDate(nextDayStart.getDate() + 1);
    }
    const countdownNextDay = Math.max(0, Math.floor((nextDayStart - now) / 1000));
    document.getElementById("countdownNextDay").innerText = formatCountdown(countdownNextDay);
}

function formatCountdown(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
}

// Initialize schedule display
updateScheduleDisplay();
setInterval(updateCountdowns, 1000); // Update countdowns every second
