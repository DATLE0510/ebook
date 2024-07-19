document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question:
        "1 trong 8 thông số căn bản quan trọng - đã qua kiểm chứng - để đem lại thành tích giá cổ phiếu xuất sắc là:",
      answers: [
        { text: "A. Những điều chỉnh tích cực về doanh lợi, ", correct: true },
        { text: "B. Đà tăng trưởng doanh lợi tiêu cực", correct: false },
        { text: "C. Lợi suất từ vốn kinh doanh không ổn định", correct: false },
        { text: "D. Lãi kinh doanh có sự thay đổi liên tục", correct: false },
      ],
    },
    {
      question:
        "Thước đo khả năng sinh lợi của một công ty, được tính bằng cách chia doanh lợi trên mỗi cổ phần cho vốn kinh doanh (theo giá trị sổ sách) trên mỗi cổ phần là gì:",
      answers: [
        { text: "A. tăng trưởng doanh lợi", correct: false },
        { text: "B. đà gia tốc tăng trưởng doanh lợi", correct: false },
        { text: "C. lợi suất trên vốn kinh doanh ", correct: true },
        { text: "D. tăng trưởng lãi kinh doanh", correct: false },
      ],
    },
    {
      question:
        "Đâu là thước đo lường tỷ lệ gia tăng doanh lợi qua từng năm?",
      answers: [
        { text: "A. đà gia tốc tăng trưởng doanh lợi", correct: true },
        { text: "B. tăng trưởng doanh lợi", correct: false },
        { text: "C. lợi suất trên vốn kinh doanh ", correct: false },
        { text: "D. tăng trưởng lãi kinh doanh", correct: false },
      ],
    },
    // Thêm nhiều câu hỏi khác ở đây
  ];

  let currentQuestionIndex = 0;
  let correctAnswersCount = 0;

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
      correctAnswersCount++;
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
      resultMessage.innerText =
        "Bạn đã hoàn thành bài trắc nghiệm! Số câu trả lời đúng: " + correctAnswersCount + "/" + questions.length;
      resultMessage.classList.add("text-success");
      resultMessage.classList.remove("text-danger");
      document.getElementById("nextQuestionBtn").style.display = "none";
    }
  };

  showQuestion(questions[currentQuestionIndex]);
});
