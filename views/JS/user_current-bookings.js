
function cbcreatecard(date,time,title,ph,contact){
    let html = 
    `
            <div class="cb-card">
            <div class="cb-date-time">
            <div class="cb-date">
                <i class="material-icons">&#xe8df;</i>
                <span>${date}</span>
            </div>
            <div class="cb-time">
                <i class="material-icons">&#xe192;</i>
                <span>${time}</span>
            </div>
            </div>
            <hr />
            <div class="cb-center-title">
            ${title}
            </div>
            <div class="cb-phone-and-email">
            <div class="cb-phone">
                <i class="material-icons">&#xe0b0;</i>
                <span>${ph}</span>
            </div>
            <div class="cb-email">
                <i class="material-icons">&#xe0be;</i>
                <span>${contact}</span>
            </div>
            </div>
            <div class="cb-cancel">
            <button>Cancel</button>
            </div>
        </div>
    `

    document.querySelector(".cb-container-array").innerHTML = document.querySelector(".cb-container-array").innerHTML + html;
}

// cbcreatecard("18/05/2024" , "02:05pm" , "CarRepair.pvt" , "9768976751", "carrepair@gmail.com");
// cbcreatecard("18/05/2024" , "02:05pm" , "CarRepair.pvt" , "9768976751", "carrepair@gmail.com");
// cbcreatecard("18/05/2024" , "02:05pm" , "CarRepair.pvt" , "9768976751", "carrepair@gmail.com");
// cbcreatecard("18/05/2024" , "02:05pm" , "CarRepair.pvt" , "9768976751", "carrepair@gmail.com");
// cbcreatecard("18/05/2024" , "02:05pm" , "CarRepair.pvt" , "9768976751", "carrepair@gmail.com");