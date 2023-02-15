$(document).ready(function () {
    // the elements are assigned here
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


    // gets the json object and assign's it to data then calls pageload()
    async function request() {
        data = await fetch('listOfQuestions.json').then(response => response.json());
        pageload();
    }

    function getAnswer() {
        randNum = 0
        if (pageNum < 12) {
            let checkbox = $('.inputbox');
            let answer = data["question" + String(comparePageNum)][0]['answer'];
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

    //
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

    // check to see if the questioner is at the not at the end then adds the question and answers to the page
    function pageload() {
        // questionPage.innerHTML 
        if (pageNum < 12) {
            questionPage.innerHTML = data["question" + String(comparePageNum)][0]["question"]
            labels.forEach(label => {
                label.innerText = data["question" + String(comparePageNum)][0][label.id]
            })
        }
    }

    // 
    function update() {
        const actives = document.querySelectorAll('.true');
        const progress = document.getElementById('progress');
        progress.style.width = (actives.length - 1) / (el.length - 1) * 100 + "%";
        for (let i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = false
        }
        pageload();
    }

    // Onstart this function is the first to run and start's the cycle.
    request();

    const btn = document.querySelector('#next');
    btn.addEventListener("click", () => {
        getAnswer(); // Checks if the answers is correct.
        removeActiveClasses(); // responsible for managing the cool effects of the page
        update();
    })


})