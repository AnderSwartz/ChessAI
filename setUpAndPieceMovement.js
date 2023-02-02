
var globalDepth = prompt("Enter a value to use for the depth of the AI (3 or 4 is recommended)", "1");
document.getElementById('total positions').innerText = "-"    
document.getElementById('total time').innerText = "-"

//User can press Enter at any time to move the AI with the player whose turn it is.
document.addEventListener("keypress", function onPress(event) {
    if (event.keyCode == 13) {
        colorAI(currentPlayer.slice(0,5).toLowerCase())
    }
});

var attackedPiece = "undefined"
var squaresMatrix = new Array
var previouslyClickedSquare
whiteWon = false
blackWon = false
let board=document.querySelector(".board") 
let player=document.querySelector(".player") 
let playAgain=document.querySelector(".playAgain") 
let restart=document.querySelector(".restart") 
let moveBlackWithAI = document.querySelector("moveBlackWithAI")
let blackAIButton = document.querySelector("blackAIButton")
let box=0
var currentColor = "white"
var currentOppositeColor = "black"
let currentPlayer="white's turn"
var blackLastSelectedPiece = ""
var blackLastSelectedLocation = ""
var whiteLastSelectedPiece = ""
var whiteLastSelectedLocation = ""

var squareswhiteCanAttack
var squaresblackCanAttack

var blackCastleableQS = true
var blackCastleableKS = true

var whiteCastleableQS= true
var whiteCastleableKS= true

var whiteWeight = 1
var blackWeight = -1
var piecesAttackingKing = []

var squares
var x
var y

const vars = {
    whiteLastSelectedPiece,
    blackLastSelectedPiece,
    whiteLastSelectedLocation,
    blackLastSelectedLocation,
    whitePieces,
    blackPieces,
    whiteCastleableQS,
    whiteCastleableKS,
    blackCastleableQS,
    blackCastleableKS,
    whitePieces,
    blackPieces,
    squareswhiteCanAttack,
    squaresblackCanAttack,
    whiteWeight,
    blackWeight
}
document.addEventListener("DOMContentLoaded",loadDom)
// document.addEventListener("mouseover",highlight)







// function setUpAttackers(){
//     squares.forEach(square=>{
//         square.attackers = 0
//     })
// }


function switchTurn(){
    // console.log("calling switch turn")
    if(currentPlayer==="white's turn"){
            currentPlayer="black's turn"
            currentColor="black"
            currentOppositeColor = "white"
            addPieceEventListeners("black")
            removePieceEventListeners("white")
        }
        else{
            currentPlayer="white's turn"
            currentOppositeColor = "black"
            currentColor = "white"
            addPieceEventListeners("white")
            removePieceEventListeners("black")
        }
        // countAttackers()
        // console.log(squares[24].attackers)
    player.innerHTML=currentPlayer
    
}



// function countAttackers(){
//     squares.forEach(square=>{
//         if(square.hasAttribute("open-square")){
//             square.attackers = square.attackers+1
//         }
//     })
// }

// function removeAllEventListenersForWhite(){
//     squares.forEach(square=.{
//         square.removeEventListener("click",whitePawn)
//     })
// }

function loadDom(){
    console.log("calling loadDom")
    createBoard() 
    player.innerHTML=currentPlayer 
    
    squares=document.querySelectorAll(".board div") 
    Array.from(squares).forEach(square=>{ 
    })
    playAgain.addEventListener("click",reset)
}

function createBoard(){
    console.log("calling createBoard")
    var black = false;
    for(i=1;i<9;i++){
        black=!black;
        for(j=1;j<9;j++){
            if(!black){
                let div =document.createElement("div") 
                div.setAttribute("data-idx",j) 
                div.setAttribute("data-idy",i) 
                div.setAttribute("squareColor","black")
                div.setAttribute("piece","")
                board.appendChild(div)
            }
            else{
                let div =document.createElement("div") 
                div.setAttribute("data-idx",j) 
                div.setAttribute("data-idy",i) 
                div.setAttribute("squareColor","white") 
                div.setAttribute("piece","")

                board.appendChild(div)
                ////console.log(div)
                if(i<3){
                    // div.classList.add("taken") 
                    }
                    else if(i>6){
                    // div.classList.add("taken") 
                }
            }
            
            black=!black;
        }
    }
    fillSquareMatrix()
    createPieces()
    
    // addWhitePieceEventListeners()
    addPieceEventListeners("white")
    // setUpEmptySquareListeners()
    // setUpAttackers()    
}



