//     {
//         center_image:,
//         center_name : "CarRepairs Pvt.Ltd.",
//         center_location : "Gnan Circle,Sricity-5674244",
//         center_contact : "9768976751",
//         center_email : "carrepair@gmail.com",
//         center_price: "₹360 - ₹428",
//         center_booknow : "Book Now"

//     },
//     {
//         center_image:,
//         center_name : "CarRepairs Pvt.Ltd.",
//         center_location : "Gnan Circle,Sricity-5674244",
//         center_contact : "9768976751",
//         center_email : "carrepair@gmail.com",
//         center_price: "₹360 - ₹428",
//         center_booknow : "Book Now"
//     },

//     {
//         center_image:,
//         center_name : "CarRepairs Pvt.Ltd.",
//         center_location : "Gnan Circle,Sricity-5674244",
//         center_contact : "9768976751",
//         center_email : "carrepair@gmail.com",
//         center_price: "₹360 - ₹428",
//         center_booknow : "Book Now"
//     },
// ]


function sccreatecard(title , location , phno , email , price){
    let html = `
    <div class="sc-card-center"> 

            <div class="sc-center-image">
            <img src="Assets/center_img2.jpg" alt="" />
            </div>

        <div class="sc-center-text">
            <h3 class="sc-center-heading">${title}</h3>

            <div class="sc-center-location">
            ${location}
            </div>

            <div class="sc-center-logos">
                <div class="sc-center-logos-phno">
                    <div style="margin-top: px">
                    <i class="material-icons">&#xe0b0;</i>
                    </div>
                    <span>${phno}</span>
                </div>
                <div class="sc-center-logos-email">
                    <div style="margin-top: px">
                    <i class="material-icons">&#xe0be;</i>
                    </div>
                    <span>${email}</span>
                </div>
            </div>
            <div class="sc-center-price">${price}/div>

            <div class="sc-center-booknow">
                <button>Book Now</button>
            </div>
        </div>
    </div>
    `
    document.querySelector(".sc-container-array").innerHTML = document.querySelector(".sc-container-array").innerHTML + html;
}

sccreatecard("CarRepairs Pvt.Ltd." , "Location : Gnan Circle,Sricity-5674244" , "9768976751" , "carrepair@gmail.com" , "₹360 - ₹428");

sccreatecard("CarRepairs Pvt.Ltd." , "Location : Gnan Circle,Sricity-5674244" , "9768976751" , "carrepair@gmail.com" , "₹360 - ₹428");
