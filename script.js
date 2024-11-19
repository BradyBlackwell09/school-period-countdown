document.addEventListener("DOMContentLoaded", function() {
    const normalSchedule = [
        { name: "Period 1", start: "08:15", end: "09:00" },
        { name: "Period 2", start: "09:06", end: "09:51" },
        { name: "Period 3", start: "09:57", end: "10:42" },
        { name: "Period 4", start: "10:48", end: "11:33" },
        { name: "Period 5", start: "11:39", end: "12:25" },
        { name: "Lunch", start: "12:30", end: "13:07" },
        { name: "Period 6", start: "13:13", end: "13:58" },
        { name: "Period 7", start: "14:04", end: "14:49" },
        { name: "Period 8", start: "14:55", end: "15:40" },
    ];

    let currentSchedule = normalSchedule;

    function switchSchedule(schedule) {
        currentSchedule = schedule;
        updateScheduleDisplay();
    }

    function updateScheduleDisplay() {
        const scheduleContainer = document.getElementById("schedule");
        scheduleContainer.innerHTML = "";

        currentSchedule.forEach((period, index) => {
            const periodDiv = document.createElement("div");
            periodDiv.className = "period";
            const label = document.createElement("label");
            label.innerText = period.name;
            const timer = document.createElement("span");
            timer.id = `Period${index}_Timer`;
            periodDiv.appendChild(label);
            periodDiv.appendChild(timer);
            scheduleContainer.appendChild(periodDiv);
        });

        updateCountdowns();
    }

    function updateCountdowns() {
        const now = new Date();
        const currentTimeInSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        const currentPeriodIndex = getCurrentPeriodIndex(currentTimeInSeconds);
        updateCurrentPeriodDisplay(currentPeriodIndex, currentTimeInSeconds);
    }

    function getCurrentPeriodIndex(currentTimeInSeconds) {
        for (let i = 0; i < currentSchedule.length; i++) {
            const periodStart = getTimeInSeconds(currentSchedule[i].start);
            const periodEnd = getTimeInSeconds(currentSchedule[i].end);
            if (currentTimeInSeconds >= periodStart && currentTimeInSeconds < periodEnd) {
                return i;
            }
        }
        return getNextPeriodIndex(currentTimeInSeconds);
    }

    function getNextPeriodIndex(currentTimeInSeconds) {
        for (let i = 0; i < currentSchedule.length; i++) {
            const periodStart = getTimeInSeconds(currentSchedule[i].start);
            if (currentTimeInSeconds < periodStart) {
                return i;
            }
        }
        return -1; // No period found
    }

    function getTimeInSeconds(time) {
        const [hour, minute] = time.split(":").map(Number);
        return hour * 3600 + minute * 60;
    }

    function updateCurrentPeriodDisplay(currentPeriodIndex, currentTimeInSeconds) {
        if (currentPeriodIndex !== -1) {
            const period = currentSchedule[currentPeriodIndex];
            const periodEnd = getTimeInSeconds(period.end);
            const countdown = periodEnd - currentTimeInSeconds;

            document.getElementById("current-schedule-title").innerText = `Normal Schedule ▸ ${period.name}`;
            document.getElementById("current-period-time").innerText = formatCountdown(countdown);
        } else {
            document.getElementById("current-schedule-title").innerText = "Normal Schedule";
            document.getElementById("current-period-time").innerText = "";
        }
    }

    function formatCountdown(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function toggleSettingsSidebar() {
        const sidebar = document.getElementById("settings-sidebar");
        sidebar.classList.toggle("open");
    }

    function applySettings() {
        const bgColorStart = document.getElementById("bg-color-start").value;
        const bgColorEnd = document.getElementById("bg-color-end").value;
        const fontColor = document.getElementById("font-color").value;

        // Apply background gradient color
        document.body.style.background = `linear-gradient(to bottom right, ${bgColorStart}, ${bgColorEnd})`;

        // Apply period section font color
        const periodSections = document.querySelectorAll(".current-period, .schedule-container");
        periodSections.forEach(section => {
            section.style.color = fontColor;
        });

        // No need to close the sidebar here
    }

    // Attach event listeners
    document.querySelector('.settings-button').addEventListener('click', toggleSettingsSidebar);
    document.querySelector('.close-settings-sidebar').addEventListener('click', toggleSettingsSidebar);
    document.querySelector('.settings-sidebar button').addEventListener('click', applySettings);

    updateScheduleDisplay();
    setInterval(updateCountdowns, 1000); // Update countdowns every second
});