function createPieces(){
    // console.log("calling createPieces")
    // squares =document.querySelectorAll('.board div')
    // let square = squaresMatrix[0][0]
    squaresMatrix[0][0].setAttribute("piece","black-rook")
    squaresMatrix[0][1].setAttribute("piece","black-knight")
    squaresMatrix[0][2].setAttribute("piece","black-bishop")
    squaresMatrix[0][3].setAttribute("piece","black-queen")
    squaresMatrix[0][4].setAttribute("piece","black-king")
    squaresMatrix[0][5].setAttribute("piece","black-bishop")
    squaresMatrix[0][6].setAttribute("piece","black-knight")
    squaresMatrix[0][7].setAttribute("piece","black-rook")
    
    for(i = 8;i<16;i++){
        squares[i].setAttribute("piece","black-pawn")
        // squares[i].setAttribute("piece","hasnt-moved")
    }

    squaresMatrix[7][0].setAttribute("piece","white-rook")
    squaresMatrix[7][1].setAttribute("piece","white-knight")
    squaresMatrix[7][2].setAttribute("piece","white-bishop")
    squaresMatrix[7][3].setAttribute("piece","white-queen")
    squaresMatrix[7][4].setAttribute("piece","white-king")
    squaresMatrix[7][5].setAttribute("piece","white-bishop")
    squaresMatrix[7][6].setAttribute("piece","white-knight")
    squaresMatrix[7][7].setAttribute("piece","white-rook")
    for(i = 48;i<56;i++){
        squares[i].setAttribute("piece","white-pawn")
        //squares[i].classList.add("hasnt-moved")
    }
    
}


function fillSquareMatrix(){
    console.log("setting up squareMatrix")
    squares =document.querySelectorAll('.board div')
        for(i =0;i<8;i++){
            rowToAdd = new Array 
            for(j =0;j<8;j++){
                rowToAdd.push(squares[i*8+j])
            }
            squaresMatrix.push(rowToAdd)
        }
}

function setUpEmptySquareListeners(){
    squares.forEach(square =>{
        square.addEventListener("click",clearPieceSelection)
    })
}


