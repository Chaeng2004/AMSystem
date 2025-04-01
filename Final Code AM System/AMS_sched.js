// Schedule data
const scheduleData = [
    {
        class: "Grade 10-Galileo",
        subject: "English",
        day: "Monday, Wednesday",
        time: "8:00 AM - 9:30 AM",
        room: "Room 1",
        status: "Active"
    },
    {
        class: "Grade 10-Galileo",
        subject: "Math",
        day: "Monday, Wednesday",
        time: "9:45 AM - 11:15 AM",
        room: "Room 1",
        status: "Active"
    },
    {
        class: "Grade 11-Da Vinci",
        subject: "Filipino",
        day: "Monday, Wednesday",
        time: "1:00 PM - 3:00 PM",
        room: "Room 3",
        status: "Active"
    },
    {
        class: "Grade 10-Galileo",
        subject: "Filipino",
        day: "Tuesday, Thursday",
        time: "8:00 AM - 10:00 AM",
        room: "Room 1",
        status: "Active"
    },
    {
        class: "Grade 11-Da Vinci",
        subject: "English",
        day: "Tuesday, Thursday",
        time: "10:30:00 AM - 11:30 AM",
        room: "Room 3",
        status: "Pending"
    },
   
    {
        class: "Grade 11-Da Vinci",
        subject: "Math",
        day: "Tuesday, Thursday",
        time: "1:00 PM - 3:00 PM",
        room: "Room 3",
        status: "Pending"
    },
    {
        class: "Grade 12-Franklin",
        subject: "English",
        day: "Friday",
        time: "8:00 AM - 9:30 AM",
        room: "Room 3",
        status: "Pending"
    },
    {
        class: "Grade 12-Franklin",
        subject: "Math",
        day: "Friday",
        time: "9:45 AM - 11:15 AM",
        room: "Room 7",
        status: "Pending"
    },
    {
        class: "Grade 12-Franklin",
        subject: "Filipino",
        day: "Friday",
        time: "1:00 PM - 2:30 PM",
        room: "Room 5",
        status: "Pending"
    },

];

// Function to populate table
function populateTable() {
    const tableBody = document.getElementById('scheduleTableBody');
    
    scheduleData.forEach(item => {
        const row = document.createElement('tr');
        
        const classCell = document.createElement('td');
        classCell.textContent = item.class;
        row.appendChild(classCell);
        
        const subjectCell = document.createElement('td');
        subjectCell.textContent = item.subject;
        row.appendChild(subjectCell);
        
        const dayCell = document.createElement('td');
        dayCell.textContent = item.day;
        row.appendChild(dayCell);
        
        const timeCell = document.createElement('td');
        timeCell.textContent = item.time;
        row.appendChild(timeCell);
        
        const roomCell = document.createElement('td');
        roomCell.textContent = item.room;
        row.appendChild(roomCell);
        
        const statusCell = document.createElement('td');
        const statusSpan = document.createElement('span');
        statusSpan.textContent = item.status;
        statusSpan.className = `status ${item.status.toLowerCase()}`;
        statusCell.appendChild(statusSpan);
        row.appendChild(statusCell);
        
        tableBody.appendChild(row);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    populateTable();
     
});

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