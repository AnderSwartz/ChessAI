//Here are some helpful hints for making new features and understanding old ones

//Reference different squares by using "squares[]"
//The squares are arranged in a 1-d array from 0-63, 
//the upper left corner of the board is squares[0]
//and continues going left to right, then down a row
//
//Each square has these attributes: "piece", "data-idx", "data-idy"
//Reference all squares that contain a certain piece (like white pawns) 
//by using "document.querySelectorAll('[piece="white-pawn"')"
//this returns a list of all squares where the piece attribute = "white-pawn"
//
//If you want to get all squares containing a black piece, for example,
//you could set color = "black" and use    
// black-pieces = document.querySelectorAll(`[piece="${color}-bishop"],[piece="${color}-knight"],[piece="${color}-queen"],[piece="${color}-rook"]`)
//Again, document.querSelectorAll returns a list, this time with all squares containing a black piece
//
//TODO: explain how to use console.log to see attributes of squares and debug


//useful squares for evaluation function
var centerSquares = [27,28,35,36]
var edges = [0,7,15,23,31,39,47,55,63,0,8,16,24,32,40,48,56,1,2,3,
4,5,6,56,57,58,59,60,61,62]
var fianchettoSquares = [9,14,49,54]
var blackStartSquares = [0,1,2,3,4,5,6,7]
var whiteStartSquares = [57,58,59,60,61,62,63]

var blackPieces = ["black-pawn","black-bishop","black-knight","black-rook","black-queen","black-king"]
var whitePieces = ["white-pawn","white-bishop","white-knight","white-rook","white-queen","white-king"]
var allPieces = ["black-pawn","black-bishop","black-knight","black-rook","black-queen","black-king",
"white-pawn","white-bishop","white-knight","white-rook","white-queen","white-king"]


function evaluate(){
    //positive score is always good for white, negative score is good for black
    //chess is zero-sum -> we only need one score to tell us how both sides are doing
    score = 0
    
    //accounting for material
    score+=document.querySelectorAll('[piece="white-pawn"').length
    score+= document.querySelectorAll('[piece="white-knight"').length*3
    score+=document.querySelectorAll('[piece="white-bishop"').length*3
    score+=document.querySelectorAll('[piece="white-rook"').length*5
    score+=document.querySelectorAll('[piece="white-queen"').length*9

    score-=document.querySelectorAll('[piece="black-pawn"').length
    score-= document.querySelectorAll('[piece="black-knight"').length*3
    score-=document.querySelectorAll('[piece="black-bishop"').length*3
    score-=document.querySelectorAll('[piece="black-rook"').length*5
    score-=document.querySelectorAll('[piece="black-queen"').length*9

    score+=document.querySelectorAll('[piece="white-king"').length*Number.MAX_SAFE_INTEGER
    score-=document.querySelectorAll('[piece="black-king"').length*Number.MAX_SAFE_INTEGER

    //points for having a piece in the center, extra points if its a pawn
    centerSquares.forEach(id=>{
        // console.log(squares)
        if(whitePieces.includes(squares[id].getAttribute("piece"))){
            score+=.25
            if(squares[id].getAttribute("piece")=="white-pawn"){
                score+=.25
            }
        }
        else if(blackPieces.includes(squares[id].getAttribute("piece"))){
            score-=.25
            if(squares[id].getAttribute("piece")=="black-pawn"){
                score-=.25
            }
        }
    })

    //penalty for having a knight on the edge of the board
    document.querySelectorAll('[piece="white-knight"]').forEach(knight=>{
        if(edges.includes(knight.dataset.idx-1+(knight.dataset.idy-1)*8)){
            score-=.10
        }
    })
    document.querySelectorAll('[piece="black-knight"]').forEach(knight=>{
        if(edges.includes(knight.dataset.idx-1+(knight.dataset.idy-1)*8)){
            score+=.10
        }
    })

    //points for fianchettoing a bishop
    fianchettoSquares.forEach(id=>{
        if("white-bishop" == squares[id].getAttribute("piece")){
            // score+=.5*vars[color+"Weight"]
            score+=.10
        }
        else if("black-bishop" == squares[id].getAttribute("piece")){
            score-=.10
        }
    })


    // penality for having pieces on original squares (meant to encourage developing pieces during the opening)
    // whiteStartSquares.forEach(id=>{
    //     // console.log(squares[id].getAttribute("piece").substring(0,5))
    //     if("white" == squares[id].getAttribute("piece").substring(0,5)){
    //         // score+=.5*vars[color+"Weight"]
    //         score-=.05
    //     }
    // })

    // blackStartSquares.forEach(id=>{
    //     if("black" == squares[id].getAttribute("piece").substring(0,5)){
    //         // score+=.5*vars[color+"Weight"]
    //         score+=.05
    //     }
    // })

    // ks = kingSafety("white")
    score+=kingSafety("white")
    score-=kingSafety("black")

    // console.log(ks)
    // score-= kingSafety("black")

    //castled?

    //whiteJustCastled
    // if(whiteCastleableKS==true&&squares[62].getAttribute("piece")=="white-king"&&squares[61].getAttribute("piece")=="white-rook"){
    //     console.log("evaluated whitecastleKS")
    //     score+=50
    // }
    // else if(whiteCastleableQS==true&&squares[58].getAttribute("piece")=="white-king"&&squares[59].getAttribute("piece")=="white-rook"){
    //     score+=.5
    // }
    // else if(blackCastleableQS==true&&squares[3].getAttribute("piece")=="black-king"&&squares[4].getAttribute("piece")=="black-rook"){
    //     score-=.5
    // }
    // else if(blackCastleableKS==true&&squares[6].getAttribute("piece")=="black-king"&&squares[5].getAttribute("piece")=="black-rook"){
    //     score-=.5
    // }
    // console.log(score)


    return score

}