function pawnMovement(color,square){
    // console.log("calling pawnMovement")
    // console.log(idy)
    // console.log(idx)
    // console.log(color)
    let oppositeColor = setOppositeColor(color)
    // console.log(color,square)
    //one and two up
    if(color=="white"){
        //WHITE PAWN
        // console.log(square)
        // console.log(squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)])
        // console.log(squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)-8])
        if(!allPieces.includes(squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)-8].getAttribute("piece"))){
                // console.log(squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)-8])
                squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)-8].toggleAttribute("open-square")
                if(parseInt(square.dataset.idy)===7&&!allPieces.includes(squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)-16].getAttribute("piece"))){
                    squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)-16].toggleAttribute("open-square")
                }
            }
            
        //up to the right
        if(parseInt(square.dataset.idy)-1-1>-1&&parseInt(square.dataset.idy)-1-1<8
        &&parseInt(square.dataset.idx)-1+1>-1&&parseInt(square.dataset.idx)-1+1<8){
            attackedSquare = squares[(8*(parseInt(square.dataset.idy)-1-1)+parseInt(square.dataset.idx)-1+1)]
            // attackedSquare.setAttribute("attacked","")
        
            if(attackedSquare.getAttribute("piece").substring(0,5)==oppositeColor){
                attackedSquare.toggleAttribute("open-square")
            }
        }
       
        //up to the left
        if(parseInt(square.dataset.idy)-1-1>-1&&parseInt(square.dataset.idy)-1-1<8
        &&parseInt(square.dataset.idx)-1-1>-1&&parseInt(square.dataset.idx)-1-1<8){
            attackedSquare = squares[(8*(parseInt(square.dataset.idy)-1-1)+parseInt(square.dataset.idx)-1-1)]
            // attackedSquare.setAttribute("attacked","")
        
            if(attackedSquare.getAttribute("piece").substring(0,5)==oppositeColor){
                attackedSquare.toggleAttribute("open-square")
            }
        }
            //en passant left
        if(parseInt(square.dataset.idy)-1>-1&&parseInt(square.dataset.idy)-1<8
        &&parseInt(square.dataset.idx)-1-1>-1&&parseInt(square.dataset.idx)-1-1<8){
            tempSquare = squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1-1)]
            if(tempSquare.hasAttribute("black-en-passant-pawn")){
                squares[(8*(parseInt(square.dataset.idy)-1-1)+parseInt(square.dataset.idx)-1-1)].toggleAttribute("open-square")
                squares[(8*(parseInt(square.dataset.idy)-1-1)+parseInt(square.dataset.idx)-1-1)].toggleAttribute("white-en-passant-square")
            }
        }
        //en passant right
        if(parseInt(square.dataset.idy)-1>-1&&parseInt(square.dataset.idy)-1<8
        &&parseInt(square.dataset.idx)-1+1>-1&&parseInt(square.dataset.idx)-1+1<8){
            tempSquare = squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1+1)]
            if(tempSquare.hasAttribute("black-en-passant-pawn")){
                squares[(8*(parseInt(square.dataset.idy)-1-1)+parseInt(square.dataset.idx)-1+1)].toggleAttribute("open-square")
                squares[(8*(parseInt(square.dataset.idy)-1-1)+parseInt(square.dataset.idx)-1+1)].toggleAttribute("white-en-passant-square")
            }
        }
    }
        
        ////////BLACK PAWN
    else{
        if(!allPieces.includes(squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)+8].getAttribute("piece"))){
    // //console.log(squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)+8])
        squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)+8].toggleAttribute("open-square")
        if(parseInt(square.dataset.idy)===2&&!allPieces.includes(squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)+16].getAttribute("piece"))){
            squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)+16].toggleAttribute("open-square")
        }
        }
        //up to the right
        // //console.log(parseInt(square.dataset.idy)-1)
        if(parseInt(square.dataset.idy)-1+1>-1&&parseInt(square.dataset.idy)-1+1<8
        &&parseInt(square.dataset.idx)-1+1>-1&&parseInt(square.dataset.idx)-1+1<8){
            attackedSquare = squares[(8*(parseInt(square.dataset.idy)-1+1)+parseInt(square.dataset.idx)-1+1)]
            // attackedSquare.setAttribute("attacked","")
            if(attackedSquare.getAttribute("piece").substring(0,5)==oppositeColor){
                attackedSquare.toggleAttribute("open-square")
            }
        }
        
        //up to the left
        if(parseInt(square.dataset.idy)-1+1>-1&&parseInt(square.dataset.idy)-1+1<8
        &&parseInt(square.dataset.idx)-1-1>-1&&parseInt(square.dataset.idx)-1-1<8){
            attackedSquare = squares[(8*(parseInt(square.dataset.idy)-1+1)+parseInt(square.dataset.idx)-1-1)]
            // attackedSquare.setAttribute("attacked","")
            if(attackedSquare.getAttribute("piece").substring(0,5)==oppositeColor){
                attackedSquare.toggleAttribute("open-square")
            }
        }
        
        //en passant left
        if(parseInt(square.dataset.idy)-1>-1&&parseInt(square.dataset.idy)-1<8
        &&parseInt(square.dataset.idx)-1-1>-1&&parseInt(square.dataset.idx)-1-1<8){
            tempSquare = squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1-1)]
            if(tempSquare.hasAttribute("white-en-passant-pawn")){
                //console.log("made to here")
                squares[(8*(parseInt(square.dataset.idy)-1+1)+parseInt(square.dataset.idx)-1-1)].toggleAttribute("open-square")
                squares[(8*(parseInt(square.dataset.idy)-1+1)+parseInt(square.dataset.idx)-1-1)].toggleAttribute("black-en-passant-square")
            }
        }
        //en passant right
        if(parseInt(square.dataset.idy)-1>-1&&parseInt(square.dataset.idy)-1<8
        &&parseInt(square.dataset.idx)-1+1>-1&&parseInt(square.dataset.idx)-1+1<8){
            tempSquare = squares[(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1+1)]
            if(tempSquare.hasAttribute("white-en-passant-pawn")){
                //console.log("made to here")
                squares[(8*(parseInt(square.dataset.idy)-1+1)+parseInt(square.dataset.idx)-1+1)].toggleAttribute("open-square")
                squares[(8*(parseInt(square.dataset.idy)-1+1)+parseInt(square.dataset.idx)-1+1)].toggleAttribute("black-en-passant-square")

            }
        }
    }

}


    

//given a square, highlight all open squares that the pawn could move to

