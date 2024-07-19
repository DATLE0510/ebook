document.addEventListener("DOMContentLoaded", function () {
    const questions = [
      {
        question:
          "Doanh số tăng gia tốc là gì?",
        answers: [
          { text: "A. dấu hiệu cầu chứng của hầu hết mọi cổ phiếu thắng lớn, ", correct: true },
          { text: "B. Đà tăng trưởng doanh lợi tiêu cực", correct: false },
          { text: "C. Lợi suất từ vốn kinh doanh không ổn định", correct: false },
          { text: "D. Lãi kinh doanh có sự thay đổi liên tục", correct: false },
        ],
      },
      {
        question:
          "Doanh thu tăng trưởng chậm chạp là gì:",
        answers: [
          { text: "A. Một trong những cách nhanh nhất để bị gạt ra khỏi danh mục đầu tư của chúng tôi", correct: true },
          { text: "B. Một trong những cách nhanh nhất để xem xét trong danh mục đầu tư của chúng tôi", correct: false },
          { text: "C. Một trong những cách chậm nhất để bị gạt ra khỏi danh mục đầu tư của chúng tôi", correct: false },
          { text: "D. Một trong những cách chậm nhất được đưa vào danh mục đầu tư của chúng tôi", correct: false },
        ],
      },
      {
          question:
            "Đâu là thước đo lường tỷ lệ gia tăng doanh lợi qua từng năm?",
          answers: [
            { text: "Đà gia tốc tăng trưởng doanh lợi", correct: true },
            { text: "B. tăng trưởng doanh lợi", correct: false },
            { text: "C. lợi suất trên vốn kinh doanh ", correct: false },
            { text: "D. tăng trưởng lãi kinh doanh", correct: false },
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
  