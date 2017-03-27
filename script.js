$(document).ready(function(){
    $(".table__cell").addClass("empty"); //default empty
    var $spot1 = $(".table__cell--1");
    var $spot2 = $(".table__cell--2");
    var $spot3 = $(".table__cell--3");
    var $spot4 = $(".table__cell--4");
    var $spot5 = $(".table__cell--5");
    var $spot6 = $(".table__cell--6");
    var $spot7 = $(".table__cell--7");
    var $spot8 = $(".table__cell--8");
    var $spot9 = $(".table__cell--9");
    var allSpots =  [$spot1,$spot2,$spot3,$spot4,$spot5,$spot6,$spot7,$spot8,$spot9];
    var $selectBtnX = $(".select-player__X");
    var $selectBtnO = $(".select-player__O");
    var humanPlayer = "X";
    var aiPlayer = "O";
    var $restart = $(".restart");
    var choice;
    var switchable = true;
    var gameOver = false;
    
    $selectBtnX.click(function(){
       if(switchable){
            humanPlayer = "X";
            aiPlayer = "O";
       }
    });
    $selectBtnO.click(function(){
        if(switchable){
            humanPlayer = "O";
            aiPlayer = "X";
        }
    })
    
  
    
    function checkResult(board){
          //check rows
        var checkRow = {
            checkFirstRow: function(){
                if(board[0] !== "E" &&
                    board[0] == board[1] && 
                        board[0]== board[2]
                  ){
                    return {
                        whoWon: board[0]
                    }
                }
            },
            checkSecondRow: function(){
                if(board[3] !== "E" &&
                    board[3] == board[4] && 
                        board[3]== board[5]
                  ){
                    return {
                        whoWon: board[3]
                    }
                }
            },
            checkThirdRow: function(){
                if(board[6] !== "E" &&
                    board[6] == board[7] && 
                    board[6]== board[8]
                  ){
                    return {
                        whoWon: board[6]
                    }
                }
            }
        }
        //check columns
        var checkColumn = {
            checkFirstColumn: function(){
                if(board[0] !== "E" &&
                    board[0] == board[3] && 
                    board[0]== board[6]
                  ){
                    return {
                        whoWon: board[0]
                    }
                }
            },
            checkSecondColumn: function(){
                    if(board[1] !== "E" &&
                        board[1] == board[4] && 
                        board[1]== board[7]
                      ){
                        return {
                            whoWon: board[1]
                        }
                    }
                },
            checkThirdColumn: function(){
                if(board[2] !== "E" &&
                        board[2] == board[5] && 
                        board[2]== board[8]
                      ){
                        return {
                            whoWon: board[2]
                        }
                }
            }
        }
        //check diagonals
        var checkDiagonal = {
            checkFirstDiagonal: function(){
                if(board[0] !== "E" &&
                   board[0] == board[4] && 
                   board[0] == board[8]
                ){
                    return {
                            whoWon: board[0]
                    }
                }
            },
            checkSecondDiagonal: function(){
                if(board[2] !== "E" &&
                   board[2] == board[4] &&
                   board[2]== board[6]
                  ){
                    return {
                        whoWon: board[2]
                    }
                }
            }
        }
        
        var gameScore;
        function checkWinOrDraw(){
            var checkAll = [checkRow.checkFirstRow,
                            checkRow.checkSecondRow,
                            checkRow.checkThirdRow,
                            checkColumn.checkFirstColumn,
                            checkColumn.checkSecondColumn,
                            checkColumn.checkThirdColumn,
                            checkDiagonal.checkFirstDiagonal,
                            checkDiagonal.checkSecondDiagonal
                           ];
            var winner;
            for(var i=0; i<checkAll.length; i++){
                if(checkAll[i]()){
                    winner = checkAll[i]().whoWon;
                }
            }
            if(winner == "X"){
                gameScore = 10;
            }else if(winner == "O"){
                gameScore = -10;
            }else {
                gameScore = 0;
            }
        };
        checkWinOrDraw();
        return gameScore;
    } //check result works 10:39pm March12
    
    function isTerminal(board){
        //if there's no empty spot on the board
        //  return true
        //else
        //  return false
        for(var i=0; i<board.length; i++){
            if(board[i] == "E"){
                return false;
            }
        }
        return true;
    }
    
    function getAvailableMoves(board){
        var availableMoves = [];
        for(var i=0; i<board.length; i++){
            if(board[i] == "E"){ 
                availableMoves.push(i);
            }
        }
        return availableMoves;
    }
    
    function getNewBoards(board,playerTurn,availableMoves){
        var newBoardList = [];
        var index;
        var newBoard = board;
        for(var i=0; i<availableMoves.length; i++){
            index = availableMoves[i];
            newBoard[index] = playerTurn;
            newBoardList.push(Array.from(newBoard));
            newBoard[index] = "E";
        }
        return newBoardList;
    }
    
   
    var add=0;
    function minimax(board,playerTurn){
        add++;
        var score = checkResult(board);
        if(score !== 0){ //if there's a winner, return the score for current board
            return score;
        }else { //if there's no winner
            if(isTerminal(board)){ //if there's no winner and it's terminal state, return the score for current board
                return score;
            }else{
                //if there's no winner and it's not terminal state, keep looping
                   var boardScore;
                   if(playerTurn == "X"){ //if it's X's turn
                     boardScore = -1000;
                   }else { //if it's O's turn
                     boardScore = 1000;
                   }

                 var availableMoves = getAvailableMoves(board); //get all available moves
                 var newBoards = getNewBoards(board,playerTurn,availableMoves); //get all possible new boards according to available moves
                  newBoards.forEach(function(board){
                    var nextScore = minimax(board,playerTurn=="X"?"O":"X"); //find the minimax score for each of the new boards
                    if(playerTurn == "X"){ //if it's X's turn now
                      if(nextScore>boardScore){ //if the minimax score of this board is higher than assumed game score, pick this board
                        boardScore = nextScore; 
                      }
                    }else { //if it's O's turn now
                      if(nextScore < boardScore){ //if the minimax score of this board is lower than assumed game score, pick this board
                        boardScore = nextScore;
                      }
                    }

                  })

                  return boardScore;
            }
        
        }
    
    }
          /*else{
              currentBoard.push(allSpots[i].html());
          }*/
    function getCurrentBoard(){
        var currentBoard = [];
        for(var i=0; i<allSpots.length; i++){
          if(allSpots[i].hasClass("empty")){
              currentBoard.push("E");
          }else if(allSpots[i].hasClass("X")){
              currentBoard.push("X");
          }else if(allSpots[i].hasClass("O")){
              currentBoard.push("O");
          }
        }
        return currentBoard;
    }
    
    
    
    
    function displayWinnerIfAny(gameScore,currentBoard){
        function resultAnimation(winner,winningLine){
            alert("winner: "+winner);
            function animateWinningLine(line){
                function animateFirstRow(){
                    $(".table").append("<div></div>");
                    $(".table > div").addClass("horizontal firstRow");
                    setTimeout(function(){
                        $(".table > div").addClass("full-width");
                    },20)
                };
                function animateSecondRow(){
                    $(".table").append("<div></div>");
                    $(".table > div").addClass("horizontal secondRow");
                    setTimeout(function(){
                        $(".table > div").addClass("full-width");
                    },20)
                };
                function animateThirdRow(){
                    $(".table").append("<div></div>");
                    $(".table > div").addClass("horizontal thirdRow");
                    setTimeout(function(){
                        $(".table > div").addClass("full-width");
                    },20)
                };
                function animateFirstColumn(){
                    $(".table").append("<div></div>");
                    $(".table > div").addClass("vertical firstColumn");
                    setTimeout(function(){
                        $(".table > div").addClass("full-height");
                    },20)
                };
                function animatesecondColumn(){
                    $(".table").append("<div></div>");
                    $(".table > div").addClass("vertical secondColumn");
                    setTimeout(function(){
                        $(".table > div").addClass("full-height");
                    },20)
                };
                function animateThirdColumn(){
                    $(".table").append("<div></div>");
                    $(".table > div").addClass("vertical thirdColumn");
                    setTimeout(function(){
                        $(".table > div").addClass("full-height");
                    },20)
                };
                function animateFirstDiagonal(){
                    $(".table").append("<div></div>");
                    $(".table > div").addClass("incline firstDiagonal");
                    setTimeout(function(){
                        $(".table > div").addClass("full-diagonal");
                    },20)
                };
                function animateSecondDiagonal(){
                    $(".table").append("<div></div>");
                    $(".table > div").addClass("decline secondDiagonal");
                    setTimeout(function(){
                        $(".table > div").addClass("full-diagonal");
                    },70)
                };
                switch(line){
                    case "firstRow": 
                        animateFirstRow();
                        break;
                    case "secondRow": 
                        animateSecondRow();
                        break;
                    case "thirdRow": 
                        animatethirdRow();
                        break;
                    case "firstColumn": 
                        animatefirstColumn();
                        break;
                    case "secondColumn": 
                        animatesecondColumn();
                        break;
                    case "thirdColumn": 
                        animatethirdColumn();
                        break;
                    case "firstDiagonal": 
                        animatefirstDiagonal();
                        break;
                    case "secondDiagonal": 
                        animatesecondDiagonal();
                        break;
                }
            };
            animateWinningLine(winningLine);
        }
        
        function getWinningLine(board){
            function checkLine(line){
                if(line[0]!=="E" &&
                   line[0] == line[1] &&
                   line[1] == line[2]){
                    return true;
                }else {
                    return false;
                }
            }
            var winningLine;
            function checkWinningLine(){
                var allLines = {
                    firstRow: [board[0],board[1],board[2]],
                    secondRow: [board[3],board[4],board[5]],
                    thirdRow: [board[6],board[7],board[8]],
                    firstColumn: [board[0],board[3],board[6]],
                    secondColumn: [board[1],board[4],board[7]],
                    thirdColumn: [board[2],board[5],board[8]],
                    firstDiaonal: [board[0],board[4],board[8]],
                    secondDiagonal: [board[2],board[4],board[6]]
                }
                if(checkLine(allLines.firstRow)){
                    winningLine = "firstRow";
                }else if(checkLine(allLines.secondRow)){
                    winningLine = "secondRow";
                }else if(checkLine(allLines.thirdRow)){
                    winningLine = "thirdRow";
                }else if(checkLine(allLines.firstColumn)){
                    winningLine = "firstColumn";
                }else if(checkLine(allLines.secondColumn)){
                    winningLine = "secondColumn";
                }else if(checkLine(allLines.thirdColumn)){
                    winningLine = "thirdColumn";
                }else if(checkLine(allLines.firstDiaonal)){
                    winningLine = "firstDiagonal";
                }else if(checkLine(allLines.secondDiagonal)){
                    winningLine = "secondDiagonal";
                }
            }
            checkWinningLine();
            return winningLine;
        }
        if(gameScore == 10){
            resultAnimation("X",getWinningLine(currentBoard));
            switchable = true;
            gameOver = true;
        }else if(gameScore == -10){
            resultAnimation("O",getWinningLine(currentBoard));
            switchable = true;
            gameOver = true;
        }else if(gameScore == 0 && isTerminal(currentBoard)){
            alert("draw");
            switchable = true;
            gameOver = true;
        }
    }
  
  function addSvg(spot,player){
      if(player == "X"){
          $('<svg width="100%" height="100%" viewbox="0 0 200 200"><path class="svg__path-x-1"d="M50 30 L150 180"/><path class="svg__path-x-2" d="M150 30 L50 180" /></svg>').appendTo(spot);
      }else {
          $('<svg width="100%" height="100%" viewbox="0 0 100 100"><path class="svg__path-o" d="M10,50a40,40 0 1,0 80,0a40,40 0 1,0 -80,0"/></svg>').appendTo(spot);
      }
  }
  
  function makeMove(index,player){
      if(allSpots[index].hasClass("empty")){
          allSpots[index].removeClass("empty");
      }
      allSpots[index].addClass(""+player);
      addSvg(allSpots[index],player);
      var currentBoard = getCurrentBoard();
      var gameScore = checkResult(currentBoard);
      displayWinnerIfAny(gameScore,currentBoard);
  }
    
  function makeAiMove(board,playerTurn){
        var pickedMove;
        var availableMoves = getAvailableMoves(board);
        var availableBoards = getNewBoards(board,playerTurn,availableMoves);
        var bestPossibleAiScore;
        var bestBoard = availableBoards[0];
        var bestIndex;
        var scoreList = [];
      
        availableBoards.forEach(function(board){ //push the minimax score for each possible boards into scoreList array
          scoreList.push(minimax(board,playerTurn=="X"?"O":"X"));
          var log = {
              board: board,
              minimaxScore: minimax(board,playerTurn)
          };
          console.log(log);
        });
        
      
      
        bestPossibleAiScore = scoreList[0];
      
        bestIndex = 0;
      
      
      
        if(playerTurn == "O"){ //if AI is O, pick the lowest score
            for(var i=0; i<scoreList.length; i++){
                if(scoreList[i]<bestPossibleAiScore){
                    bestPossibleAiScore = scoreList[i];
                    bestBoard = availableBoards[i];
                }
            }
        }else if(playerTurn == "X"){ //if AI is X, pick the highest score
            for(var i=0; i<scoreList.length; i++){
                if(scoreList[i]>bestPossibleAiScore){
                    bestPossibleAiScore = scoreList[i];
                    bestBoard = availableBoards[i];
                }
            }
        }
        
      
        for(var i=0; i<board.length; i++){
            if(board[i] !== bestBoard[i]){
                bestIndex = i; //get the best index to make the move in
            }
        }


        makeMove(bestIndex,playerTurn);
        if(humanPlayer == "X"){
            $selectBtnO.removeClass("yourTurn");
            $selectBtnX.addClass("yourTurn");
        }else {
            $selectBtnX.removeClass("yourTurn");
            $selectBtnO.addClass("yourTurn");
        }


   }
  
    $(".table__cell").click(function(){
        switchable = false;
        var index = $(this).attr("class").match(/[1-9]/g) - 1;
        if(allSpots[index].hasClass("empty") && !gameOver){
            allSpots[index].removeClass("empty");
            makeMove(index,humanPlayer=="X"?"X":"O");
            if(aiPlayer == "O"){
                $selectBtnX.removeClass("yourTurn");
                $selectBtnO.addClass("yourTurn");
            }else {
                $selectBtnO.removeClass("yourTurn");
                $selectBtnX.addClass("yourTurn");
            }
            var newBoard = getCurrentBoard();
            setTimeout(function(){
                makeAiMove(newBoard,aiPlayer=="X"?"X":"O");
            },550);
        }
        
    })
    
    
    $restart.click(function(){
        function resetPlayer(){
            humanPlayer = "X";
            aiPlayer = "O";
        }
        function resetBoard(){
            for(var i=0; i<allSpots.length; i++){
                var thisSpot = allSpots[i];
                thisSpot.empty();
                thisSpot.addClass("empty");
                thisSpot.removeClass("X");
                thisSpot.removeClass("O");
                $(".table > div").remove();
            }
        }
        resetPlayer();
        resetBoard();
        switchable = true;
        gameOver = false;
    })
  
  
})
    
  
   
    
    
    
    
    