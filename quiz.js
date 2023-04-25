const quizContainer = document.getElementById('quiz');
const question = document.querySelector('.quiz__title');
const answers = document.querySelectorAll('.quiz__answer');
const itemA = document.getElementById('item-a');
const itemB = document.getElementById('item-b');
const itemC = document.getElementById('item-c');
const itemD = document.getElementById('item-d');
const submitButton = document.getElementById('submit');
let currentItem = 0;
let correctAnswers = 0;

// Array of Objects
const objectsData = [
    {
        question: "Which language is used for Back-end?",
        a: "XTML",
        b: "SASS",
        c: "PHP",
        d: "CSS",
        correct: "c",
    },
    {
        question: "Which language is used for Front-end?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What is SASS language?",
        a: "Preprocessor scripting language compiled into CSS",
        b: "Language that makes the application faster",
        c: "Hypertext MarkUp Language",
        d: "Software that allows applications to talk to each other",
        correct: "a",
    },
    {
        question: "Which is a code hosting platform for version control?",
        a: "HTML",
        b: "GitHub",
        c: "Firefox",
        d: "Stack Overflow",
        correct: "b",
    },
];

// This function removes every checked item
const removeSelectedAnswer = () => {
    answers.forEach((answerItem) => answerItem.checked = false);
}

const loadPage = () => {
    const currentObjectsData = objectsData[currentItem];

    question.innerText = currentObjectsData.question;
    itemA.innerText = currentObjectsData.a;
    itemB.innerText = currentObjectsData.b;
    itemC.innerText = currentObjectsData.c;
    itemD.innerText = currentObjectsData.d;

    removeSelectedAnswer();
}

// This function is executed as soon as the page loads
loadPage();

// This function returns the option selected by the user
const getSelectedItem = () => {
    let checkedAnswer;

    answers.forEach((answer) => {
        if(answer.checked) {
            checkedAnswer = answer.id;
            console.log(checkedAnswer);
        }
    });

    return checkedAnswer;
}

submitButton.addEventListener('click', () => {
    const answerSelected = getSelectedItem();

    // check if answer has not been selected
    if(!answerSelected) {
        swal({
            title: 'Item not chosen',
            text: 'Choose an option!',
            icon: 'error',
            // confirmButtonText: 'OK'
            //switched to "button" because "confirmButtonText" has been deprecated
            button: 'OK'
        });
    }
    else if(answerSelected) {
        if(answerSelected === objectsData[currentItem].correct) {
            correctAnswers++;
        }

        currentItem++;

        if(currentItem < objectsData.length) {
            loadPage();
        }
        else {
            if(correctAnswers == 0) {
                quizContainer.innerHTML = `
                <h2 class="quiz__title">You answered all questions incorrectly!</h2>
                <button id="submit" onclick="location.reload()">Reload Page</button>
                `
            }
            else if(correctAnswers == 1) {
                quizContainer.innerHTML = `
                <h2 class="quiz__title">You answered ${correctAnswers} question correctly out of ${objectsData.length}!</h2>
                <button id="submit" onclick="location.reload()">Reload Page</button>
                `
            }
            else if(correctAnswers == objectsData.length) {
                quizContainer.innerHTML = `
                <h2 class="quiz__title">You answered all ${objectsData.length} questions correctly! Congrats!</h2>
                <button id="submit" onclick="location.reload()">Reload Page</button>
                `
            }
            else {
                quizContainer.innerHTML = `
                <h2 class="quiz__title">You answered ${correctAnswers} questions correctly out of ${objectsData.length}!</h2>
                <button id="submit" onclick="location.reload()">Reload Page</button>
                `
            }
        }
    }
});