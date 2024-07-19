document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question:
        "Tài chính hành vi là gì?",
      answers: [
        { text: "A.	Một lĩnh vực nghiên cứu, tập trung vào việc làm rõ cách tâm lý có thể tác động và ảnh hưởng đến kết quả của thị trường tài chính", correct: true },
        { text: "B.	Thước đo khả năng sinh lợi của một công ty ", correct: false },
        { text: "C. Một lĩnh vực nghiên cứu, tập trung vào việc làm rõ cách tâm lý tác động và ảnh hưởng đến kết quả của thị trường nghiên cứu", correct: false },
        { text: "D. Thước đo lãi kinh doanh có sự thay đổi liên tục", correct: false },
      ],
    },
    {
      question:
        "Một trong những cổ phiếu tăng trưởng ưa thích của tác giả vào đầu năm 2007 là:",
      answers: [
        { text: "A. Imperial Oil", correct: false },
        { text: "B. DirecTV ", correct: true },
        { text: "C.	Conoco Phillips  ", correct: false },
        { text: "D. Suncor ", correct: false },
      ],
    },
    {
        question:
          "Cạm bẫy tiềm tàng trong việc điều chỉnh lại doanh lợi đầu tiên được nhắc đến là gì?",
        answers: [
          { text: "A. Giả mạo sổ sách kế toán", correct: true },
          { text: "B. Lạm phát", correct: false },
          { text: "C. Tham ô thuế ", correct: false },
          { text: "D. Vay vốn cao ", correct: false },
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
