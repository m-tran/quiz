$(document).ready(function () {

    var startBtn = $("#startBtn");
    var $quizContainer = $("#quizContainer");
    var nextBtn = $("#nextBtn");
    var submitBtn = $("#submitBtn");

    nextBtn.hide();
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

    if (localStorage.getItem('scoreboard') === null) {
        var highScore = [];
    } else {
        var highScore = JSON.parse(localStorage.getItem('scoreboard'));
        console.log(highScore);
    }


    var leaderBoard = {
        addScore: function (name, score) {
            highScore.push([name, score]);

            highScore.sort(function (a, b) {
                return a[1] > b[1];
            });

            if (highScore.length > 5) {
                highScore = highScore.splice(0, 5);
            }
        },

        saveScores: function () {
            localStorage.setItem('scoreboard', JSON.stringify(highScore));
        },
    }

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

    function sum(arr) {
        var i = 0;

        for (var index = 0; index < arr.length; index++) {
            i += arr[index];
        }

        return i;
    }

    var i = 0;

    function initQuiz() {
        var initState = [];
        initState.push(`
        <div class="row col-sm-8 question mb-2">
            Click the start button to begin.
        </div>
        `);
        $quizContainer.html(initState);
    }

    initQuiz();
    startBtn.on("click", function () {
        createQuestion(questions[i]);
        nextBtn.show();
        startBtn.hide();

        count = 75;
        timer = setInterval(function () {
            $("#timer").html(`Time remaining: ${count}`);
            count--;
            if (count === 0) {
                stopInterval();
                $("#timer").html("");
                clearInterval(timer);
                $quizContainer.html("");
                $(".button").html("");
                numbers = localStorage.getItem("submit").split(',');
                // console.log(typeof numbers);
                for (let i = 0; i < numbers.length; i++) {
                    scores.push(characters[numbers[i]]);
                }
                $quizContainer.append(
                    `<form>
                    <p>Your final score is: ${sum(scores)}</p>
                    <label for="initials">Please enter initials</label><br>
                    <input type="text" id="initials" name="name">
                    <input id="submitBtn" class="mt-4 button" type="submit" value="Submit">
                </form>`
                );
            }
        }, 1000);

        var stopInterval = function () {
            $("#timer").html('time is up!');
            clearInterval(timer);
        }
    })



    var scores = [];
    var penalty = 0;
    var highScore;

    nextBtn.on("click", function () {
        console.log(questions[i].answer);
        var answerVal = $(`input[name="${questionNumber}"]:checked`, '.choices').val();
        if (answerVal != questions[i].answer) {
            count = count - 5;
            penalty = penalty + 1;
        }
        answers.push(answerVal);
        localStorage.setItem("submit", answers);
        if (i > (questions.length - 2)) {
            $("#timer").html("");
            clearInterval(timer);
            $quizContainer.html("");
            $(".button").html("");
            numbers = localStorage.getItem("submit").split(',');
            // console.log(typeof numbers);
            for (let i = 0; i < numbers.length; i++) {
                scores.push(characters[numbers[i]]);
            }
            $quizContainer.append(
                `<form>
                <p>Your final score is: ${sum(scores) - penalty}</p>
                <label for="initials">Please enter initials</label><br>
                <input type="text" id="initials" name="name">
                <input id="submitBtn" class="mt-4 button" type="submit" value="Submit">
            </form>`
            );
        } else {
            i++;
            createQuestion(questions[i]);
        }
    });

    $quizContainer.on("click", "input#submitBtn", function (e) {
        e.preventDefault();
        leaderBoard.addScore($(`input[name="name"]`).val(), sum(scores));
        leaderBoard.saveScores();
        $quizContainer.html("");

        for (i = 0; i < highScore.length; i++) {
            $('<div class="row col-sm-8" />').html(highScore[i][0] + " - " + highScore[i][1]).appendTo($quizContainer);
        }

    });

});