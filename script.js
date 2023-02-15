"use strict"
$(document).ready(function () {
    // the elements are assigned here
    const el = document.querySelectorAll('.circle');
    const questionPage = document.querySelector('.question-text');
    const questionExample = document.querySelector('.example');
    const checkbox = document.querySelectorAll('.inputbox');
    const labels = document.querySelectorAll('label');

    let pageNum = 0;
    let comparePageNum = 1;
    let answerState = 0;// used to assign the corresponding color to the answer element

    let score = 0;

    let data = new Object;
    let question = new Object;
    let response = new Object


    // gets the json object and assign's it to data then calls pageload()
    async function request() {
        data = await fetch('listOfQuestions.json').then(response => response.json());
        pageload();
    }

    // check if the answer is right then assigns the corresponding bool value to the answerState.
    function getAnswer() {
        answerState = 0
        if (pageNum < 12) {
            let checkbox = $('.inputbox');
            let answer = data["question" + String(comparePageNum)][0]['answer'];

            //loops the checkbos array 
            for (let i = 0; i < checkbox.length; i++) {
                if (checkbox[i].checked) {// looks for the box that's checked then compares it to the answer from the data base.
                    if (checkbox[i].name == answer) {
                        answerState = 1;
                    }
                    else {
                        answerState = 0;
                    }
                }
            }

        }
    }

    // manages what/when Effects and text gets shown on the screen.
    function classesManager() {
        // checks to see if the page number is != to the length of the questioner
        if (pageNum <= el.length) {
            el[pageNum].classList.remove('active');// removes the active class to add it to the next element


            if (answerState === 1) {
                // if the answer is correct it adds the true element to the circle and turns them green. then increments the score by 1 point
                el[pageNum].classList.add("true");
                score++
            }
            else {
                // the true is also used to increment the progress bar so it increases it then adds red over the circle to show it was wrong.
                el[pageNum].classList.add("true");
                el[pageNum].classList.add('false');
            }


            pageNum++;
            comparePageNum++;
        }

        // if comparePageNum is = to the arrays length then the button's text gets change to next
        if (comparePageNum === el.length + 1) {
            document.querySelector('#next').innerHTML = "End";
            document.querySelector('#next').classList.add('end');
        }

        // this adds the active class to the next questions circle.
        if (pageNum != el.length) {
            el[pageNum].classList.add('active');
        }


        // checks if you've completed the quiz 
        if (comparePageNum == 13) {
            questionPage.innerHTML = `congrats on completing the quiz <br> <span>your score is : ${score}/${pageNum}</span>`
            const test = $('.checkbox').empty()
            console.log(`length ${el.length} \n page number ${pageNum} \n comparePageNum ${comparePageNum} \n score ${score}`);
        }
    }

    // after the classesManager this updates the page's progress bars line then reloads the page after its done.
    function update() {
        const actives = document.querySelectorAll('.true');
        const progress = document.getElementById('progress');
        progress.style.width = (actives.length - 1) / (el.length - 1) * 100 + "%";
        for (let i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = false
        }
        pageload();
    }

    // check to see if the questioner is at the not at the end then adds the question and answers to the page
    function pageload() {
        // questionPage.innerHTML 
        if (pageNum < 12) {
            questionPage.innerText = data["question" + String(comparePageNum)][0]["question"];

            if (data["question" + String(comparePageNum)][0]["example"] != undefined) {
                questionExample.innerText = data["question" + String(comparePageNum)][0]["example"];
            } else {
                questionExample.innerText = "";
            }

            labels.forEach(label => {
                label.innerText = data["question" + String(comparePageNum)][0][label.id];
            })
        }
    }

    // gets the data then loads the first page.
    request();

    const btn = document.querySelector('#next');
    btn.addEventListener("click", () => {
        getAnswer(); // Checks if the answers is correct.
        classesManager(); // responsible for managing the cool effects of the page
        update(); //updates the progress bars line then calls the pageload() to reload a now page
    })


})

// END