function toggleNav() {
  var sidebar = document.getElementById("mySidebar");
  var mainpage = document.querySelector(".mainpage");
  var button = document.getElementById("toggleButton");
  if (sidebar.style.width === "220px") {
    sidebar.style.width = "60px";
    mainpage.style.marginLeft = "155px";
    sidebar.classList.remove("expanded");
    button.innerHTML = "☰";
  } else {
    sidebar.style.width = "220px";
    mainpage.style.marginLeft = "230px";
    sidebar.classList.add("expanded");
    button.innerHTML = "☰";
  }
}

const signinup=document.getElementById('signinup');


const reviews = [
  {
    stars: 4,
    content:
      "Cost-effective car washing service. They delivered a thorough clean, both inside and out, without breaking the bank. Highly recommended for their affordability and quality.",
    name: "RAJESH KUMAR",
    image: "./Images/Users/boy3.jpg",
  },
  {
    stars: 5,
    content:
      "I was hesitant to try valet parking, but RESERVE made the experience stress-free and convenient. Their professional team ensured the safety and security of my car.",
    name: "SUNITA SHARMA",
    image: "./Images/Users/girl4.jpg",
  },
  {
    stars: 4,
    content:
      "Budget-friendly car servicing. Skilled mechanics, prompt service, and all at a reasonable price. My car runs smoother than ever, and I didn't have to spend a fortune!",
    name: "SURAJ DHILLON",
    image: "./Images/Users/boy2.jpg",
  },
  {
    stars: 4,
    content:
      "Affordable paintwork and denting service at RESERVE. They restored my car to perfection without draining my wallet. Exceptional quality and value for money!",
    name: "EMILY HUNT",
    image: "./Images/Users/girl5.webp",
  },
  {
    stars: 5,
    content:
      "Never thought I'd opt for valet parking, but RESERVE exceeded my expectations. From drop-off to pick-up, everything was smooth. Trustworthy and efficient team!",
    name: "RADHIKA JADHAV",
    image: "./Images/Users/girl3.jpg",
  },
  {
    stars: 4,
    content:
      "As someone who's cautious about leaving their car with others, RESERVE provided peace of mind. Professionalism and security were top-notch. Great experience overall!",
    name: "SHREYANKA PATIL",
    image: "./Images/Users/girl2.jpg",
  },
  {
    stars: 5,
    content:
      "RESERVE's valet parking service exceeded all my expectations. They made the entire process hassle-free, and I felt confident entrusting them with my vehicle. Impressed!",
    name: "PRIYA CHAUHAN",
    image: "./Images/Users/girl1.jpg",
  },
  {
    stars: 4,
    content:
      "Thanks to RESERVE, valet parking was a stress-free experience. Their professionalism and commitment to customer satisfaction shine through in every interaction. Highly satisfied!",
    name: "ROHAN RATHOD",
    image: "./Images/Users/boy1.jpg",
  },
];

let currentReviewIndex = 0;
const reviewContent = document.querySelector(".typed");
const reviewerImage = document.querySelector(".reviewer-image");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

function updateReview() {
  const currentReview = reviews[currentReviewIndex];
  reviewerImage.src = currentReview.image; // Update reviewer's image
  reviewContent.innerHTML = `
    <div>${"★".repeat(currentReview.stars)}${"☆".repeat(
    5 - currentReview.stars
  )}</div>
    <p>${currentReview.content}</p>
    <div class="name">${currentReview.name}</div>
  `;
}

prevButton.addEventListener("click", () => {
  currentReviewIndex =
    (currentReviewIndex - 1 + reviews.length) % reviews.length;
  updateReview();
});

nextButton.addEventListener("click", () => {
  currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
  updateReview();
});

// Initial update
updateReview();

function updateReview() {
  const currentReview = reviews[currentReviewIndex];
  reviewerImage.src = currentReview.image; // Update reviewer's image
  let starsHTML = "";
  for (let i = 0; i < currentReview.stars; i++) {
    starsHTML += '<img src="./Images/star-solid.svg" alt="Star" />';
  }
  for (let i = currentReview.stars; i < 5; i++) {
    starsHTML +=
      '<img src="./Images/star-half-stroke-regular.svg" alt="Star" />';
  }
  reviewContent.innerHTML = `
    <div class="star-rating">${starsHTML}</div>
    <p>${currentReview.content}</p>
    <div class="name">${currentReview.name}</div>
  `;
}
