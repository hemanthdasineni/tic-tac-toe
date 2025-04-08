var computerchoice = [];
var userchoice = [];
var filled = [];
var started = false;
var gameOver = false;

const winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
    [1, 5, 9], [3, 5, 7]            // Diagonals
];

$(document).keypress(function(e) {
    if (!started && !gameOver) {
        $(".status").text("Game On!").css({
            'color': 'aqua',
            'font-size': '60px'
        });
        computer();
        started = true;
    } else if (gameOver) {
        resetGame();
    }
});

function computer() {
    if (gameOver) return;
    
    var ran = Math.floor(Math.random() * 9) + 1;
    
    while (filled.includes(ran)) {
        ran = Math.floor(Math.random() * 9) + 1;
        if (filled.length >= 9) return;
    }
    
    $("#par" + ran)
        .text("X")
        .css('color', 'red')
        .fadeOut(500)
        .fadeIn(500)
        .fadeOut(500)
        .fadeIn(500);
    computerchoice.push(ran);
    filled.push(ran);
    
    checkWinner("X");
    if (!gameOver && filled.length < 9) {
        $(".status").text("Your turn!").css('color', 'yellow');
    }
}

$(".par").click(function() {
    if (started && !gameOver) {
        var user = $(this).attr("id");
        var occupiedstr = user.slice(3);
        var occupiednum = parseInt(occupiedstr);
        
        if (!filled.includes(occupiednum)) {
            $("#" + user)
                .text("O")
                .css({
                    'color': 'blue',
                    'font-size': '100px'
                });
            userchoice.push(occupiednum);
            filled.push(occupiednum);
            
            checkWinner("O");
            if (!gameOver && filled.length < 9) {
                setTimeout(computer, 800);
            }
        }
    }
});

function checkWinner(player) {
    for (let combo of winningCombinations) {
        if (combo.every(num => 
            (player === "X" ? computerchoice : userchoice).includes(num))) {
            $(".status").html("Game Over<br>" + player + " wins!<br>Press any key to reset")
                .css('color', player === "X" ? 'red' : 'blue');
            gameOver = true;
            return;
        }
    }
    
    if (filled.length === 9 && !gameOver) {
        $(".status").html("Game Over<br>It's a tie!<br>Press any key to reset")
            .css('color', 'white');
        gameOver = true;
    }
}

function resetGame() {
    computerchoice = [];
    userchoice = [];
    filled = [];
    started = false;
    gameOver = false;
    $(".par").text("").css({
        'color': 'black',
        'background-color': 'white'
    });
    $(".status").text("press any key to start").css({
        'color': 'aqua',
        'font-size': '60px'
    });
}