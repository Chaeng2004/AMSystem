document.addEventListener('DOMContentLoaded', function() {
    const addScheduleBtn = document.querySelector('.add-schedule-btn');
    addScheduleBtn.addEventListener('click', function() {
        alert('Add new schedule functionality would go here');
    });
    
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const tableRows = document.querySelectorAll('.schedule-table tbody tr');
        
        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
});
