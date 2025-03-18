
// Sample data for charts
const data = {
    "2023-2024": {
        english: [
            {value: 90, type: "high"},
            {value: 80, type: "medium"},
            {value: 75, type: "medium"},
            {value: 85, type: "good"},
            {value: 90, type: "high"},
            {value: 85, type: "good"},
            {value: 90, type: "high"},
            {value: 90, type: "high"},
            {value: 90, type: "high"}
        ],
        math: [
            {value: 85, type: "good"},
            {value: 70, type: "low"},
            {value: 70, type: "low"},
            {value: 80, type: "medium"},
            {value: 85, type: "good"},
            {value: 85, type: "good"},
            {value: 90, type: "high"},
            {value: 90, type: "high"},
            {value: 90, type: "high"}
        ],
        filipino: [
            {value: 90, type: "high"},
            {value: 85, type: "good"},
            {value: 80, type: "medium"},
            {value: 80, type: "medium"},
            {value: 85, type: "good"},
            {value: 85, type: "good"},
            {value: 90, type: "high"},
            {value: 90, type: "high"},
            {value: 90, type: "high"}
        ]
    },
    "2022-2023": {
        english: [
            {value: 88, type: "good"},
            {value: 82, type: "good"},
            {value: 78, type: "medium"},
            {value: 82, type: "good"},
            {value: 85, type: "good"},
            {value: 87, type: "good"},
            {value: 88, type: "good"},
            {value: 89, type: "good"},
            {value: 90, type: "high"}
        ],
        math: [
            {value: 82, type: "good"},
            {value: 78, type: "medium"},
            {value: 75, type: "medium"},
            {value: 77, type: "medium"},
            {value: 80, type: "medium"},
            {value: 82, type: "good"},
            {value: 85, type: "good"},
            {value: 87, type: "good"},
            {value: 88, type: "good"}
        ],
        filipino: [
            {value: 85, type: "good"},
            {value: 83, type: "good"},
            {value: 80, type: "medium"},
            {value: 82, type: "good"},
            {value: 84, type: "good"},
            {value: 86, type: "good"},
            {value: 88, type: "good"},
            {value: 89, type: "good"},
            {value: 90, type: "high"}
        ]
    },
    "2021-2022": {
        english: [
            {value: 85, type: "good"},
            {value: 80, type: "medium"},
            {value: 78, type: "medium"},
            {value: 80, type: "medium"},
            {value: 82, type: "good"},
            {value: 84, type: "good"},
            {value: 86, type: "good"},
            {value: 88, type: "good"},
            {value: 90, type: "high"}
        ],
        math: [
            {value: 80, type: "medium"},
            {value: 75, type: "medium"},
            {value: 72, type: "low"},
            {value: 75, type: "medium"},
            {value: 78, type: "medium"},
            {value: 80, type: "medium"},
            {value: 82, type: "good"},
            {value: 85, type: "good"},
            {value: 87, type: "good"}
        ],
        filipino: [
            {value: 82, type: "good"},
            {value: 80, type: "medium"},
            {value: 78, type: "medium"},
            {value: 80, type: "medium"},
            {value: 82, type: "good"},
            {value: 84, type: "good"},
            {value: 86, type: "good"},
            {value: 88, type: "good"},
            {value: 90, type: "high"}
        ]
    }
};

const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

// Function to render charts
function renderChart(chartId, labelsId, dataArray) {
    const chartElement = document.getElementById(chartId);
    const labelsElement = document.getElementById(labelsId);
    
    // Clear existing elements
    chartElement.innerHTML = '';
    labelsElement.innerHTML = '';
    
    // Calculate width for each bar and label
    const containerWidth = chartElement.offsetWidth;
    const barCount = dataArray.length;
    const barWidth = 20;
    const spacing = (containerWidth - (barWidth * barCount)) / (barCount + 1);
    
    // Create bars and labels
    dataArray.forEach((item, index) => {
        // Create bar
        const bar = document.createElement('div');
        bar.className = `bar bar-${item.type}`;
        bar.style.height = '0px';
        
        // Create label
        const label = document.createElement('div');
        label.className = 'month-label';
        label.textContent = months[index];
        
        // Append to containers
        chartElement.appendChild(bar);
        labelsElement.appendChild(label);
        
        // Animate bar height after a short delay
        setTimeout(() => {
            bar.style.height = `${item.value * 1.5}px`;
        }, 50 * index);
    });
}

// Update dashboard data
function updateDashboard() {
    const year = document.getElementById('year').value;
    const yearData = data[year];
    
    // Update English
    document.querySelector('#english-card .card-rate').textContent = 
        `${Math.round(yearData.english.reduce((sum, item) => sum + item.value, 0) / yearData.english.length)}%`;
    renderChart('english-chart', 'english-labels', yearData.english);
    
    // Update Math
    document.querySelector('#math-card .card-rate').textContent = 
        `${Math.round(yearData.math.reduce((sum, item) => sum + item.value, 0) / yearData.math.length)}%`;
    renderChart('math-chart', 'math-labels', yearData.math);
    
    // Update Filipino
    document.querySelector('#filipino-card .card-rate').textContent = 
        `${Math.round(yearData.filipino.reduce((sum, item) => sum + item.value, 0) / yearData.filipino.length)}%`;
    renderChart('filipino-chart', 'filipino-labels', yearData.filipino);
}

// Initialize dashboard when page loads
window.onload = function() {
    updateDashboard();
};




