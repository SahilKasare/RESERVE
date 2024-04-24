document.addEventListener("DOMContentLoaded", function() {
    const questions = document.querySelectorAll(".question");
  
    questions.forEach(question => {
      question.addEventListener("click", function() {
        // Toggle the class to show/hide the answer
        this.nextElementSibling.classList.toggle("show-answer");
      });
    });
  });
  