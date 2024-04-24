document.addEventListener("DOMContentLoaded", function () {
  const servicesContainer = document.getElementById("services");
  const addServiceBtn = document.getElementById("add-service-btn");
  let serviceCount = 1;

  // Object containing form details for each service option
  const serviceDetails = {
    option1: document.getElementById("park").innerHTML,
    option2: document.getElementById("clean").innerHTML,
    option3: document.getElementById("charge").innerHTML,
    option4: document.getElementById("inspection").innerHTML,
    option5: document.getElementById("paint").innerHTML,
  };

  function addService() {
    const serviceDiv = document.createElement("div");
    serviceDiv.classList.add("service");
    serviceDiv.innerHTML = `
        <div style="font-size: 33px;">Service Added</div>
        <select style="font-size: 20px;" class="service-select" name="service${serviceCount}">
          <option value="option1">Car Parking</option>
          <option value="option2">Car Cleaning</option>
          <option value="option3">EV Charging</option>
          <option value="option4">Vehicle Inspection</option>
          <option value="option5">Painting & Denting</option>
        </select>
        <div class="form-fields">
          ${serviceDetails["option1"]} <!-- Default to the first option details -->
        </div>
        <button style="font-size: 20px; font-weight: 600; background-color: rgb(182, 182, 6); border-radius: 8px; margin-left: 42vw; " class="remove-service-btn">Remove</button>
      `;
    servicesContainer.appendChild(serviceDiv);
    serviceCount++;

    // Add event listener to remove service button
    const removeServiceBtn = serviceDiv.querySelector(".remove-service-btn");
    removeServiceBtn.addEventListener("click", function () {
      serviceDiv.remove();
    });

    // Update form details based on selected option
    const select = serviceDiv.querySelector(".service-select");
    select.addEventListener("change", function () {
      const selectedOption = select.value;
      const formFieldsContainer = serviceDiv.querySelector(".form-fields");
      formFieldsContainer.innerHTML = serviceDetails[selectedOption];

      // Hide the dropdown after an option is selected
      serviceDiv.querySelector(".service-select-container").style.display =
        "none";
    });
  }

  addServiceBtn.addEventListener("click", addService);
});

// adfsh;l
// fdhak

document.addEventListener("DOMContentLoaded", function () {
  const servicesContainer = document.getElementById("services");
  const addServiceBtn = document.getElementById("add-service-btn");
  let serviceCount = 1;

  // Object containing form details for each service option
  const serviceDetails = {
    option1: document.getElementById("option1-form").innerHTML,
    option2: document.getElementById("option2-form").innerHTML,
    option3: document.getElementById("option3-form").innerHTML,
  };

  function addService() {
    const serviceDiv = document.createElement("div");
    serviceDiv.classList.add("service");
    serviceDiv.innerHTML = `
        <div class="service-select-container">
          <select class="service-select" name="service${serviceCount}">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div class="form-fields">
          ${serviceDetails["option1"]} <!-- Default to the first option details -->
        </div>
        <button class="remove-service-btn">Remove</button>
      `;
    servicesContainer.appendChild(serviceDiv);
    serviceCount++;

    // Add event listener to remove service button
    const removeServiceBtn = serviceDiv.querySelector(".remove-service-btn");
    removeServiceBtn.addEventListener("click", function () {
      serviceDiv.remove();
    });

    // Update form details based on selected option
    const select = serviceDiv.querySelector(".service-select");
    select.addEventListener("change", function () {
      const selectedOption = select.value;
      const formFieldsContainer = serviceDiv.querySelector(".form-fields");
      formFieldsContainer.innerHTML = serviceDetails[selectedOption];

      // Hide the dropdown after an option is selected
      serviceDiv.querySelector(".service-select-container").style.display =
        "none";
    });
  }

  addServiceBtn.addEventListener("click", addService);
});
