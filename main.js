let qeustionsCount = document.querySelector(".count span")
let category = document.querySelector(".category span")
let bar = document.querySelector(".progress-bar")
let questionText = document.querySelector(".quiz-area h2")
let choicesArea = document.querySelector(".choices")
let btn = document.querySelector(".submit-answer")
let result = document.querySelector(".result")



getQuestions()

function getQuestions() {
  let number = randInt(5, 12)
  let apiLink = `https://opentdb.com/api.php?amount=${number}&category=9&type=multiple`
  fetch(apiLink)
  .then(response => response.json())
  .then(response => {
    console.log(response)
    update(response)
  })
  .catch(err => console.error(err))
}

function update(questions) {
  let correct = 0;
    let QuestionNumber = 0
  questions = questions.results
  qeustionsCount.textContent = questions.length
  category.textContent = questions[0].category.split(" ")[0]
  bar.style.width =  `${0 * 100 / questions.length}%`
  questionText.innerHTML = questions[0].question
  // <!-- <li id="choice-1">James Bond</li> -->
  createChoices(questions[QuestionNumber])

  btn.onclick = function() {
    if (QuestionNumber < questions.length-1  && document.querySelector(".working")) {
      btn.classList.remove("working")
      if(questions[QuestionNumber].correct_answer == document.querySelector(".selected").textContent) {
        correct++
      }
      QuestionNumber++
      questionText.innerHTML = questions[QuestionNumber].question
      createChoices(questions[QuestionNumber])
      bar.style.width =  `${(QuestionNumber + 1) * 100 / questions.length}%`
    } else {
      document.querySelector(".rank").textContent = correct == questions.length ? "Perfect!" : correct > questions.length/2 ? "Good, " : "bad, "
      document.querySelector(".rank").classList.add(correct == questions.length ? "perfect" : correct > questions.length/2 ? "good" : "bad")
      document.querySelector(".correct").textContent = correct
      document.querySelector(".nb-qs").textContent = questions.length

      result.style.display = "block"

      btn.classList.remove("working")
    }
  }
}

function createChoices(choices) {
  while (document.querySelectorAll(".choices li").length > 0) {
    document.querySelector(".choices li").remove()
  }

  let incorrectAnswers = choices.incorrect_answers
  let correctAnswer = choices.correct_answer
  let answers = [correctAnswer, ...incorrectAnswers]
  answers = shuffle(answers)
  createAnswers(answers)
}

function createAnswers(arr) {

  for(let i = 0; i < arr.length; i++) {
    let listItem = document.createElement("li")
    let content = document.createTextNode(arr[i])
    listItem.appendChild(content)
    choicesArea.appendChild(listItem)

    listItem.onclick = function() {
      document.querySelectorAll(".choices li").forEach(li => {
        return li.classList.remove("selected")
      });
      listItem.classList.add("selected")
      btn.classList.add("working")
    }
  }


}

function shuffle(arr) {
  let shuffled = []
  while (arr.length > 0) {
    let r = randInt(0, arr.length)
    shuffled.push(arr[r])
    arr = arr.filter((_, i) => i !=
     r)
  }
  return shuffled
}



function randInt(a, b) {
  return a + Math.floor(Math.random(b - a) * (b - a))
}
