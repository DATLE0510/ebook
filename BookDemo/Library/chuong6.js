document.addEventListener("DOMContentLoaded", function () {
    const questions = [
      {
        question:
          "Hệ số beta là gì?",
        answers: [
          { text: "A. Là thước đo rủi ro/ lợi ích kỳ vọng đầu tiên để tôi xem xét ", correct: true },
          { text: "B. Đà tăng trưởng doanh lợi tiêu cực", correct: false },
          { text: "C. Lợi suất từ vốn kinh doanh không ổn định", correct: false },
          { text: "D. Lãi kinh doanh có sự thay đổi liên tục", correct: false },
        ],
      },
      {
        question:
          "Rủi ro không mang tính chất hệ thống là loại rủi ro nào sau đây:",
        answers: [
          { text: "A. rủi ro mang tính chất tình cờ, ngẫu nhiên, không tương liên với thị trường chứng khoán nói chung", correct: true },
          { text: "B. Rủi ro mang tính chất tình cờ", correct: false },
          { text: "C. Rủi ro mang tính chất ngẫu nhiên, không tương liên với thị trường", correct: false },
          { text: "D. Tăng trưởng lãi kinh doanh", correct: false },
        ],
      },
      {
          question:
            "Lý do nào sau đây đúng với bán khống với chứng khoán?",
          answers: [
            { text: "A.	Ngăn chặn sự thua lỗ", correct: true },
            { text: "B. Hưởng lợi từ việc sụt giá chứng khoán", correct: false },
            { text: "C. Hưởng lợi từ việc tăng giá chứng khoán", correct: false },
            { text: "D. Hạn chế rủi ro", correct: false },
          ],
        },
    ];
  
    let currentQuestionIndex = 0;
  
    const questionContainer = document.getElementById("question-container");
    const questionElement = document.getElementById("question");
    const answersContainer = document.getElementById("answers");
    const resultContainer = document.getElementById("result-container");
    const resultMessage = document.getElementById("result-message");
  
    function showQuestion(question) {
      questionElement.innerText = question.question;
      answersContainer.innerHTML = "";
      question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn", "btn-light", "answer");
        button.addEventListener("click", () => selectAnswer(answer));
        answersContainer.appendChild(button);
      });
    }
  
    function selectAnswer(answer) {
      if (answer.correct) {
        resultMessage.innerText = "Chúc mừng! Bạn đã trả lời đúng.";
        resultMessage.classList.add("text-success");
        resultMessage.classList.remove("text-danger");
      } else {
        resultMessage.innerText =
          "Sai rồi. Đáp án đúng là: " + getCorrectAnswer().text;
        resultMessage.classList.add("text-danger");
        resultMessage.classList.remove("text-success");
      }
      questionContainer.style.display = "none";
      resultContainer.style.display = "block";
    }
  
    function getCorrectAnswer() {
      return questions[currentQuestionIndex].answers.find(
        (answer) => answer.correct
      );
    }
  
    window.loadNextQuestion = function () {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        questionContainer.style.display = "block";
        resultContainer.style.display = "none";
        showQuestion(questions[currentQuestionIndex]);
      } else {
        resultMessage.innerText = "Bạn đã hoàn thành bài trắc nghiệm!";
        resultMessage.classList.add("text-success");
        resultMessage.classList.remove("text-danger");
        document.getElementById("nextQuestionBtn").style.display = "none";
      }
    };
  
    showQuestion(questions[currentQuestionIndex]);
  });
  