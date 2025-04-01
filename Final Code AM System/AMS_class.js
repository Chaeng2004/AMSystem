// Date restrictions
const dateSelect = document.getElementById('date-select');

// Set school year dates
const currentYear = 2024; // Current academic year starting year
const schoolYearStart = new Date(currentYear, 7, 1); // August 1st
const schoolYearEnd = new Date(currentYear + 1, 5, 30); // June 30th next year
const today = new Date();

// Convert to ISO format for input min/max attributes
const formatDateForInput = (date) => {
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
return `${year}-${month}-${day}`;
};

// Set min and max attributes for the date input
dateSelect.min = formatDateForInput(schoolYearStart);
dateSelect.max = formatDateForInput(today < schoolYearEnd ? today : schoolYearEnd);

// Set default date to today or the last valid day if today is outside school year
let defaultDate;
if (today >= schoolYearStart && today <= schoolYearEnd) {
defaultDate = today;
} else if (today > schoolYearEnd) {
defaultDate = schoolYearEnd;
} else {
defaultDate = schoolYearStart;
}

dateSelect.value = formatDateForInput(defaultDate);

// Toast notification function
function showToast(message, isError = false) {
const toast = document.getElementById('toast');
toast.textContent = message;
toast.style.backgroundColor = isError ? '#F44336' : '#4CAF50';
toast.classList.add('show');

setTimeout(() => {
toast.classList.remove('show');
}, 3000);
}

// Validate date on change
dateSelect.addEventListener('change', function() {
const selectedDate = new Date(this.value);

// Check if date is in the past or today
if (selectedDate > today) {
showToast("You cannot select future dates", true);
this.value = formatDateForInput(today <= schoolYearEnd ? today : schoolYearEnd);
return;
}

// Check if date is within school year
if (selectedDate < schoolYearStart || selectedDate > schoolYearEnd) {
showToast("Date must be within the current school year", true);
if (selectedDate < schoolYearStart) {
    this.value = formatDateForInput(schoolYearStart);
} else {
    this.value = formatDateForInput(schoolYearEnd);
}
}
});

// Update counts when radio buttons are clicked
const radioButtons = document.querySelectorAll('input[type="radio"]');

radioButtons.forEach(radio => {
radio.addEventListener('change', updateCounts);
});

function updateCounts() {
const present = document.querySelectorAll('input[value="present"]:checked').length;
const absent = document.querySelectorAll('input[value="absent"]:checked').length;
const excused = document.querySelectorAll('input[value="excused"]:checked').length;
const total = present + absent + excused;

document.getElementById('present-count').textContent = present;
document.getElementById('absent-count').textContent = absent;
document.getElementById('excused-count').textContent = excused;
document.getElementById('total-count').textContent = total;
}

// Mobile sidebar toggle
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', function() {
sidebar.classList.toggle('open');
overlay.classList.toggle('open');
});

overlay.addEventListener('click', function() {
sidebar.classList.remove('open');
overlay.classList.remove('open');
});

// Close sidebar when window resizes to desktop size
window.addEventListener('resize', function() {
if (window.innerWidth > 768) {
sidebar.classList.remove('open');
overlay.classList.remove('open');
}
});