function knightMovement(color,square){
    
    x=(parseInt(square.dataset.idx)-1+2)
    y=(parseInt(square.dataset.idy)-1-1)
    // console.log(squares[(8*(y))+x])
    
    if(x>-1&&x<8&&y>-1&&y<8){
        squares[(8*(y))+x].setAttribute("attacked","")
        if(squares[(8*(y))+x].getAttribute("piece").substring(0,5)!=color){
            squares[(8*(y))+x].toggleAttribute("open-square")
        }
    }
   

    x=(parseInt(square.dataset.idx)-1+2)
    y=(parseInt(square.dataset.idy)-1+1)
    // console.log(squares[(8*(y))+x])
    if(x>-1&&x<8&&y>-1&&y<8){
        squares[(8*(y))+x].setAttribute("attacked","")
        if(squares[(8*(y))+x].getAttribute("piece").substring(0,5)!=color){
            squares[(8*(y))+x].toggleAttribute("open-square")
        }
    }

    x=(parseInt(square.dataset.idx)-1-2)
    y=(parseInt(square.dataset.idy)-1-1)
    
    if(x>-1&&x<8&&y>-1&&y<8){
        squares[(8*(y))+x].setAttribute("attacked","")
        if(squares[(8*(y))+x].getAttribute("piece").substring(0,5)!=color){
            squares[(8*(y))+x].toggleAttribute("open-square")
        }
    }
    x=(parseInt(square.dataset.idx)-1-2)
    y=(parseInt(square.dataset.idy)-1+1)
    if(x>-1&&x<8&&y>-1&&y<8){
        squares[(8*(y))+x].setAttribute("attacked","")
        if(squares[(8*(y))+x].getAttribute("piece").substring(0,5)!=color){
            squares[(8*(y))+x].toggleAttribute("open-square")
        }
    }
    
    x=(parseInt(square.dataset.idx)-1+1)
    y=(parseInt(square.dataset.idy)-1+2)
    if(x>-1&&x<8&&y>-1&&y<8){
        squares[(8*(y))+x].setAttribute("attacked","")
        if(squares[(8*(y))+x].getAttribute("piece").substring(0,5)!=color){
            squares[(8*(y))+x].toggleAttribute("open-square")
        }
    }
    x=(parseInt(square.dataset.idx)-1+1)
    y=(parseInt(square.dataset.idy)-1-2)
    // console.log(squares[(8*(y))+x])
    // console.log((squares[(8*(y))+x].getAttribute("piece").substring(0,5)==color))
    if(x>-1&&x<8&&y>-1&&y<8){
        squares[(8*(y))+x].setAttribute("attacked","")
        if(squares[(8*(y))+x].getAttribute("piece").substring(0,5)!=color){
            squares[(8*(y))+x].toggleAttribute("open-square")
        }
    }
    x=(parseInt(square.dataset.idx)-1-1)
    y=(parseInt(square.dataset.idy)-1+2)
    if(x>-1&&x<8&&y>-1&&y<8){
        squares[(8*(y))+x].setAttribute("attacked","")
        if(squares[(8*(y))+x].getAttribute("piece").substring(0,5)!=color){
            squares[(8*(y))+x].toggleAttribute("open-square")
        }
    }
    x=(parseInt(square.dataset.idx)-1-1)
    y=(parseInt(square.dataset.idy)-1-2)
    if(x>-1&&x<8&&y>-1&&y<8){
        squares[(8*(y))+x].setAttribute("attacked","")
        if(squares[(8*(y))+x].getAttribute("piece").substring(0,5)!=color){
            squares[(8*(y))+x].toggleAttribute("open-square")
        }
    }

    // console.log(Asdf)
    // document.querySelectorAll(".open-square").forEach(square=>{
    //     square.setAttribute("attacked","")
    // })
    
}

