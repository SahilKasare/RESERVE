function toggleSelected(td) {
    var tds = document.querySelectorAll('.services-table td');
    tds.forEach(function(item) {
        item.classList.remove('table-selected');
    });
    
    td.classList.add('table-selected');
}