$(document).ready(function () {
    
    var $quizContainer = $("#quizContainer");
    var submitBtn = $("#submitBtn");

    // create an array of question objects
    var questions = [
        {
            question: "Who made the movie Parasite?",
            choices: {
                a: "Wes Anderson",
                b: "Bong Joon Ho",
                c: "Quentin Tarantino",
                d: "Park Chan Wook"
            },
            answer: "b"
        },
        {
            question: "What meme is this confused anime guy and his butterfly called?",
            choices: {
                a: "Is this a [insert word]?",
                b: "This is fine.",
                c: "If you can't handle me at X, you don't deserve me at Y",
                d: "Things that are expensive"
            }
        }
    ];

    var characters = {
        'a': 2,
        'b': 3,
        'c': 4,
        'd': 7
    }

    var answers = [];

    var questionNumber = 1;

    function createQuestion(questionIndex) {
        var currentQuestion = [];
        var currentChoices = [];

        for (letter in questionIndex.choices) {
            currentChoices.push(
                `<label>
                    <input type="radio" name="${questionNumber}" value="${letter}">
                    ${letter} :
                    ${questionIndex.choices[letter]}
                </label>`
            );
        }
        currentQuestion.push(
            `<div class="row col-sm-8 question mb-2">
                ${questionIndex.question}
            </div>
            <form class="row col-sm-8 choices" style="display: inline;"> 
                ${currentChoices.join("<br>")}
            </form>`
        );
        $quizContainer.html(currentQuestion.join("<br>"));
    }

    $('.choices input').on('change', function() {
        console.log($(`input[name="${questionNumber}"]:checked`, '.choices').val());
    });

    function sum(arr) {
        var i = 0;
    
        for (var index = 0; index < arr.length; index++) {
            i += arr[index];
        }
    
        return i;
    }

    var i=0;

    createQuestion(questions[i]);

    var scores = [];
    var highScore;

    submitBtn.on("click", function() {
        console.log(i);
        answers.push($(`input[name="${questionNumber}"]:checked`, '.choices').val());
        localStorage.setItem("submit", answers);
        if (i>(questions.length - 2)) {
            $quizContainer.html(""); 
            $(".button").html(""); 
            numbers = localStorage.getItem("submit").split(',');
            console.log(typeof numbers);
            for (let i=0; i<numbers.length; i++) {
                scores.push(characters[numbers[i]]);
            }
            localStorage.setItem("high score", sum(scores));
            highScore = localStorage.getItem("high score");
            $quizContainer.html(highScore);
            console.log(sum(scores));
        } else {
            createQuestion(questions[i]);
            i++;
        }
    });

});