function checkPieceMovementInLine(x,y,color){
    let oppositeColor = setOppositeColor(color)
    // console.log(color)
    flag = true
    if(x>-1&&x<8&&y>-1&&y<8){
        // console.log("checking",squares[(8*(y))+x])
        if(!(squares[(8*(y))+x].getAttribute("piece").substring(0,5)==color)){
            // console.log("checking",squares[(8*(y))+x])
            if(attackedPiece == "undefined"){
                if(squares[(8*(y))+x].getAttribute("piece").substring(0,5)==oppositeColor){
                    attackedPiece = squares[(8*(y))+x]
                }
                // squares[(8*(y))+x].setAttribute("attacked","")
                squares[(8*(y))+x].setAttribute("open-square","")
            }
            else{
                if(squares[(8*(y))+x].getAttribute("piece")==oppositeColor+"-king"){
                    // console.log("adding pinned to",attackedPiece)
                    // console.log(idy)
                    // console.log(idx)
                    
                    let value = parseInt(idy-1)*8+parseInt(idx-1)
                    // console.log(squares[value])
                    // console.log()
                    attackedPiece.setAttribute("pinned",String(value))

                    // console.log(attackedPiece.getAttribute("pinned"))
                }
                else if(squares[(8*(y))+x].getAttribute("piece").substring(0,5)==oppositeColor){
                    flag = false
                    // squares[(8*(y))+x].setAttribute("attacked","")
                }
            }
        }
        else{
            // console.log(squares[(8*(y))+x].getAttribute("piece"))
            // console.log("adding special attacked to",squares[(8*(y))+x])
            squares[(8*(y))+x].setAttribute("attacked","")
            flag = false
        }
    }
    else{
        flag = false
    }
    // console.log("about to return",flag)
    return flag
}

function bishopMovement(color,square){
    let oppositeColor = setOppositeColor(color)
    var i = 1
    var j = 1
    var flag=true
    attackedPiece = "undefined"
    while(flag){
        x=(parseInt(square.dataset.idx)-1-i)
        y=(parseInt(square.dataset.idy)-1-j)
        ////console.log(vars[color+"Pieces"].includes(squares[(8*(y))+x]))
        flag = checkPieceMovementInLine(x,y,color)
        // console.log(flag)
        i++
        j++
        
    }
    flag=true
    i=1
    j=1
    attackedPiece = "undefined"
    while(flag){
        x=(parseInt(square.dataset.idx)-1-i)
        y=(parseInt(square.dataset.idy)-1+j)
        flag = checkPieceMovementInLine(x,y,color)
        i++
        j++
    }
    flag=true
    i=1
    j=1
    attackedPiece = "undefined"
    while(flag){
        x=(parseInt(square.dataset.idx)-1+i)
        y=(parseInt(square.dataset.idy)-1-j)
        flag = checkPieceMovementInLine(x,y,color)
        i++
        j++
    }
    flag=true
    i=1
    j=1
    attackedPiece = "undefined"
    while(flag){
        x=(parseInt(square.dataset.idx)-1+i)
        y=(parseInt(square.dataset.idy)-1+j)
        flag = checkPieceMovementInLine(x,y,color)
        i++
        j++
    }
    // document.querySelectorAll(".open-square").forEach(square=>{
    //     square.toggleAttribute("attacked")
    // })
}

function rookMovement(color,square){
    let oppositeColor = setOppositeColor(color)
    flag=true
    attackedPiece = "undefined"
    i=1
    while(flag){
        x=(parseInt(square.dataset.idx)-1+i)
        y=(parseInt(square.dataset.idy)-1)
        //if the next square is not one of my pieces, add it as an open square
        flag = checkPieceMovementInLine(x,y,color)
        i++
    }
    flag=true
    attackedPiece = "undefined"
    i=1
    while(flag){
        x=(parseInt(square.dataset.idx)-1-i)
        y=(parseInt(square.dataset.idy)-1)
        flag = checkPieceMovementInLine(x,y,color)
        i++
    }
    flag=true
    attackedPiece = "undefined"
    i=1
    while(flag){
        x=(parseInt(square.dataset.idx)-1)
        y=(parseInt(square.dataset.idy)-1+i)
        flag = checkPieceMovementInLine(x,y,color)
        i++
    }
    flag=true
    attackedPiece = "undefined"
    i=1
    while(flag){
        x=(parseInt(square.dataset.idx)-1)
        y=(parseInt(square.dataset.idy)-1-i)
        flag = checkPieceMovementInLine(x,y,color)
        i++
    }

    // document.querySelectorAll(".open-square").forEach(square=>{
    //     console.log("adding attacked to:",square)
    //     square.toggleAttribute("attacked")
    // })
}

