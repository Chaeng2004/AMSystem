 // Sample attendance data organized by school year, grade level, semester, and subject
 const attendanceData = {
    "2020-2021": {
        "Grade 10": {
            "1st Semester": { "Filipino": 85, "Math": 92, "English": 78 },
            "2nd Semester": { "Filipino": 82, "Math": 88, "English": 75 }
        },
        "Grade 11": {
            "1st Semester": { "Filipino": 89, "Math": 79, "English": 91 },
            "2nd Semester": { "Filipino": 91, "Math": 83, "English": 88 }
        },
        "Grade 12": {
            "1st Semester": { "Filipino": 93, "Math": 87, "English": 90 },
            "2nd Semester": { "Filipino": 95, "Math": 89, "English": 92 }
        }
    },
    "2021-2022": {
        "Grade 10": {
            "1st Semester": { "Filipino": 88, "Math": 76, "English": 82 },
            "2nd Semester": { "Filipino": 85, "Math": 80, "English": 79 }
        },
        "Grade 11": {
            "1st Semester": { "Filipino": 91, "Math": 83, "English": 89 },
            "2nd Semester": { "Filipino": 93, "Math": 87, "English": 84 }
        },
        "Grade 12": {
            "1st Semester": { "Filipino": 95, "Math": 90, "English": 93 },
            "2nd Semester": { "Filipino": 96, "Math": 92, "English": 90 }
        }
    },
    "2022-2023": {
        "Grade 10": {
            "1st Semester": { "Filipino": 79, "Math": 85, "English": 68 },
            "2nd Semester": { "Filipino": 82, "Math": 81, "English": 71 }
        },
        "Grade 11": {
            "1st Semester": { "Filipino": 87, "Math": 89, "English": 82 },
            "2nd Semester": { "Filipino": 90, "Math": 86, "English": 85 }
        },
        "Grade 12": {
            "1st Semester": { "Filipino": 92, "Math": 94, "English": 89 },
            "2nd Semester": { "Filipino": 94, "Math": 91, "English": 93 }
        }
    },
    "2023-2024": {
        "Grade 10": {
            "1st Semester": { "Filipino": 81, "Math": 73, "English": 88 },
            "2nd Semester": { "Filipino": 84, "Math": 77, "English": 85 }
        },
        "Grade 11": {
            "1st Semester": { "Filipino": 89, "Math": 86, "English": 92 },
            "2nd Semester": { "Filipino": 91, "Math": 89, "English": 90 }
        },
        "Grade 12": {
            "1st Semester": { "Filipino": 94, "Math": 92, "English": 97 },
            "2nd Semester": { "Filipino": 96, "Math": 94, "English": 95 }
        }
    }
};

// Function to determine color based on attendance percentage
function getColorByAttendance(percentage) {
    if (percentage >= 90) {
        return '#2ecc71'; // Green for high attendance
    } else if (percentage >= 70) {
        return '#3498db'; // Blue for moderate attendance
    } else {
        return '#e74c3c'; // Red for low attendance
    }
}

// Initialize chart
let attendanceChart;

function initializeChart() {
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    
    attendanceChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Filipino', 'Math', 'English'],
            datasets: [{
                data: [0, 0, 0], // Initial empty data
                backgroundColor: ['#2ecc71', '#3498db', '#e74c3c'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            }
        }
    });
    
    // Update chart with initial data
    updateChart();
}

// Function to update chart data based on selected filters
function updateChart() {
    const schoolYear = document.getElementById('schoolYear').value;
    const gradeLevel = document.getElementById('gradeLevel').value;
    const semester = document.getElementById('semester').value;
    
    // Get attendance data for selected filters
    const data = attendanceData[schoolYear][gradeLevel][semester];
    
    // Update chart data
    attendanceChart.data.datasets[0].data = [
        data.Filipino,
        data.Math,
        data.English
    ];
    
    // Update colors based on attendance percentages
    attendanceChart.data.datasets[0].backgroundColor = [
        getColorByAttendance(data.Filipino),
        getColorByAttendance(data.Math),
        getColorByAttendance(data.English)
    ];
    
    // Update chart
    attendanceChart.update();
}

// Add event listeners to update chart when filters change
document.getElementById('schoolYear').addEventListener('change', updateChart);
document.getElementById('gradeLevel').addEventListener('change', updateChart);
document.getElementById('semester').addEventListener('change', updateChart);

// Add functionality to the "Add School Year" button
document.getElementById('addSchoolYearBtn').addEventListener('click', function() {
    const schoolYearSelect = document.getElementById('schoolYear');
    const lastOption = schoolYearSelect.options[schoolYearSelect.options.length - 1];
    
    if (lastOption) {
        // Parse the last school year
        const lastYear = lastOption.value;
        const years = lastYear.split('-');
        const startYear = parseInt(years[0]);
        const endYear = parseInt(years[1]);
        
        // Create new school year (increment by 1)
        const newStartYear = endYear;
        const newEndYear = endYear + 1;
        const newSchoolYear = `${newStartYear}-${newEndYear}`;
        
        // Check if the new school year already exists
        let alreadyExists = false;
        for (let i = 0; i < schoolYearSelect.options.length; i++) {
            if (schoolYearSelect.options[i].value === newSchoolYear) {
                alreadyExists = true;
                break;
            }
        }
        
        if (!alreadyExists) {
            // Add new option to select
            const newOption = document.createElement('option');
            newOption.value = newSchoolYear;
            newOption.textContent = newSchoolYear;
            schoolYearSelect.appendChild(newOption);
            
            // Select the new option
            schoolYearSelect.value = newSchoolYear;
            
            // Add new data for the new school year
            attendanceData[newSchoolYear] = {
                "Grade 10": {
                    "1st Semester": { "Filipino": 0, "Math": 0, "English": 0 },
                    "2nd Semester": { "Filipino": 0, "Math": 0, "English": 0 }
                },
                "Grade 11": {
                    "1st Semester": { "Filipino": 0, "Math": 0, "English": 0 },
                    "2nd Semester": { "Filipino": 0, "Math": 0, "English": 0 }
                },
                "Grade 12": {
                    "1st Semester": { "Filipino": 0, "Math": 0, "English": 0 },
                    "2nd Semester": { "Filipino": 0, "Math": 0, "English": 0 }
                }
            };
            
            // Update chart
            updateChart();
        }
    }
});

// Initialize the chart when the page loads
window.onload = initializeChart;

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
