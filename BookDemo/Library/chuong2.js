document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question:
        "Ðồng hồ sử dụng tài sản chỉ ra:",
      answers: [
        { text: "A.	Việc tập trung vào các tài sản có vẻ cân bằng trong suốt những giai đoạn tăng trưởng kinh tế và có lạm phát từ thấp đến vừa là một ý tưởng tốt ", correct: true },
        { text: "B.	Lợi suất từ vốn kinh doanh không ổn định", correct: false },
        { text: "c. Lãi kinh doanh có sự thay đổi liên tục", correct: false },
      ],
    },
    {
      question:
        "Các trái phiếu Kho bạc Mỹ:",
      answers: [
        { text: "A. Là loại tài sản chỉ theo những kỳ hạn chung của Kho bạc Mỹ ", correct: false },
        { text: "B. Là loại tài sản chỉ theo những kỳ hạn dài của Kho bạc Mỹ ", correct: false },
        { text: "C.	Là loại tài sản chỉ theo những kỳ hạn riêng của Kho bạc Mỹ ", correct: true },
        { text: "D.	Là loại tài sản chỉ theo những kỳ hạn ngắn của Kho bạc Mỹ ", correct: false },
      ],
    },
    {
        question:
          "Sử dụng tài sản vững chắc phải phục vụ cho điều gì?",
        answers: [
          { text: "A. Nhu cầu của bạn, bảo vệ bạn khỏi các yếu tố tăng giá trị theo thời gian, và không khiến bạn mất quá nhiều chi phí tài chính hoặc nhức đầu kéo dài.", correct: true },
          { text: "B. tăng trưởng doanh lợi", correct: false },
          { text: "C. lợi suất trên vốn kinh doanh ", correct: false },
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
