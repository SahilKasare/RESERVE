function toggleSelected(td) {
    var tds = document.querySelectorAll('.services-table td');
    tds.forEach(function(item) {
        item.classList.remove('table-selected');
    });
    
    td.classList.add('table-selected');
  
    // Update the session lot number through a server request
    fetch('/users/update-session-lotno', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lotno: td.textContent })
    })
    .then(response => {
        if (response.ok) {
            console.log('Lot number updated in session successfully');
        } else {
            console.error('Failed to update lot number in session');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Update the slot number in the UI
    let slotno = document.getElementById('selectedlot');
    slotno.innerHTML = `Lot Number : ${td.textContent}`;

    return td.textContent;
}
