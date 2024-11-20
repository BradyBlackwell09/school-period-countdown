
// Function to toggle the settings sidebar
function toggleSettingsSidebar() {
    const sidebar = document.getElementById("settings-sidebar");
    sidebar.classList.toggle("open");
}

// Section 1: Settings

function loadSettings() {
    const fontColor = localStorage.getItem("fontColor") || "#ffffff";
    const bgColorStart = localStorage.getItem("bgColorStart") || "#000035";
    const bgColorEnd = localStorage.getItem("bgColorEnd") || "#00bfa5";

    document.getElementById("font-color").value = fontColor;
    document.getElementById("bg-color-start").value = bgColorStart;
    document.getElementById("bg-color-end").value = bgColorEnd;

    applySettings(); // Apply the settings on load
}

// Function to apply user settings and save them
function applySettings() {
    const fontColor = document.getElementById("font-color").value;
    const bgColorStart = document.getElementById("bg-color-start").value;
    const bgColorEnd = document.getElementById("bg-color-end").value;

    localStorage.setItem("fontColor", fontColor);
    localStorage.setItem("bgColorStart", bgColorStart);
    localStorage.setItem("bgColorEnd", bgColorEnd);

    const countdownHeading = document.getElementById("countdown-heading");
    const countdownTimer = document.getElementById("current-period-time");

    countdownHeading.style.color = fontColor;
    countdownTimer.style.color = fontColor;
    document.body.style.background = `linear-gradient(${bgColorStart}, ${bgColorEnd})`;
}

// Section 2: Countdown

function updateCountdowns() {
    const now = new Date();
    const currentTimeInSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    let nextPeriod = currentSchedule.find(period => getTimeInSeconds(period.start) > currentTimeInSeconds);

    const fontColor = localStorage.getItem("fontColor") || document.getElementById("font-color").value;
    const countdownElement = document.getElementById("countdown-heading");
    const countdownTimer = document.getElementById("current-period-time");

    if (!nextPeriod) {
        // No more periods today, get the first period of tomorrow
        nextPeriod = { name: currentSchedule[0].name, start: currentSchedule[0].start };
        const countdown = getTimeInSeconds(nextPeriod.start) + (24 * 3600 - currentTimeInSeconds); // Time until midnight + time from midnight to next period
        document.getElementById("current-period-time").innerText = formatCountdownHHMMSS(countdown);
        document.getElementById("countdown-heading").innerText = `${currentScheduleName.charAt(0).toUpperCase() + currentScheduleName.slice(1)} Schedule ▸ Free`;
        updateCountdownColor(countdown, true, fontColor);
    } else {
        const countdown = getTimeInSeconds(nextPeriod.start) - currentTimeInSeconds;
        document.getElementById("current-period-time").innerText = formatCountdown(countdown);
        document.getElementById("countdown-heading").innerText = `${currentScheduleName.charAt(0).toUpperCase() + currentScheduleName.slice(1)} Schedule ▸ ${nextPeriod.name}`;
        updateCountdownColor(countdown, false, fontColor);
    }

    // Ensure the custom font color persists
    countdownElement.style.color = fontColor;
    countdownTimer.style.color = fontColor;
}

// Function to convert time to seconds
function getTimeInSeconds(time) {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 3600 + minute * 60;
}

// Function to format countdown in minutes and seconds
function formatCountdown(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Function to format countdown in hours, minutes, and seconds
function formatCountdownHHMMSS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Function to update countdown color
function updateCountdownColor(seconds, isFree, fontColor) {
    const countdownElement = document.getElementById("countdown-heading");
    if (isFree) {
        countdownElement.style.color = "black"; // Default color when it's free time
    } else if (seconds < 60) {
        countdownElement.style.color = "red"; // Less than a minute remaining
    } else if (seconds < 300) {
        countdownElement.style.color = "orange"; // Less than 5 minutes remaining
    } else {
        countdownElement.style.color = fontColor; // Use custom font color
    }
}

// Function to start the countdown
function startCountdown() {
    setInterval(updateCountdowns, 1000); // Update countdowns every second
}

// Ensure to start the countdown when the document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    currentScheduleName = 'normal'; // Keep track of the current schedule name
    startCountdown();  // Ensure countdown starts
});


//s3
// Section 3A: Declaring Schedules

