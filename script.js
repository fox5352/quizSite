$(document).ready(function () {
    "use strict";
    const el = document.querySelectorAll('.circle');
    const questionPage = document.querySelector('.Question');
    const checkbox = document.querySelectorAll('.inputbox')
    const labels = document.querySelectorAll('label')

    let pageNum = 0;
    let comparePageNum = 1;
    let randNum = 0;

    let score = 0;

    let data = new Object;
    let question = new Object;
    let response = new Object


    async function request() {
        data = await fetch('listOfQuestions.json').then(response => response.json());
        pageload();
    }

    function getAnswer() {
        randNum = 0
        if (pageNum < 12) {
            let checkbox = $('.inputbox');
            let answer = data["qestion" + String(comparePageNum)][0]['answer'];
            for (let i = 0; i < checkbox.length; i++) {
                if (checkbox[i].checked) {
                    if (checkbox[i].name == answer) {
                        randNum = 1;
                    }
                    else {
                        randNum = 0;
                    }
                }
            }

        }
    }

    function removeActiveClasses() {
        if (comparePageNum === 12) {
            questionPage.innerHTML = `congrats on completing the quiz <br> <span>your score is : ${score}/${pageNum}</span>`
            const test = $('.checkbox').empty()
        }
        if (pageNum != el.length) {
            el[pageNum].classList.remove('active');

            if (randNum === 1) {
                el[pageNum].classList.add("true");
                score++
            }
            else {
                el[pageNum].classList.add("true");
                el[pageNum].classList.add('false');
            }
            pageNum++;
            comparePageNum++;
        }
        if (comparePageNum === el.length) {
            document.querySelector('#next').innerHTML = "End";
        }
        if (pageNum != el.length) {
            el[pageNum].classList.add('active');
        }
    }

    function pageload() {
        // questionPage.innerHTML 
        if (pageNum < 12) {
            questionPage.innerHTML = data["qestion" + String(comparePageNum)][0]["qestion"]
            labels.forEach(label => {
                label.innerText = data["qestion" + String(comparePageNum)][0][label.id]
            })
        }
    }

    function update() {
        const actives = document.querySelectorAll('.true');
        const progress = document.getElementById('progress');
        progress.style.width = (actives.length - 1) / (el.length - 1) * 100 + "%";
        for (let i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = false
        }
        pageload();
    }

    request();

    const btn = document.querySelector('#next');
    btn.addEventListener("click", () => {
        getAnswer();
        removeActiveClasses();
        update();
    })


})