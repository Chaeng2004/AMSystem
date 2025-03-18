const students = {
    "grade10-galileo-english": [
        { id: "2025-0001", name: "Student 1" },
        { id: "2025-0002", name: "Student 2" },
        { id: "2025-0003", name: "Student 3" },
        { id: "2025-0004", name: "Student 4" },
        { id: "2025-0005", name: "Student 5" }
    ],
    "grade10-galileo-math": [
        { id: "2025-0001", name: "Student 1" },
        { id: "2025-0002", name: "Student 2" },
        { id: "2025-0003", name: "Student 3" },
        { id: "2025-0004", name: "Student 4" },
        { id: "2025-0005", name: "Student 5" }
    ],
    "grade10-galileo-filipino": [
        { id: "2025-0001", name: "Student 1" },
        { id: "2025-0002", name: "Student 2" },
        { id: "2025-0003", name: "Student 3" },
        { id: "2025-0004", name: "Student 4" },
        { id: "2025-0005", name: "Student 5" }
    ],
    "grade11-davinci-physics": [
        { id: "2024-0001", name: "Student 1" },
        { id: "2024-0002", name: "Student 2" },
        { id: "2024-0003", name: "Student 3" },
        { id: "2024-0004", name: "Student 4" }
    ],
    "grade11-davinci-chemistry": [
        { id: "2024-0001", name: "Student 1" },
        { id: "2024-0002", name: "Student 2" },
        { id: "2024-0003", name: "Student 3" },
        { id: "2024-0004", name: "Student 4" }
    ],
    "grade12-franklin-research": [
        { id: "2023-0001", name: "Student 1" },
        { id: "2023-0002", name: "Student 2" },
        { id: "2023-0003", name: "Student 3" }
    ]
};

let attendanceData = {};

function initAttendanceData() {
    const classId = document.getElementById('classSelector').value;
    const date = document.getElementById('dateSelector').value;
    const key = `${classId}-${date}`;
    
    if (!attendanceData[key]) {
        attendanceData[key] = {};
        students[classId].forEach(student => {
            attendanceData[key][student.id] = {
                status: 'present' // Default status
            };
        });
    }
    
    renderAttendanceTable();
}

function renderAttendanceTable() {
    const classId = document.getElementById('classSelector').value;
    const date = document.getElementById('dateSelector').value;
    const key = `${classId}-${date}`;
    const tableBody = document.getElementById('attendanceTableBody');
    
    tableBody.innerHTML = '';
    
    students[classId].forEach(student => {
        const status = attendanceData[key][student.id]?.status || 'present';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>
                <select class="status-selector" data-student-id="${student.id}">
                    <option value="present" ${status === 'present' ? 'selected' : ''}>Present</option>
                    <option value="absent" ${status === 'absent' ? 'selected' : ''}>Absent</option>
                    <option value="excused" ${status === 'excused' ? 'selected' : ''}>Excused</option>
                </select>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    document.querySelectorAll('.status-selector').forEach(selector => {
        selector.addEventListener('change', function() {
            const studentId = this.getAttribute('data-student-id');
            attendanceData[key][studentId].status = this.value;
            updateSummary();
        });
    });
    
    updateSummary();
}

function updateSummary() {
    const classId = document.getElementById('classSelector').value;
    const date = document.getElementById('dateSelector').value;
    const key = `${classId}-${date}`;
    
    let present = 0, absent = 0, excused = 0;
    
    Object.values(attendanceData[key]).forEach(record => {
        if (record.status === 'present') present++;
        else if (record.status === 'absent') absent++;
        else if (record.status === 'excused') excused++;
    });
    
    document.getElementById('presentCount').textContent = present;
    document.getElementById('absentCount').textContent = absent;
    document.getElementById('excusedCount').textContent = excused;
    document.getElementById('totalCount').textContent = students[classId].length;
}

document.getElementById('classSelector').addEventListener('change', initAttendanceData);
document.getElementById('dateSelector').addEventListener('change', initAttendanceData);
document.getElementById('saveButton').addEventListener('click', function() {
    alert('Attendance data saved successfully!');
});

window.onload = function() {
    initAttendanceData();
};
