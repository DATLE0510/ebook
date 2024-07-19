document.addEventListener("DOMContentLoaded", function () {
    const questions = [
      {
        question:
          "Người sở hữu cổ phiếu và trái phiếu đều được hưởng:",
        answers: [
          { text: "A. Lãi suất từ vốn mà mình đầu tư vào công ty ", correct: true },
          { text: "B. Lãi xuất cố định", correct: false },
          { text: "C. Thu nhập phụ thuộc vào hoạt động của công ty", correct: false },
          { text: "D. Được quyền bầu cử tại Đại hội cổ đông", correct: false },
        ],
      },
      {
        question:
          "Cổ phiếu quỹ là gì:",
        answers: [
          { text: "A. Được chia cổ tức", correct: false },
          { text: "B. Là loại cổ phiếu được mua lại và được tổ chức phát hành mua lại trên thị trường", correct: false },
          { text: "C. Là loại cổ phiếu được phát hành và được tổ chức phát hành mua lại trên thị trường", correct: true },
          { text: "D. Là một phần cổ phiếu chưa được phép phát hành", correct: false },
        ],
      },
      {
          question:
            "Đâu là thước đo lường tỷ lệ gia tăng doanh lợi qua từng năm?",
          answers: [
            { text: "A.	đà gia tốc tăng trưởng doanh lợi", correct: true },
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
  