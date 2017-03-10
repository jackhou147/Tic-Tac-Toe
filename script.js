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
    
    function checkResult(){
        //check rows
        var checkRow = {
            checkFirstRow: function(){
                if(!$spot1.hasClass("empty")&&
                   !$spot2.hasClass("empty")&&
                   !$spot3.hasClass("empty")&&
                   $spot1.html()==$spot2.html()==$spot3.html()
                  ){
                    return {
                        whoWon: $spot1.html()
                    }
                }
            },
            checkSecondRow: function(){
                if(!$spot4.hasClass("empty")&&
                   !$spot5.hasClass("empty")&&
                   !$spot6.hasClass("empty")&&
                   $spot4.html()==$spot5.html()==$spot6.html()
                  ){
                    return {
                        whoWon: $spot4.html()
                    }
                }
            },
            checkThirdRow: function(){
                if(!$spot7.hasClass("empty")&&
                   !$spot8.hasClass("empty")&&
                   !$spot9.hasClass("empty")&&
                   $spot7.html()==$spot8.html()==$spot9.html()
                  ){
                    return {
                        whoWon: $spot7.html()
                    }
                }
            }
        }
        //check columns
        var checkColumn = {
            checkFirstColumn: function(){
                if(!$spot1.hasClass("empty")&&
                   !$spot4.hasClass("empty")&&
                   !$spot7.hasClass("empty")&&
                   $spot1.html()==$spot4.html()==$spot7.html()
                  ){
                    return {
                        whoWon: $spot1.html()
                    }
                }
            },
            checkSecondColumn: function(){
                if(!$spot2.hasClass("empty")&&
                   !$spot5.hasClass("empty")&&
                   !$spot8.hasClass("empty")&&
                   $spot2.html()==$spot5.html()==$spot8.html()
                  ){
                    return {
                        whoWon: $spot2.html()
                    }
                }
            },
            checkThirdColumn: function(){
                if(!$spot3.hasClass("empty")&&
                   !$spot6.hasClass("empty")&&
                   !$spot9.hasClass("empty")&&
                   $spot3.html()==$spot6.html()==$spot9.html()
                  ){
                    return {
                        whoWon: $spot3.html()
                    }
                }
            }
        }
        //check diagonals
        var checkDiagonal = {
            checkFirstDiagonal: function(){
                if(!$spot1.hasClass("empty")&&
                   !$spot5.hasClass("empty")&&
                   !$spot9.hasClass("empty")&&
                   $spot1.html()==$spot5.html()==$spot9.html()
                  ){
                    return {
                        whoWon: $spot1.html()
                    }
                }
            },
            checkSecondDiagonal: function(){
                if(!$spot3.hasClass("empty")&&
                   !$spot5.hasClass("empty")&&
                   !$spot7.hasClass("empty")&&
                   $spot3.html()==$spot5.html()==$spot7.html()
                  ){
                    return {
                        whoWon: $spot3.html()
                    }
                }
            }
        }
        var gameScore;
        function checkWinOrDraw(){
            var checkAll = [checkRow.checkFirstRow(),
                            checkRow.checkSecondRow(),
                            checkRow.checkThirdRow(),
                            checkColumn.checkFirstColumn(),
                            checkColumn.checkSecondColumn(),
                            checkColumn.checkThirdColumn(),
                            checkDiagonal.checkFirstDiagonal(),
                            checkDiagonal.checkSecondDiagonal()
                           ];
            var winner;
            for(var i=0; i<checkAll.length; i++){
                if(checkAll[i]){
                    winner = checkAll[i].whoWon;
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
    }
    
    function isTerminal(){
        //if there's no empty spot on the board
        //  return true
        //else
        //  return false
    }
    
    function minimax(board,playerTurn){
        if(isTerminal()){
            return checkResult();
        }else{
            var scoreList = [];
            var pickMove;
            //for every empty spot 
            //  var index
            //  var newBoard = board
            //  newBoard[index] removeClass("empty")
            //  push minimax(newBoard,playerTurn=="x"?"O":"X")to scoreList
            //pickMove = scoreList[0]
            //if playerTurn = "X"
            //  pick highest score in scoreList
            //if playerTurn = "O"
            //  pick lowest score in scoreList
            //return pickMove
        }
    }
    
    
    
    
    
    
    
    
})