let counter = document.querySelector(".count span");
let questionText = document.querySelector(".quiz-area h2");
let choicesArea = document.querySelector(".choices");
let category = document.querySelector(".category span");
let result = document.querySelector(".result");
let rank = document.querySelector(".rank");
let btn = document.querySelector(".submit-answer");
let bar = document.querySelector(".progress-bar");

getQuestions();

function getQuestions() {
	let nb = randInt(5, 10);
	let apiLink = `https://opentdb.com/api.php?amount=${nb}&category=9&type=multiple`;
	fetch(apiLink)
		.then((response) => response.json())
		.then((response) => update(response.results))
		.catch((err) => console.error(err));
}

function update(questions) {
	let correct = 0;
	let i = 0; // number of questions

	// update HTML content
	counter.textContent = questions.length;
	category.textContent = questions[0].category;
	questionText.innerHTML = questions[0].question;

	createChoices(questions[i]);

	btn.onclick = function () {
		let selected = document.querySelector(".selected");
		if (i < questions.length - 1 && document.querySelector(".working")) {
			btn.classList.remove("working");

			i++;
			let correctAns = questions[i - 1].correct_answer;
			correct += +(selected.textContent == correctAns);

			questionText.innerHTML = questions[i].question;

			createChoices(questions[i]);
			let progress = (i * 100) / questions.length;
			bar.style.width = `${progress}%`; // some math!
		} else if (i >= questions.length - 1) {
			let correctAns = questions[i].correct_answer;
			correct += +(selected.textContent == correctAns);

			rank.textContent = getRank(correct, questions.length, true);
			rank.classList.add(getRank(correct, questions.length));

			document.querySelector(".correct").textContent = correct;
			document.querySelector(".nb-qs").textContent = questions.length;
			result.style.display = "block";
			btn.classList.remove("working");
			bar.style.width = `${((i + 1) * 100) / questions.length}%`;
		}
	};
}

function createChoices(choices) {
	while (document.querySelectorAll(".choices li").length > 0) {
		document.querySelector(".choices li").remove();
	}

	let incorrectAnswers = choices.incorrect_answers;
	let correctAnswer = choices.correct_answer;
	let answers = [correctAnswer, ...incorrectAnswers];
	answers = shuffle(answers);
	createAnswers(answers);
}

function createAnswers(arr) {
	for (let i = 0; i < arr.length; i++) {
		let listItem = document.createElement("li");
		let content = document.createTextNode(arr[i]);
		listItem.appendChild(content);
		choicesArea.appendChild(listItem);

		listItem.onclick = function () {
			document.querySelectorAll(".choices li").forEach((li) => {
				return li.classList.remove("selected");
			});
			listItem.classList.add("selected");
			btn.classList.add("working");
		};
	}
}