function kingMovement(color,square){
    // highlightCurrentSquare(square)
    x=(parseInt(square.dataset.idx)-1)
    y=(parseInt(square.dataset.idy)-1+1)
    if(x>-1&&x<8&&y>-1&&y<8&&!(squares[(8*(y))+x].getAttribute("piece").substring(0,5)==color)){
        squares[(8*(y))+x].toggleAttribute("open-square")
    }
    x=(parseInt(square.dataset.idx)-1)
    y=(parseInt(square.dataset.idy)-1-1)
    if(x>-1&&x<8&&y>-1&&y<8&&!(squares[(8*(y))+x].getAttribute("piece").substring(0,5)==color)){
        squares[(8*(y))+x].toggleAttribute("open-square")
    }
    x=(parseInt(square.dataset.idx)-1+1)
    y=(parseInt(square.dataset.idy)-1-1)
    if(x>-1&&x<8&&y>-1&&y<8&&!(squares[(8*(y))+x].getAttribute("piece").substring(0,5)==color)){
        squares[(8*(y))+x].toggleAttribute("open-square")
        

    }
    x=(parseInt(square.dataset.idx)-1+1)
    y=(parseInt(square.dataset.idy)-1)
    if(x>-1&&x<8&&y>-1&&y<8&&!(squares[(8*(y))+x].getAttribute("piece").substring(0,5)==color)){
        squares[(8*(y))+x].toggleAttribute("open-square")
        

    }
    x=(parseInt(square.dataset.idx)-1+1)
    y=(parseInt(square.dataset.idy)-1+1)
    if(x>-1&&x<8&&y>-1&&y<8&&!(squares[(8*(y))+x].getAttribute("piece").substring(0,5)==color)){
        squares[(8*(y))+x].toggleAttribute("open-square")
        

    }
    x=(parseInt(square.dataset.idx)-1-1)
    y=(parseInt(square.dataset.idy)-1-1)
    if(x>-1&&x<8&&y>-1&&y<8&&!(squares[(8*(y))+x].getAttribute("piece").substring(0,5)==color)){
        squares[(8*(y))+x].toggleAttribute("open-square")
        

    }
    x=(parseInt(square.dataset.idx)-1-1)
    y=(parseInt(square.dataset.idy)-1)
    if(x>-1&&x<8&&y>-1&&y<8&&!(squares[(8*(y))+x].getAttribute("piece").substring(0,5)==color)){
        squares[(8*(y))+x].toggleAttribute("open-square")
        

    }
    x=(parseInt(square.dataset.idx)-1-1)
    y=(parseInt(square.dataset.idy)-1+1)
    if(x>-1&&x<8&&y>-1&&y<8&&!(squares[(8*(y))+x].getAttribute("piece").substring(0,5)==color)){
        squares[(8*(y))+x].toggleAttribute("open-square")
        

    }
    // console.log(squaresMatrix[7][5].getAttribute("piece"))
   
    if(color=="white"){
        if(whiteCastleableKS
        &&!allPieces.includes(squaresMatrix[7][5].getAttribute("piece"))
        &&!allPieces.includes(squaresMatrix[7][6].getAttribute("piece"))
        &&squaresMatrix[7][7].getAttribute("piece")==("white-rook")
        &&squaresMatrix[7][4].getAttribute("piece")==("white-king")
        &&!document.querySelector('[piece="white-king"]').hasAttribute("check")
        &&!squaresMatrix[7][5].hasAttribute("attacked")
        &&!squaresMatrix[7][6].hasAttribute("attacked")){
            // console.log("evaluating whiteCastleKS")
            // squaresMatrix[7][6].setAttribute("open-square","")
            // squaresMatrix[7][7].setAttribute("open-square","")
            squaresMatrix[7][6].setAttribute("castleable","")
            // squaresMatrix[7][7].setAttribute("castleable","")
            // squaresMatrix[7][7].classList.add("castleable-light")

        //console.log("adding castleable")
        }

        if(whiteCastleableQS
        &&!allPieces.includes(squaresMatrix[7][3].getAttribute("piece"))
        &&!allPieces.includes(squaresMatrix[7][2].getAttribute("piece"))
        &&!allPieces.includes(squaresMatrix[7][1].getAttribute("piece"))
        &&squaresMatrix[7][0].getAttribute("piece")=="white-rook"
        &&squaresMatrix[7][4].getAttribute("piece")==("white-king")
        &&!document.querySelector('[piece="white-king"]').hasAttribute("check")
        &&!squaresMatrix[7][2].hasAttribute("attacked")
        &&!squaresMatrix[7][3].hasAttribute("attacked")){
            squaresMatrix[7][2].setAttribute("castleable","")
            // squares[56].setAttribute("open-square","")
            // squares[56].classList.add("castleable-dark")
            // console.log("adding w castle QS")
        }
    }
    else{
        if(blackCastleableKS
        &&!allPieces.includes(squaresMatrix[0][5].getAttribute("piece"))
        &&!allPieces.includes(squaresMatrix[0][6].getAttribute("piece"))
        &&squaresMatrix[0][7].getAttribute("piece")=="black-rook"
        &&squaresMatrix[0][4].getAttribute("piece")=="black-king"
        &&!squaresMatrix[0][4].hasAttribute("check")
        &&!squaresMatrix[0][6].hasAttribute("attacked")
        &&!squaresMatrix[0][5].hasAttribute("attacked")){
            // squaresMatrix[0][6].setAttribute("open-square","")
            squaresMatrix[0][6].setAttribute("castleable","")
            // squaresMatrix[0][7].classList.add("castleable-dark")
        }
        if(blackCastleableQS
        &&!allPieces.includes(squaresMatrix[0][3].getAttribute("piece"))
        &&!allPieces.includes(squaresMatrix[0][2].getAttribute("piece"))
        &&!allPieces.includes(squaresMatrix[0][1].getAttribute("piece"))
        &&squaresMatrix[0][0].getAttribute("piece")=="black-rook"
        &&squaresMatrix[0][4].getAttribute("piece")=="black-king"
        &&!document.querySelector('[piece="black-king"]').hasAttribute("check")
        &&!squaresMatrix[0][3].hasAttribute("attacked")
        &&!squaresMatrix[0][2].hasAttribute("attacked")){
            squaresMatrix[0][2].setAttribute("castleable","")
            // squaresMatrix[0][0].setAttribute("open-square","")
            // squaresMatrix[0][0].classList.add("castleable-light")
        }
    }
    // document.querySelectorAll(".open-square").forEach(square=>{
    //     square.toggleAttribute("attacked")
    // })
}



