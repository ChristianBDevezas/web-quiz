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

// Elements from DOM
const quizContainer = document.getElementById('quiz');
const question = document.querySelector('.quiz__title');
const answers = document.querySelectorAll('.quiz__answer');
const items = document.querySelectorAll('.quiz__items ul li');
const itemA = document.getElementById('item-a');
const itemB = document.getElementById('item-b');
const itemC = document.getElementById('item-c');
const itemD = document.getElementById('item-d');
const submitButton = document.getElementById('submit');
const correctIcons = document.querySelectorAll('.quiz__items ul li i.fa-check');
const errorIcons = document.querySelectorAll('.quiz__items ul li i.fa-xmark');
let currentItem = 0;
let correctAnswers = 0;
let percentageCorrect = 0;

// Removes every checked item
const removeSelectedAnswer = () => {
    answers.forEach((answerItem) => answerItem.checked = false);
}

// Removes border of items
const removeBorderDisplay = () => {
    items.forEach((item) => {
        item.classList.remove('correct');
        item.classList.remove('error');
    });
}

// Hide Icons
const removeIconDisplay = () => {
    correctIcons.forEach((item) => item.style.display = 'none');
    errorIcons.forEach((item) => item.style.display = 'none');
}

const loadPage = () => {
    const currentObjectsData = objectsData[currentItem];

    question.innerText = currentObjectsData.question;
    itemA.innerText = currentObjectsData.a;
    itemB.innerText = currentObjectsData.b;
    itemC.innerText = currentObjectsData.c;
    itemD.innerText = currentObjectsData.d;

    removeSelectedAnswer();
    removeBorderDisplay();
    removeIconDisplay();
}

// This function is executed as soon as the page loads
loadPage();

// This function returns the option and index of selected item
const getSelectedItem = () => {
    let checkedAnswer;
    let checkedIndex;

    answers.forEach((answer, index) => {
        if(answer.checked) {
            checkedAnswer = answer.id;
            checkedIndex = index;
            console.log(checkedAnswer, checkedIndex);
        }
    });

    return [checkedAnswer, checkedIndex];
}

// Button event
submitButton.addEventListener('click', () => {
    const valuesFunction = getSelectedItem();
    const answerSelected = valuesFunction[0];
    const itemIndex = valuesFunction[1];

    // check if answer(item) has been selected
    if(!answerSelected) {
        swal({
            title: 'Item not chosen',
            text: 'Choose an option!',
            icon: 'error',
            button: 'OK'
        });
    }
    else if(answerSelected) {
        if(answerSelected === objectsData[currentItem].correct) {
            correctAnswers++;
            items[itemIndex].classList.add('correct');
            correctIcons[itemIndex].style.display = 'block';
        }
        if(answerSelected !== objectsData[currentItem].correct) {
            items[itemIndex].classList.add('error');
            errorIcons[itemIndex].style.display = 'block';
        }

        currentItem++;
        submitButton.disabled = true;
        percentageCorrect = Number(correctAnswers / objectsData.length) * 100;

        const displayResult = () => {
            if(correctAnswers == 0 || correctAnswers == 1 || correctAnswers == 2) {
                quizContainer.innerHTML = `
                <h2 class="quiz__result">Correct: ${percentageCorrect}% - Test Failed</h2>
                <button id="submit" onclick="location.reload()">Reload Page</button>
                `
            }
            else if(correctAnswers > 2) {
                quizContainer.innerHTML = `
                <h2 class="quiz__result">Correct: ${percentageCorrect}% - Test Succeeded</h2>
                <button id="submit" onclick="location.reload()">Reload Page</button>
                `
            }
            else if(correctAnswers == objectsData.length) {
                quizContainer.innerHTML = `
                <h2 class="quiz__result">Correct: ${percentageCorrect}% - Test Succeeded</h2>
                <button id="submit" onclick="location.reload()">Reload Page</button>
                `
            }
        }

        // next page will be loaded in 1 second
        setTimeout(() => {
            if(currentItem < objectsData.length) {
                loadPage();
                submitButton.disabled = false;
            }
            else {
                displayResult();
            }
        }, 1000);
    }
});