function kingSafety(color){
    // return 0
    var KSscore = 0
    if(color=="white"){
        king = document.querySelector(`[piece="white-king"]`)
        kingIdx = king.dataset.idx-1
        kingIdy = king.dataset.idy-1
        // console.log(kingIdx)
        // console.log(kingIdy)
        // console.log(squaresMatrix[kingIdy-1][kingIdx+1])
        // console.log(squaresMatrix[7][4])
        // kingsPawns = []

        //points for having pawns directly in front of the king or in front and to the side
        if(kingIdx+1<8&&squaresMatrix[kingIdy-1][kingIdx+1].getAttribute("piece")=="white-pawn"){
            KSscore+=.1
        }
        if(squaresMatrix[kingIdy-1][kingIdx].getAttribute("piece")=="white-pawn"){
            KSscore+=.1
        }
        if(kingIdx-1>-1&&squaresMatrix[kingIdy-1][kingIdx-1].getAttribute("piece")=="white-pawn"){
            KSscore+=.1
        }
        //points if the king is in a square as as a consequence of castling (meant to encourage castling)
        if(kingIdx<=2|kingIdx>=6)
            KSscore+=.25
        // kingsPawns.push(squaresMatrix[kingIdy-1][kingIdx+1])
        // kingsPawns.push(squaresMatrix[kingIdy-1][kingIdx])
        // kingsPawns.push(squaresMatrix[kingIdy-1][kingIdx-1])
    }
    else{
        king = document.querySelector(`[piece="black-king"]`)
        kingIdx = king.dataset.idx-1
        kingIdy = king.dataset.idy-1
        // console.log(kingIdx)
        // console.log(kingIdy)
        // console.log(squaresMatrix[kingIdy-1][kingIdx+1])
        // console.log(squaresMatrix[7][4])
        // kingsPawns = []
        if(kingIdx+1<8&&squaresMatrix[kingIdy+1][kingIdx+1].getAttribute("piece")=="black-pawn"){
            KSscore+=.1
        }
        if(squaresMatrix[kingIdy+1][kingIdx].getAttribute("piece")=="black-pawn"){
            KSscore+=.1
        }
        if(kingIdx-1>-1&&squaresMatrix[kingIdy+1][kingIdx-1].getAttribute("piece")=="black-pawn"){
            KSscore+=.1
        }
        if(kingIdx<=2|kingIdx>=6)
            KSscore+=.25
        // kingsPawns.push(squaresMatrix[kingIdy-1][kingIdx+1])
        // kingsPawns.push(squaresMatrix[kingIdy-1][kingIdx])
        // kingsPawns.push(squaresMatrix[kingIdy-1][kingIdx-1])
    }
    // console.log("KSscore=",KSscore)
    return KSscore
    
}
