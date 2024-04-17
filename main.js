let numberofquistions = document.querySelector('.count span');
let bulltesspan = document.querySelector('.bullets .spans');
let bulltes = document.querySelector('.bullets');
let quesarea = document.querySelector('.quiz-area');
let answersarea = document.querySelector('.answers-area');
let submitbutton = document.querySelector('.submit-button');
let results = document.querySelector('.results');
let count = document.querySelector('.cuntdown');

let countquis = 0;
let rightanswerAll = 0;
let countdownstop;

getquestion();

function getquestion(){
    fetch('questions.json')
    .then((ques) => ques.json())
    .then((ques) => {
        createbullets(ques.length);
        addquestions(ques[countquis], ques.length);
        countdown(30, ques.length);
        subutton(ques, ques.length);
    })
}

function createbullets(num){
    numberofquistions.innerHTML = num;
    for(let i = 0; i < num; i++){
        let createspan = document.createElement('span');
        if(i === 0) createspan.className = 'on';
        bulltesspan.appendChild(createspan);
    }
}

function subutton(question, numques){
    submitbutton.onclick = () => {
        if(countquis < numques){
            let rightanswer = question[countquis].right_answer;
            checkanswer(rightanswer);

            countquis++;
            
            quesarea.innerHTML = '';
            answersarea.innerHTML = '';
            addquestions(question[countquis], numques);

            handlebullets(countquis);

            clearInterval(countdownstop);
            countdown(30, numques);
        }
        if(countquis === numques){
            showresults(numques)
        }
    }
}

function checkanswer(ranswer) {
    let answer = document.getElementsByName('quis');
    let chooseanswer;
    for(let i = 0; i < 4; i++){
        if(answer[i].checked){
            chooseanswer = answer[i].dataset.answer;
        }
    }
    if(chooseanswer === ranswer) rightanswerAll++;
}

function addquestions(question, numques){
    if(countquis < numques){
        let quesareah2 = document.createElement('h2');
        quesareah2.innerHTML = question['title'];
        quesarea.appendChild(quesareah2);
        for(let i = 1; i <= 4; i++){
            let answer = document.createElement('div');
            answer.classList.add("answer");

            let radioinput = document.createElement('input');
            radioinput.type = "radio";
            radioinput.id = `answer_${i}`;
            radioinput.name = "quis";
            if(i === 1) radioinput.checked = true;
            radioinput.dataset.answer = question[`Answer_${i}`];
        
            let label = document.createElement('label');
            label.htmlFor = `answer_${i}`;
            label.innerHTML = question[`Answer_${i}`];

            answer.appendChild(radioinput);
            answer.appendChild(label);
            answersarea.appendChild(answer);
        }
    }
    
}

function handlebullets(countquis) {
    let checkspan = document.querySelectorAll('.bullets .spans span');
    for(let i = 0; i < checkspan.length; i++){
        checkspan[i].className = '';
        if(i === countquis) checkspan[i].className = 'on';
    }
}

function showresults(numques) {
    quesarea.remove();
    answersarea.remove();
    submitbutton.remove();
    bulltes.remove();
    results.innerHTML = `You Have <span class='moz'>${rightanswerAll}</span> Correct Answers From <span class='moz'>${numques}</span>`;
    results.style.display = 'block';
}

function countdown(duration, numques){
    if(countquis < numques){
        let minute, second;
        countdownstop = setInterval(() => {
            minute = parseInt(duration / 60);
            second = parseInt(duration % 60);
            minute = minute < 10 ? `0${minute}` : minute;
            second = second < 10 ? `0${second}` : second;
            count.innerHTML = `${minute}:${second}`;
            if(--duration < 0) {
                clearInterval(countdownstop);
                submitbutton.click();
            }
        }, 1000);
    }
}