const schedules = {
    normal: [
        { name: "Period 1", start: "08:15", end: "09:00" },
        { name: "Passing", start: "09:00", end: "09:06" },
        { name: "Period 2", start: "09:06", end: "09:51" },
        { name: "Passing", start: "09:51", end: "09:57" },
        { name: "Period 3", start: "09:57", end: "10:42" },
        { name: "Passing", start: "10:42", end: "10:48" },
        { name: "Period 4", start: "10:48", end: "11:33" },
        { name: "Passing", start: "11:33", end: "11:39" },
        { name: "Period 5", start: "11:39", end: "12:25" },
        { name: "Lunch", start: "12:25", end: "13:07" },
        { name: "Passing", start: "13:07", end: "13:13" },
        { name: "Period 6", start: "13:13", end: "13:58" },
        { name: "Passing", start: "13:58", end: "14:04" },
        { name: "Period 7", start: "14:04", end: "14:49" },
        { name: "Passing", start: "14:49", end: "14:55" },
        { name: "Period 8", start: "14:55", end: "15:40" },
    ],
    chapel: [
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
    ],
    latePepRally: [
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
    ],
    earlyPepRally: [
        { name: "Period 1", start: "08:15", end: "08:55" },
        { name: "Period 2", start: "09:01", end: "09:41" },
        { name: "Period 3", start: "09:47", end: "10:27" },
        { name: "Period 4", start: "10:33", end: "11:13" },
        { name: "Period 5", start: "11:19", end: "11:59" },
        { name: "Pep Rally", start: "12:05", end: "12:30" },
        { name: "Lunch", start: "12:30", end: "13:13" },
        { name: "Period 6", start: "13:19", end: "14:02" },
        { name: "Period 7", start: "14:08", end: "14:51" },
        { name: "Period 8", start: "14:57", end: "15:40" },
    ]
};


// Section 3B: Schedule Functions

let currentSchedule = schedules.normal; // Default to normal schedule
let currentScheduleName = 'normal'; // Keep track of the current schedule name

// Dictionary to map schedule keys to display names
const scheduleDisplayNames = {
    normal: 'Normal',
    chapel: 'Chapel Bell',
    latePepRally: 'Late Pep Rally',
    earlyPepRally: 'Early Pep Rally'
};

// Function to switch schedules
function switchSchedule(scheduleName) {
    if (schedules[scheduleName]) {
        currentSchedule = schedules[scheduleName];
        currentScheduleName = scheduleName;

        // Use the dictionary to get the display name or format the schedule name
        let formattedScheduleName = scheduleDisplayNames[scheduleName] || 
            scheduleName.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        document.getElementById("countdown-heading").innerText = `${formattedScheduleName} Schedule ▸ ${currentSchedule[0].name}`;
        updateScheduleDisplay();
    } else {
        console.error(`Schedule ${scheduleName} does not exist!`);
    }
}

// Function to populate period renaming inputs
function populatePeriodRenaming() {
    const renameContainer = document.getElementById("rename-periods-content");
    renameContainer.innerHTML = "";
    currentSchedule.forEach((period, index) => {
        if (period.name !== "Passing" && period.name !== "Break") {
            const renameDiv = document.createElement("div");
            const label = document.createElement("label");
            label.innerText = `Rename ${period.name}: `;
            const input = document.createElement("input");
            input.type = "text";
            input.value = period.name;
            input.id = `rename-period${index}`;
            renameDiv.appendChild(label);
            renameDiv.appendChild(input);
            renameContainer.appendChild(renameDiv);
        }
    });
}

// Function to update schedule display
function updateScheduleDisplay() {
    const scheduleContainer = document.getElementById("schedule");
    scheduleContainer.innerHTML = "";
    currentSchedule.forEach((period, index) => {
        if (period.name !== "Passing" && period.name !== "Break") {
            const periodDiv = document.createElement("div");
            periodDiv.className = "period";
            const label = document.createElement("label");
            label.innerText = period.name;
            const timer = document.createElement("span");
            timer.id = `Period${index}_Timer`;
            periodDiv.appendChild(label);
            periodDiv.appendChild(timer);
            scheduleContainer.appendChild(periodDiv);
        }
    });
    updateCountdowns(); // Ensure countdowns are updated
}

// Initialize everything when the document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    loadSettings(); // Load settings from Section 1
    populatePeriodRenaming(); // Populate period renaming inputs
    updateScheduleDisplay(); // Update schedule display
    startCountdown(); // Start the countdown
});