function queenMovement(color,square){
    // console.log("calling queen movment",square)
    let oppositeColor = setOppositeColor(color)
    var i = 1
    var j = 1
    var flag=true
    attackedPiece = "undefined"
    while(flag){
        x=(parseInt(square.dataset.idx)-1-i)
        y=(parseInt(square.dataset.idy)-1-j)
        flag = checkPieceMovementInLine(x,y,color)
        i++
        j++
    }
    flag=true
    attackedPiece = "undefined"
    i=1
    j=1
    while(flag){
        x=(parseInt(square.dataset.idx)-1-i)
        y=(parseInt(square.dataset.idy)-1+j)
        flag = checkPieceMovementInLine(x,y,color)
        i++
        j++
    }
    flag=true
    attackedPiece = "undefined"
    i=1
    j=1
    while(flag){
        x=(parseInt(square.dataset.idx)-1+i)
        y=(parseInt(square.dataset.idy)-1-j)
        flag = checkPieceMovementInLine(x,y,color)
        i++
        j++
    }
    flag=true
    attackedPiece = "undefined"
    i=1
    j=1
    while(flag){
        x=(parseInt(square.dataset.idx)-1+i)
        y=(parseInt(square.dataset.idy)-1+j)
        flag = checkPieceMovementInLine(x,y,color)
        i++
        j++
    }
    flag=true
    attackedPiece = "undefined"
    i=1
    while(flag){
        x=(parseInt(square.dataset.idx)-1+i)
        y=(parseInt(square.dataset.idy)-1)
        flag = checkPieceMovementInLine(x,y,color)
        i++
    }
    flag=true
    attackedPiece = "undefined"
    i=1
    while(flag){
        x=(parseInt(square.dataset.idx)-1-i)
        y=(parseInt(square.dataset.idy)-1)
        flag = checkPieceMovementInLine(x,y,color)
        i++
    }
    flag=true
    attackedPiece = "undefined"
    i=1
    while(flag){
        x=(parseInt(square.dataset.idx)-1)
        y=(parseInt(square.dataset.idy)-1+i)
        flag = checkPieceMovementInLine(x,y,color)
        i++
    }
    flag=true
    attackedPiece = "undefined"
    i=1
    while(flag){
        x=(parseInt(square.dataset.idx)-1)
        y=(parseInt(square.dataset.idy)-1-i)
        flag = checkPieceMovementInLine(x,y,color)
        i++
    }
    // document.querySelectorAll(".open-square").forEach(square=>{
    //     square.toggleAttribute("attacked")
    // })
    // console.log("done with queen movement")
}
