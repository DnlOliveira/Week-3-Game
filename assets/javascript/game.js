$(document).ready(function() {

        // Creates keyboard on page
        var letters = ["Q", "W", "E", "R", "T", "Y", 
        "U", "I", "O", "P", "A", "S", "D", "F", "G", 
        "H", "J", "K", "L", "Z", "X", "C", "V", "B", 
        "N", "M"];

        for (var i = 0; i < letters.length; i++){
            var letterButton = $("<button>");
            letterButton.text(letters[i]);
            letterButton.addClass("letter-button");
            $("#keyboard").append(letterButton);
        }
// ------------------------------------------------------- //
        // Array of words to be guessed
        var words = ["SOCCER", "BASKETBALL", "FOOTBALL"];

        // Variables
        var wins = 0;
        var losses = 0;
// ------------------------------------------------------- //
        // Object holding current game information
        var hangMan = {
            alreadyGuessed: [], //holds all letters guessed
            currentProgress: [], //holds current status of word
            currentWord: [],
            hiddenWord: "", //hold current word
            guesses: 5, //initial guesses
            repeat: false,
            endGame: false,
            repeatedEntry: false,

            newWord: function(){
                this.currentProgress = [];
                this.currentWord = [];
                this.alreadyGuessed = [];
                $("#lettersGuessed").empty();

                this.hiddenWord = words[Math.floor(Math.random() * words.length)];
                console.log(this.hiddenWord);

                for (var i = 0; i < this.hiddenWord.length; i++){
                    this.currentProgress.push("_ ");
                    var char = this.hiddenWord.charAt(i);
                    this.currentWord.push(char);
                }

                $("#hiddenWord").html(this.currentProgress);
                
                this.guesses = 5;

                $("#guesses").html("<br>Guesses Left: " + this.guesses);
                $("#wins").html("<br>Wins: " + wins);
                $("#losses").html("<br>Losses: " + losses);
            },
            checkWord: function(x){
                for (i = 0; i < this.hiddenWord.length; i++){
                    if (x === this.hiddenWord.charAt(i) && this.currentProgress[i] === "_ "){
                        this.currentProgress[i] = x;
                    }
                    else{
                        
                    }

                    if (x === this.currentWord[i]){
                        this.repeat = true;
                    }
                }

                if (this.repeat === false){
                    this.guesses--;
                }
                else{
                    this.repeat = false;
                }

                $("#guesses").empty();
                $("#guesses").append("Guesses Left: " + this.guesses);

                $("#hiddenWord").empty();
                for (i = 0; i < this.currentProgress.length; i++){
                    $("#hiddenWord").append(this.currentProgress[i]);
                }
            },
            checkLettersGuessed: function (x){
                var entry = x;

                for (i = 0; i < this.alreadyGuessed.length; i++){
                    if (entry === this.alreadyGuessed[i]){
                        this.repeatedEntry = true;
                    }
                }

                if (this.repeatedEntry === false){
                    this.alreadyGuessed.push(x);
                    $("#lettersGuessed").append(x);
                }

                this.repeatedEntry = false;
            },
            checkEndGame: function(){
                if (this.guesses === 0){
                    this.endGame = true;
                    alert("YOU LOSE!");
                    losses++;
                    $("#losses").empty();
                    this.newWord();
                }
                else{
                    for (var i = 0; i < this.currentProgress.length; i++) {
                        if (this.currentProgress[i] === "_ "){
                            this.endGame = true;
                        }
                    }
                }

                if (this.endGame === false){
                    alert("YOU WIN");
                    wins++;
                    $("#wins").empty();
                    this.newWord();
                }

                this.endGame = false;
            },
        };

        // function call for new word
        hangMan.newWord();
// -------------------------------------------------------- //
        
        // on click...
        $(".letter-button").on("click", function() {
            var value = $(this).text();

            //Method checks if pressed letter matches hidden word
            hangMan.checkWord(value);

            //Method checks if pressed letter has already been pressed
            hangMan.checkLettersGuessed(value);

            //Method checks for end of game
            hangMan.checkEndGame();


        }); // ON-CLICK function
}); // ON-READY function