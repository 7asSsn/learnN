// Lesson navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  // Handle lesson menu navigation
  const lessonMenu = document.getElementById("lessonMenu");
  if (lessonMenu) {
    lessonMenu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        e.preventDefault();

        // Update active menu item
        document.querySelectorAll(".lesson-menu a").forEach((link) => {
          link.classList.remove("active");
        });
        e.target.classList.add("active");

        // Show the corresponding section
        const topic = e.target.getAttribute("data-topic");
        document.querySelectorAll(".lesson-section").forEach((section) => {
          section.classList.remove("active");
        });
        document.getElementById(topic).classList.add("active");
      }
    });
  }

  // Handle quiz functionality
  const quizContainer = document.getElementById("quizContainer");
  const resultContainer = document.getElementById("resultContainer");
  const submitBtn = document.getElementById("submitQuiz");

  if (submitBtn) {
    // Handle option selection
    document.querySelectorAll(".quiz-option").forEach((option) => {
      option.addEventListener("click", function () {
        const question = this.getAttribute("data-question");

        // Remove selection from other options for this question
        document
          .querySelectorAll(`[data-question="${question}"]`)
          .forEach((opt) => {
            opt.classList.remove("selected");
          });

        // Select this option
        this.classList.add("selected");
      });
    });

    // Handle quiz submission
    submitBtn.addEventListener("click", function () {
      // Get all selected answers
      const selectedAnswers = {};
      document.querySelectorAll(".quiz-option.selected").forEach((option) => {
        const question = option.getAttribute("data-question");
        const answer = option.getAttribute("data-answer");
        selectedAnswers[question] = answer;
      });

      // Correct answers
      const correctAnswers = {
        q1: "a",
        q2: "b",
        q3: "c",
        q4: "b",
        q5: "c",
        q6: "b",
        q7: "b",
        q8: "b",
        q9: "a",
        q10: "c",
        q11: "c",
        q12: "a",
        q13: "a",
        q14: "b",
        q15: "b",
      };

      // Calculate score
      let score = 0;
      let totalQuestions = Object.keys(correctAnswers).length;

      for (const question in correctAnswers) {
        if (selectedAnswers[question] === correctAnswers[question]) {
          score++;
        }
      }

      // Display results
      const scoreDisplay = document.getElementById("scoreDisplay");
      const messageDisplay = document.getElementById("messageDisplay");

      scoreDisplay.textContent = `${score}/${totalQuestions}`;

      // Set message based on score
      if (score === totalQuestions) {
        messageDisplay.textContent = "Perfect score! You're a Nim expert!";
      } else if (score >= totalQuestions * 0.8) {
        messageDisplay.textContent =
          "Excellent work! You have a strong grasp of Nim!";
      } else if (score >= totalQuestions * 0.6) {
        messageDisplay.textContent =
          "Good job! You understand the basics of Nim.";
      } else {
        messageDisplay.textContent =
          "Keep studying! Review the lessons to improve your Nim knowledge.";
      }

      // Show result container
      quizContainer.style.display = "none";
      resultContainer.classList.add("show");
    });
  }
});
