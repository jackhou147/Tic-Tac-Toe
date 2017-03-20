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
    
    $selectBtnX.click(function(){
        humanPlayer = "X";
        aiPlayer = "O";
    });
    $selectBtnO.click(function(){
        humanPlayer = "O";
        aiPlayer = "O";
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
        
  
   
  
  var pickMove = {
          takeTurn: function(index,player){
              if(allSpots[index].hasClass("empty")){
                allSpots[index].removeClass("empty");
                allSpots[index].append(""+player);
              }
          },
          humanTurn: function(index,player){
            this.takeTurn(index,humanPlayer=="X"?"X":"O");
          },
          aiTurn: function(index,player){
            this.takeTurn(index,player);
          }
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


        pickMove.aiTurn(bestIndex,playerTurn);


   }
  
    $(".table__cell").click(function(){
        var index = $(this).attr("class").match(/[1-9]/g) - 1;
        pickMove.humanTurn(index);
        var newBoard = [];
        for(var i=0; i<allSpots.length; i++){
          if(allSpots[i].hasClass("empty")){
              newBoard.push("E");
          }else{
              newBoard.push(allSpots[i].html());
          }
        }
       makeAiMove(newBoard,"O");
        
    })
    
    $(document).click(function(){
        var testBoard = ["O","X","E","E","X","E","O","E","E"];
        var testPlayerTurn = "X";
        console.log("testBoard minimax score: "+minimax(testBoard,testPlayerTurn));
        
    })
    
  $restart.click(function(){
    var restart = {
      resetPlayer: function(){
        humanPlayer = "X";
        aiPlayer = "O";
      },
      resetBoard:  function(){
        for(var i=0; i<allSpots.length; i++){
          allSpots[i].addClass("empty");
          allSpots[i].empty();
        }
      }
    }
    restart.resetPlayer();
    restart.resetBoard();
  }) 
  
  
    })
    
  
   
    
    
    
    
    