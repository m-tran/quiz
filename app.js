$(document).ready(function () {
    // var question = $("#question");
    var $quizContainer = $("#quizContainer");
    var options = $("#choices");
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

    // var $quiz = $("<div>", {id="questions-tree"});

    var answers = [];
    var currentQuestion = [];
    var currentChoices = [];

    var questionNumber = 1;

    for(letter in questions[0].choices){
        currentChoices.push(
            `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${questions[0].choices[letter]}
            </label>`
        );
    }

    currentQuestion.push(
        `<div class="row col-sm-8 question mb-2">
            ${questions[0].question}
        </div>
        <div class="row col-sm-8 choices" style="display: inline;"> 
            ${currentChoices.join("<br>")}
        </div>`
    );

    // currentChoices.push(
    //     `<div class="choices"> ${currentChoices.join('')}</div>`
    // )

    console.log(currentChoices);

    $quizContainer.html(currentQuestion.join("<br>"));


    // $quizContainer.append($quiz);


});