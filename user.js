


function clearPieceSelection(){
    let square = squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1]
    if(!(blackPieces.includes(square.classList[1])||whitePieces.includes(square.classList[1]))){
        if(!square.hasAttribute("open-square")){
            removeWhiteSelections()
            removeBlackSelections()
        }

    }
}



function clickAllColorPieces(color){
    // console.log("calling clickAllColorPiece",color)
    try{
            document.querySelector('[check]').removeAttribute("check")
            document.querySelectorAll('[attacked]').forEach(square=>{
                square.removeAttribute("attacked")
                
            })
        }
        catch{}
        
    let oppositeColor = setOppositeColor(color)
    
    piecesAttackingKing = []
    // console.log("calling clickAllColor",color)
    // console.log(oppositeColor)
    pieces = document.querySelectorAll(`[piece="${color}-bishop"],[piece="${color}-knight"],[piece="${color}-queen"],[piece="${color}-rook"]`)
    // console.log(pieces)
    pieces.forEach(start=>{
        let piece = start.getAttribute("piece").slice(6)
        // console.log()
        idx = start.dataset.idx
        idy = start.dataset.idy
       
        try{
            window[piece+"Movement"](color,start)
            // document.querySelectorAll('[open-square]').forEach(square=>{
            //     if(square.hasAttribute(oppositeColor+"-king")){
            //         square.toggleAttribute("check")
            //         console.log("adding check to",square)
            //         // console.log(start)
            //         newAttacker = {piece:piece,idx:idx,idy:idy}
            //         piecesAttackingKing.push(newAttacker)
            //         // console.log(piecesAttackingKing)
            //     }
            // })
            if(document.querySelector(`[piece="${oppositeColor}-king"]`).hasAttribute("open-square")){
                // console.log("adding check to",oppositeColor,"king")
                
                document.querySelector(`[piece="${oppositeColor}-king"]`).setAttribute("check","")
                let square = squares[8*(parseInt(idy)-1)+parseInt(idx)-1]
                newAttacker = {piece:piece,square:square}
                piecesAttackingKing.push(newAttacker)
                // console.log("adding check to",document.querySelector(`[piece="${oppositeColor}-king"]`))
            }

        }
        catch(error){
            console.log(error.message)
            console.log(piece)
        }
        // console.log(asdf)
        
        document.querySelectorAll('[open-square]').forEach(square=>{
            // console.log("adding attacked to",square,"because of",start,piece)
            square.toggleAttribute("open-square")
            square.setAttribute("attacked","")
        })
    })

    pawns = document.querySelectorAll(`[piece="${color}-pawn"]`)
    pawns.forEach(pawn=>{
        let piece = pawn.getAttribute("piece").slice(6)
        idx = pawn.dataset.idx
        idy = pawn.dataset.idy
        if(color=="white"){
        //WHITE PAWN
        // console.log(allPieces)
        // console.log(squares[(8*(parseInt(idy)-1)+parseInt(idx)-1)-8])
            
                
            //up to the right
            if(parseInt(idy)-1-1>-1&&parseInt(idy)-1-1<8
            &&parseInt(idx)-1+1>-1&&parseInt(idx)-1+1<8){
                attackedSquare = squares[(8*(parseInt(idy)-1-1)+parseInt(idx)-1+1)]
                attackedSquare.setAttribute("attacked","")
            
                if(attackedSquare.getAttribute("piece").substring(0,5)==oppositeColor){
                    attackedSquare.toggleAttribute("open-square")
                }
            }
        
            //up to the left
            if(parseInt(idy)-1-1>-1&&parseInt(idy)-1-1<8
            &&parseInt(idx)-1-1>-1&&parseInt(idx)-1-1<8){
                attackedSquare = squares[(8*(parseInt(idy)-1-1)+parseInt(idx)-1-1)]
                attackedSquare.setAttribute("attacked","")
            
                if(attackedSquare.getAttribute("piece").substring(0,5)==oppositeColor){
                    attackedSquare.toggleAttribute("open-square")
                }
            }
        }
        else{
            if(parseInt(idy)-1+1>-1&&parseInt(idy)-1+1<8
            &&parseInt(idx)-1+1>-1&&parseInt(idx)-1+1<8){
                attackedSquare = squares[(8*(parseInt(idy)-1+1)+parseInt(idx)-1+1)]
                attackedSquare.setAttribute("attacked","")
                if(attackedSquare.getAttribute("piece").substring(0,5)==oppositeColor){
                    attackedSquare.toggleAttribute("open-square")
                }
            }
        
            //up to the left
            if(parseInt(idy)-1+1>-1&&parseInt(idy)-1+1<8
            &&parseInt(idx)-1-1>-1&&parseInt(idx)-1-1<8){
                attackedSquare = squares[(8*(parseInt(idy)-1+1)+parseInt(idx)-1-1)]
                attackedSquare.setAttribute("attacked","")
                if(attackedSquare.getAttribute("piece").substring(0,5)==oppositeColor){
                    attackedSquare.toggleAttribute("open-square")
                }
            }
        }
        if(document.querySelector(`[piece="${oppositeColor}-king"]`).hasAttribute("open-square")){
                document.querySelector(`[piece="${oppositeColor}-king"]`).setAttribute("check","")
                let square = squares[8*(parseInt(idy)-1)+parseInt(idx)-1]
                newAttacker = {piece:piece,square:square}
                piecesAttackingKing.push(newAttacker)
                // console.log("adding check to",document.querySelector(`[piece="${oppositeColor}-king"]`))
        }
        document.querySelectorAll('[open-square]').forEach(square=>{
            square.toggleAttribute("open-square")
            square.setAttribute("attacked","")
        })

    })
    let king = document.querySelector(`[piece="${color}-king"]`)
    let piece = "king"
    idx = king.dataset.idx
    idy = king.dataset.idy
    window[piece+"Movement"](color,king)
    document.querySelectorAll('[open-square]').forEach(square=>{
            square.toggleAttribute("open-square")
            square.setAttribute("attacked","")
        })





    // let king = document.querySelector(`[piece="${color}-king"]`)
    // let piece = king.getAttribute("piece").slice(6)
    //     // console.log()
    // idx = king.dataset.idx
    // idy = king.dataset.idy
    
    // try{
    //     window[piece+"Movement"](color,king)
    // }
    // catch{}
    // document.querySelectorAll('[open-square]').forEach(square=>{
    //         square.toggleAttribute("open-square")
    //         square.setAttribute("attacked","")
    //     })

    // document.querySelectorAll(".open-square").forEach(square=>{
    //     square.toggleAttribute("attacked")
    // })
    //we cant just get all the open squares after we click on all of the pieces
    //because of the pawns!!!
    
}



function allPossibleColorMoves(color){
    // try{
    //         document.querySelector('[check]').removeAttribute("check")
    //     }
    //     catch{}
    // check = document.querySelector('[check]')
    // console.log(check)
    let oppositeColor = setOppositeColor(color)
    // clickAllColorPieces(oppositeColor)
    let moves = []
    pieces = document.querySelectorAll(`[piece="${color}-pawn"],[piece="${color}-bishop"],[piece="${color}-knight"],[piece="${color}-queen"],[piece="${color}-king"],[piece="${color}-rook"]`)

    pieces.forEach(start=>{
        piece = start.getAttribute("piece")
        
        vars[color+"LastSelectedPiece"] = piece
        vars[color+"LastSelectedLocation"] = 8*(parseInt(start.dataset.idy)-1)+parseInt(start.dataset.idx)-1
        // console.log(piece)
        // console.log(start)
        // console.log(start.classList)
        // clickPiece(color,start)
        idx = start.dataset.idx
        idy = start.dataset.idy
        try{
            window[piece.slice(6)+"Movement"](color,start)

        }
        catch{
            console.log("error calling piece.slice(6) when piece is",piece)
        }
        
        // console.log("IN ALL POSSIBLE, PIECE IS",piece)
        //c
        // 
        // console.log()
        // doesMoveHangColorKing(color)
        

        openSquares = document.querySelectorAll('[open-square]')

        

        
        openSquares.forEach(target=>{

            if(piece=="white-pawn"&&target.dataset.idy==1){
                candidate = ({piece:"white-queen",start:start,target:target})
            }
            else if(piece=="black-pawn"&&target.dataset.idy==8){
                candidate = ({piece:"black-queen",start:start,target:target})
            }
            else{
                candidate = ({piece:piece,start:start,target:target})
                // console.log("candidate:",candidate.start.classList)
            }
            // console.log("calling doesmove w/",candidate,color,"returns:",doesMoveHangColorKing3(color,candidate))
            if(!doesMoveHangColorKing3(color,candidate)){
                candidate.prune = false
                moves.push(candidate)
            }
            else{
                // console.log(candidate,"hangs king")
                // console.log(asdf)
            }
            target.removeAttribute("open-square")
        })
    })

    
    castleMoves = document.querySelectorAll('[castleable]')
        castleMoves.forEach(target=>{
            if(target==squares[62]){
                candidate = {piece:"white-king",start:document.querySelector('[piece="white-king"'),target,castle:"whiteCastleKS",prune:false}
                candidate.prune = false
                moves.push(candidate)
            }
            else if(target==squaresMatrix[7][2]){
                candidate = {piece:"white-king",start:document.querySelector('[piece="white-king"'),target,castle:"whiteCastleQS",prune:false}
                candidate.prune = false
                moves.push(candidate)
            }
            else if(target==squaresMatrix[0][2]){
                candidate = {piece:"black-king",start:document.querySelector('[piece="black-king"'),target,castle:"blackCastleQS",prune:false}
                candidate.prune = false
                moves.push(candidate)
            }
            else{
                candidate = {piece:"black-king",start:document.querySelector('[piece="black-king"'),target,castle:"blackCastleKS",prune:false}
                candidate.prune = false
                moves.push(candidate)
            }
        })
    // if(moves.length==0){
    //     staleMate(color)
    // }
    // console.log(moves)
    return moves
}

function draw(){
    console.log("calling draw")
    let winner=document.querySelector(".winner")
    winner.innerHTML="draw."
    // currentPlayer.innerHTML=""
    // var x = document.querySelector('.player')
    // x.innerHTML=''
    var span = document.querySelector(".currentPlayer");
    //console.log(span.childNodes[1])
    span.removeChild(span.childNodes[1]);  
}



function checkForDraw(){
   // since chess is "solved" when there are less than seven pieces available, we could check for this and 
   // then consult a database for the correct moves (does such a database exist?)
}





//depth is counted in "ply", which is either white or black moving (not both)
//this is a bounded depth first search algorithm that finds and evaluates all possible
//positions after a certain amount of moves

//alpha is the best value that white can guarantee at the current depth, or above
//beta is the best value that black can guarantee at the current depth, or abve


function makeMove(color,move){
        let oppositeColor = setOppositeColor()
 
        move.start.classList.remove(move.piece)

        if(move.start.hasAttribute(color+"-en-passant-pawn")){
            // console.log("triggered temp3")
            temp3Holder = true
            move.start.classList.remove(color+"-en-passant-pawn")

        }
        if(vars[oppositeColor+"Pieces"].includes(move.target.classList[1])){
            tempHolder = true
            // console.log(move.target.classList)
            temp = move.target.classList[1]
            // console.log("removing",temp)

            move.target.classList.remove(temp)
            // console.log(move.target)
            if(move.target.classList[1]==oppositeColor+"-en-passant-pawn"){
                temp2Holder = true
                temp2 = move.target.classList[1]
                move.target.classList.remove(temp2)
            }
            // console.log(bre)
        }
        move.target.classList.add(move.piece)

        //before will evaluate, see if we would be checking the enemy
        
        // move.score = evaluate()
        
        // console.log(move)
        // console.log(move.score)
        // console.log(temp)
        // console.log(move)

        // if we just simulated a white piece moving, then we can clear
        //black en passant pawn
        clearEnPassant(oppositeColor)
    }

    


function whatSquaresCanColorAttack(color){
    Pawns = document.querySelectorAll("."+color+"-pawn")

    Pawns.forEach(square=>{
        clickPiece(color,square)
    })

    Knights = document.querySelectorAll("."+color+"-knight")
    Knights.forEach(square=>{
        clickPiece(color,square)
    })

    Bishops = document.querySelectorAll("."+color+"-bishop")
    Bishops.forEach(square=>{
        clickPiece(color,square)
    })

    Rooks = document.querySelectorAll("."+color+"-rook")
    Rooks.forEach(square=>{
        clickPiece(color,square)
    })

    King = document.querySelectorAll("."+color+"-king")
    King.forEach(square=>{
        clickPiece(color,square)
    })

    Queen = document.querySelectorAll("."+color+"-queen")
    Queen.forEach(square=>{
        clickPiece(color,square)
    })
    vars["squares"+color+"CanAttack"] = document.querySelectorAll("open-square")
}



function whiteHighlight(){
    console.log("calling whiteHighlight")
    // //console.log("calling highlight")
    let square = squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1]
    // if(square.hasAttribute("open-square")){
        if(square.classList[0]==="blackSquare"){
        square.classList.add("highlight-dark")
            }
            else{
                square.classList.add("highlight-light")
        }
    // }
}

function whiteUnhighlight(){
    console.log("calling whiteUnhighlight")
    let square = squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1]
    if(square.classList[0]==="blackSquare"){
        square.classList.remove("highlight-dark")
    }
    else{
        square.classList.remove("highlight-light")
    }
}



async function whitePawnPromotion(squareIndex){

    document.querySelectorAll('[captureable]').forEach(square=>{
        square.toggleAttribute('captureable')
    })
    console.log("calling whitePAwnPromotion, squareindex = ",squareIndex)
    // console.log("calling squareIndex")
    // document.addEventListener("mouseover",whitePawnPromotion)
    // squares.forEach(square =>{
    //     square.removeEventListener("click",whiteClickBox)
    // })
    square = squares[squareIndex]
    square.setAttribute("piece","")
    // square.classList.add("white-queen")
    square.toggleAttribute("prom-white-queen")
    //console.log(square.classList)
    squares[arguments[0]+8].toggleAttribute("prom-white-knight")
    //console.log(squares[arguments[0]+8].classList)
    squares[arguments[0]+16].toggleAttribute("prom-white-rook")
    squares[arguments[0]+24].toggleAttribute("prom-white-bishop")
    // squares[arguments[0]+8].addEventListener(pawnHighlight)
    square.toggleAttribute("pawn-promotion")
    square.addEventListener("mouseover",whitePawnHighlight)
    squares[arguments[0]+8].addEventListener("mouseover",whitePawnHighlight)
    squares[arguments[0]+16].addEventListener("mouseover",whitePawnHighlight)
    squares[arguments[0]+24].addEventListener("mouseover",whitePawnHighlight)
    square.addEventListener("mouseout",whitePawnUnhighlight)
    squares[arguments[0]+8].addEventListener("mouseout",whitePawnUnhighlight)
    squares[arguments[0]+16].addEventListener("mouseout",whitePawnUnhighlight)
    squares[arguments[0]+24].addEventListener("mouseout",whitePawnUnhighlight)
    square.addEventListener("click",whitePromotionChooser)
    squares[arguments[0]+8].addEventListener("click",whitePromotionChooser)
    squares[arguments[0]+16].addEventListener("click",whitePromotionChooser)
    squares[arguments[0]+24].addEventListener("click",whitePromotionChooser)
    //console.log(square.classList)



    // if(MouseEvent===onclick){
    //     square.classList.remove("pawn-promotion")
    //     squares[arguments[0]+8].classList.remove("pawn-promotion")
    //     squares[arguments[0]+16].classList.remove("pawn-promotion")
    //     squares[arguments[0]+24].classList.remove("pawn-promotion")
    // }
}


    
    


async function whitePromotionChooser(){

   
    // return new Promise((resolve,reject)=>{
    //here our function should be implemented 
        // setTimeout(()=>{
            // console.log(square)
    console.log("calling whitePromotionChooser")
    let square = squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1]
//console.log(square.classList)
    //console.log(parseInt(this.dataset.idy))
   

    if(parseInt(this.dataset.idy)-1==0){
        square = squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1]
        square.setAttribute("piece","white-queen")
        square.toggleAttribute("prom-white-queen")
        square.toggleAttribute("pawn-promotion")

        
        //console.log("you chose queen")
        squares[8*(parseInt(this.dataset.idy)-1+1)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-white-knight")
        squares[8*(parseInt(this.dataset.idy)-1+2)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-white-rook")
        squares[8*(parseInt(this.dataset.idy)-1+3)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-white-bishop")
        // square.classList.remove("pawn-promotion")
    }
    else if(parseInt(this.dataset.idy)-1==1){
        square = squares[8*(parseInt(this.dataset.idy)-1-1)+parseInt(this.dataset.idx)-1]
        square.toggleAttribute("prom-white-queen")
        square.setAttribute("piece","white-knight")
        square.toggleAttribute("pawn-promotion")

        //console.log(square.classList)
        //console.log("you chose knight")
        squares[8*(parseInt(this.dataset.idy)-1+0)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-white-knight")
        squares[8*(parseInt(this.dataset.idy)-1+1)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-white-rook")
        squares[8*(parseInt(this.dataset.idy)-1+2)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-white-bishop")
    }
    else if(parseInt(this.dataset.idy)-1==2){
        square = squares[8*(parseInt(this.dataset.idy)-1-2)+parseInt(this.dataset.idx)-1]
        square.toggleAttribute("prom-white-queen")
        square.setAttribute("piece","white-rook")
        square.toggleAttribute("pawn-promotion")

        //console.log(square.classList)
        squares[8*(parseInt(this.dataset.idy)-1-1)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-white-knight")
        squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-white-rook")
        squares[8*(parseInt(this.dataset.idy)-1+1)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-white-bishop")
        //console.log("you chose rook")
    }
    else if(parseInt(this.dataset.idy)-1==3){
        square = squares[8*(parseInt(this.dataset.idy)-1-3)+parseInt(this.dataset.idx)-1]
        square.toggleAttribute("prom-white-queen")
        square.setAttribute("piece","white-bishop")
        square.toggleAttribute("pawn-promotion")
        squares[8*(parseInt(this.dataset.idy)-1-2)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-white-knight")
        squares[8*(parseInt(this.dataset.idy)-1-1)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-white-rook")
        squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-white-bishop")
        //console.log("you chose bishop")
    }

    document.querySelectorAll('[pawn-promotion]').forEach(square=>{
        square.removeAttribute("pawn-promotion")
    })
    // square.classList.remove("pawn-promotion")

    removeLastPieceEventListeners(currentColor)

    document.querySelector(`[piece="${currentColor}-king"]`).removeAttribute("check")
    clearPrevious(currentColor)
    clickAllColorPieces(currentColor)
    switchTurn()
    squares.forEach(square =>{
        // square.addEventListener("click",blackClickBox)
        square.removeEventListener("click",whitePromotionChooser)
        square.removeEventListener("mouseover",whitePawnHighlight)
        square.removeEventListener("mouseout",whitePawnUnhighlight)

    })
    
    // isBlackKinginCheck(document.getElementsByClassName("black-king")[0])
    // if(document.querySelector('[piece="black-king"]').hasAttribute("check")){
    //     didBlackGetMated()
    // }
    // if(whiteWon){
    //     whiteWins()
    // }
    console.log("ending white promotion chooser")
            
}

function whitePawnHighlight(){
    squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1].toggleAttribute("pawn-promotion")

}

function whitePawnUnhighlight(){
    squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1].toggleAttribute("pawn-promotion")
}

function blackHighlight(){
    // //console.log("calling highlight")
    console.log("calling blackHighlight")
    let square = squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1]
    // if(square.hasAttribute("open-square")){
        if(square.classList[0]==="blackSquare"){
        square.classList.add("highlight-dark")
            }
            else{
                square.classList.add("highlight-light")
        }
    // }
}

function blackUnhighlight(){
    console.log("calling blackUnhighlight")
    let square = squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1]
    if(square.classList[0]==="blackSquare"){
        square.classList.remove("highlight-dark")
            }
            else{
                square.classList.remove("highlight-light")
        }
}

async function blackPromotionChooser(){

    
    // return new Promise((resolve,reject)=>{
    //here our function should be implemented 
        // setTimeout(()=>{
            // console.log(square)
    console.log("calling blackPromotionChooser")
    let square = squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1]
    //console.log(square.classList)
    //console.log(parseInt(this.dataset.idy))

    console.log("this idy = ",)

    if(parseInt(this.dataset.idy)-1==7){
        square = squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1]
        square.setAttribute("piece","black-queen")
        square.toggleAttribute("prom-black-queen")
        square.toggleAttribute("pawn-promotion")

        
        // console.log("you chose queen")
        squares[8*(parseInt(this.dataset.idy)-1-1)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-black-knight")
        squares[8*(parseInt(this.dataset.idy)-1-2)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-black-rook")
        squares[8*(parseInt(this.dataset.idy)-1-3)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-black-bishop")
        // square.classList.remove("pawn-promotion")
    }
    else if(parseInt(this.dataset.idy)-1==6){
        square = squares[8*(parseInt(this.dataset.idy)-1+1)+parseInt(this.dataset.idx)-1]
        square.toggleAttribute("prom-black-queen")
        square.setAttribute("piece","black-knight")
        square.toggleAttribute("pawn-promotion")

        //console.log(square.classList)
        //console.log("you chose knight")
        squares[8*(parseInt(this.dataset.idy)-1+0)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-black-knight")
        squares[8*(parseInt(this.dataset.idy)-1-1)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-black-rook")
        squares[8*(parseInt(this.dataset.idy)-1-2)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-black-bishop")
    }
    else if(parseInt(this.dataset.idy)-1==5){
        square = squares[8*(parseInt(this.dataset.idy)-1+2)+parseInt(this.dataset.idx)-1]
        square.toggleAttribute("prom-black-queen")
        square.setAttribute("piece","black-rook")
        square.toggleAttribute("pawn-promotion")

        //console.log(square.classList)
        squares[8*(parseInt(this.dataset.idy)-1+1)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-black-knight")
        squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-black-rook")
        squares[8*(parseInt(this.dataset.idy)-1-1)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-black-bishop")
        //console.log("you chose rook")
    }
    else if(parseInt(this.dataset.idy)-1==4){
        square = squares[8*(parseInt(this.dataset.idy)-1+3)+parseInt(this.dataset.idx)-1]
        square.toggleAttribute("prom-black-queen")
        square.setAttribute("piece","black-bishop")
        square.toggleAttribute("pawn-promotion")
        squares[8*(parseInt(this.dataset.idy)-1+2)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-black-knight")
        squares[8*(parseInt(this.dataset.idy)-1+1)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-black-rook")
        squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1].toggleAttribute("prom-black-bishop")
        //console.log("you chose bishop")
    }

    document.querySelectorAll('[pawn-promotion]').forEach(square=>{
        square.removeAttribute("pawn-promotion")
    })
    // square.classList.remove("pawn-promotion")

    removeLastPieceEventListeners(currentColor)

    document.querySelector(`[piece="${currentColor}-king"]`).removeAttribute("check")
    clearPrevious(currentColor)
    clickAllColorPieces(currentColor)
    switchTurn()
    squares.forEach(square =>{
        // square.addEventListener("click",blackClickBox)
        square.removeEventListener("click",blackPromotionChooser)
        square.removeEventListener("mouseover",blackPawnHighlight)
        square.removeEventListener("mouseout",blackPawnUnhighlight)

    })

    // isBlackKinginCheck(document.getElementsByClassName("black-king")[0])
    // if(document.querySelector('[piece="white-king"]').hasAttribute("check")){
    //     didWhitekGetMated()
    // }
    // if(blackWon){
    //     blackWins()
    // }
    console.log("ending black promotion chooser")
            
}

async function blackPawnPromotion(squareIndex){

    document.querySelectorAll('[captureable]').forEach(square=>{
        square.toggleAttribute('captureable')
    })
    console.log("calling blackPAwnPromotion, squareindex = ",squareIndex)
    // console.log("calling squareIndex")
    // document.addEventListener("mouseover",whitePawnPromotion)
    // squares.forEach(square =>{
    //     square.removeEventListener("click",whiteClickBox)
    // })
    square = squares[squareIndex]
    square.setAttribute("piece","")
    // square.classList.add("white-queen")
    square.toggleAttribute("prom-black-queen")
    //console.log(square.classList)
    squares[arguments[0]-8].toggleAttribute("prom-black-knight")
    //console.log(squares[arguments[0]+8].classList)
    squares[arguments[0]-16].toggleAttribute("prom-black-rook")
    squares[arguments[0]-24].toggleAttribute("prom-black-bishop")
    // squares[arguments[0]+8].addEventListener(pawnHighlight)
    square.toggleAttribute("pawn-promotion")
    square.addEventListener("mouseover",blackPawnHighlight)
    squares[arguments[0]-8].addEventListener("mouseover",blackPawnHighlight)
    squares[arguments[0]-16].addEventListener("mouseover",blackPawnHighlight)
    squares[arguments[0]-24].addEventListener("mouseover",blackPawnHighlight)
    square.addEventListener("mouseout",blackPawnUnhighlight)
    squares[arguments[0]-8].addEventListener("mouseout",blackPawnUnhighlight)
    squares[arguments[0]-16].addEventListener("mouseout",blackPawnUnhighlight)
    squares[arguments[0]-24].addEventListener("mouseout",blackPawnUnhighlight)
    square.addEventListener("click",blackPromotionChooser)
    squares[arguments[0]-8].addEventListener("click",blackPromotionChooser)
    squares[arguments[0]-16].addEventListener("click",blackPromotionChooser)
    squares[arguments[0]-24].addEventListener("click",blackPromotionChooser)
    //console.log(square.classList)



    // if(MouseEvent===onclick){
    //     square.classList.remove("pawn-promotion")
    //     squares[arguments[0]+8].classList.remove("pawn-promotion")
    //     squares[arguments[0]+16].classList.remove("pawn-promotion")
    //     squares[arguments[0]+24].classList.remove("pawn-promotion")
    // }
}


function blackPawnHighlight(){
    squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1].toggleAttribute("pawn-promotion")
}

function blackPawnUnhighlight(){
    console.log("calling blackPawnUnhighlight")
    squares[8*(parseInt(this.dataset.idy)-1)+parseInt(this.dataset.idx)-1].toggleAttribute("pawn-promotion")
}


function didBlackGetMated(){
    console.log("calling didBlackGetMated")
    allPossibleMoves = []
    squares.forEach(square=>{
        if(square.hasAttribute("black-pawn")){
            // //console.log("found one")
            // //console.log(square)

            blackPawn(square)
            blackLastSelectedPiece = square.classList[1]
            blackLastSelectedLocation = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
            doesMoveHangBlackKing(true)


            
        }
        else if(square.hasAttribute("black-bishop")){
            // //console.log("found one")
            // //console.log(square)

            blackBishop(square)
            blackLastSelectedPiece = square.classList[1]
            blackLastSelectedLocation = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
            doesMoveHangBlackKing(true)


            
        }
        else if(square.hasAttribute("black-rook")){
            // //console.log("found one")
            // //console.log(square)

            blackRook(square)
            blackLastSelectedPiece = square.classList[1]
            blackLastSelectedLocation = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
            doesMoveHangBlackKing(true)


            
        }
        else if(square.hasAttribute("black-knight")){
            // //console.log("found one")
            // //console.log(square)

            blackKnight(square)
            blackLastSelectedPiece = square.classList[1]
            blackLastSelectedLocation = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
            doesMoveHangBlackKing(true)


            
        }
        else if(square.hasAttribute("black-queen")){
            // //console.log("found one")
            // //console.log(square)
            blackQueen(square)
            blackLastSelectedPiece = square.classList[1]
            blackLastSelectedLocation = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
            doesMoveHangBlackKing(true)

        }
        else if(square.hasAttribute("black-king")){
            // //console.log("found one")
            // //console.log(square)
            blackLastSelectedPiece = square.classList[1]
            blackLastSelectedLocation = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
            blackKing(square)
            doesMoveHangBlackKing(true)

        }
        openSquares = document.getElementsByClassName("open-square")
        for(let square of openSquares){
            allPossibleMoves.push(square)
            square.classList.remove("open-square")
        }
    })
    
    if(allPossibleMoves.length==0){
        whiteWon = true
    }
    
}

function didColorGetMated2(color){
    console.log("calling didColorGetMated2")
    moves = allPossibleColorMoves(color)
    if(moves.length==0)
        colorWins(setOppositeColor(color))

}

function didColorGetMated(color){
    console.log("calling didColorGetMated",color)
    allPossibleMoves = []
    pawns = document.querySelectorAll("."+color+"-pawn")
    
    pawns.forEach(square=>{
        clickPiece(color,square)
        vars[color+"LastSelectedPiece"] = square.classList[1]
        vars[color+"LastSelectedLocation"] = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
        // openSquares = document.getElementsByClassName("open-square")
        doesMoveHangColorKing(color,true)
    })

    knights = document.querySelectorAll("."+color+"-knight")
    knights.forEach(square=>{
        clickPiece(color,square)
        vars[color+"LastSelectedPiece"] = square.classList[1]
        vars[color+"LastSelectedLocation"] = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
        doesMoveHangColorKing(color)
    })

    bishops = document.querySelectorAll("."+color+"-bishop")
    bishops.forEach(square=>{
        clickPiece(color,square)
        vars[color+"LastSelectedPiece"] = square.classList[1]
        vars[color+"LastSelectedLocation"] = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
        doesMoveHangColorKing(color)
    })

    rooks = document.querySelectorAll("."+color+"-rook")
    rooks.forEach(square=>{
        clickPiece(color,square)
        vars[color+"LastSelectedPiece"] = square.classList[1]
        vars[color+"LastSelectedLocation"] = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
        doesMoveHangColorKing(color)
    })

    king = document.querySelectorAll("."+color+"-king")
    king.forEach(square=>{
        clickPiece(color,square)
        vars[color+"LastSelectedPiece"] = square.classList[1]
        vars[color+"LastSelectedLocation"] = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
        doesMoveHangColorKing(color)
    })

    queen = document.querySelectorAll("."+color+"-queen")
    queen.forEach(square=>{
        clickPiece(color,square)
        vars[color+"LastSelectedPiece"] = square.classList[1]
        vars[color+"LastSelectedLocation"] = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
        doesMoveHangColorKing(color)
    })

    let openSquares =  document.querySelectorAll(".open-square")
    console.log(openSquares.length)
    openSquares.forEach(square=>{
        console.log(square)
        allPossibleMoves.push(square)
        square.classList.remove("open-square")
    })
    
    if(allPossibleMoves.length==0){
        colorWins(setOppositeColor(color))
    }
    
}

function didWhiteGetMated(){
    console.log("calling didWhiteGetMated")
    allPossibleMoves = []
    squares.forEach(square=>{
        if(square.hasAttribute("white-pawn")){
            // //console.log("found one")
            // //console.log(square)

            whitePawn(square)
            // whiteLastSelectedPiece = square.classList[1]
            whiteLastSelectedPiece =  square.classList[1]
            whiteLastSelectedLocation = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
            doesMoveHangWhiteKing(true)


            
        }
        else if(square.hasAttribute("white-bishop")){
            // //console.log("found one")
            // //console.log(square)

            whiteBishop(square)
            whiteLastSelectedPiece = square.classList[1]
            whiteLastSelectedLocation = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
            doesMoveHangWhiteKing(true)


            
        }
        else if(square.hasAttribute("white-rook")){
            // //console.log("found one")
            // //console.log(square)

            whiteRook(square)
            whiteLastSelectedPiece = square.classList[1]
            whiteLastSelectedLocation = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
            doesMoveHangWhiteKing(true)


            
        }
        else if(square.hasAttribute("white-knight")){
            // //console.log("found one")
            // //console.log(square)

            whiteKnight(square)
            whiteLastSelectedPiece = square.classList[1]
            whiteLastSelectedLocation = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
            doesMoveHangWhiteKing(true)


            
        }
        else if(square.hasAttribute("white-queen")){
            // //console.log("found one")
            // //console.log(square)
            whiteQueen(square)
            whiteLastSelectedPiece = square.classList[1]
            whiteLastSelectedLocation = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
            doesMoveHangWhiteKing(true)

        }
        else if(square.hasAttribute("white-king")){
            // //console.log("found one")
            // //console.log(square)
            whiteLastSelectedPiece = square.classList[1]
            whiteLastSelectedLocation = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
            whiteKing(square)
            doesMoveHangWhiteKing(true)

        }
        openSquares = document.getElementsByClassName("open-square")
        for(let square of openSquares){
            allPossibleMoves.push(square)
            square.classList.remove("open-square")
            square.classList.remove("selecting-dark")
        }
        
        // square.classList.remove("open-square")
    })
    
    if(allPossibleMoves.length==0){
        blackWon = true
    }
    
}

function colorKinginCheck(color,square){ //square is king's square
    
    clickAllColorPieces(oppositeColor)
    // console.log(asdf)
    square.toggleAttribute("check")
    // if(square.hasAttribute("capturable-light")
    // ||square.hasAttribute("capturable-dark")
    // ||square.hasAttribute("open-square"))
    if(square.hasAttribute("open-square")){
        // console.log("KING WOULD BE IN CHECK")
        // console.log(square)
        //console.log("white king now in check")
        // square.classList.add("check")
        inCheck = true
    }
    else
        inCheck = false
    squares.forEach(square=>{

        square.toggleAttribute("open-square")
        square.toggleAttribute("selecting-light")
        square.toggleAttribute("selecting-dark")
        square.toggleAttribute("capturable-light")
        square.toggleAttribute("capturable-dark")
        square.toggleAttribute("castleable-light")
        square.toggleAttribute("castleable-dark")
        square.removeEventListener("click",movePiece)
    })
    return inCheck

}

function whiteRemoveLastPieceEventListeners(square){
    // if (whiteLastSelectedPiece==="white-pawn"){
    //     // square.addEventListener("click",whitePawn)
    //     squares[whiteLastSelectedLocation].removeEventListener("click",whitePawn)
    // }
    // else if(whiteLastSelectedPiece==="white-rook"){
    //     // square.addEventListener("click",whiteRook)
    //     squares[whiteLastSelectedLocation].removeEventListener("click",whiteRook)
    // }
    // else if(whiteLastSelectedPiece==="white-bishop"){
    //     // square.addEventListener("click",whiteBishop)
    //     squares[whiteLastSelectedLocation].removeEventListener("click",whiteBishop)
    // }
    // else if(whiteLastSelectedPiece==="white-king"){
    //     // square.addEventListener("click",whiteKing)
    //     squares[whiteLastSelectedLocation].removeEventListener("click",whiteKing)
    // }
    // else if(whiteLastSelectedPiece==="white-queen"){
    //     // square.addEventListener("click",whiteQueen)
    //     squares[whiteLastSelectedLocation].removeEventListener("click",whiteQueen)
    // }
    // else if(whiteLastSelectedPiece==="white-knight"){
    //     // square.addEventListener("click",whiteKnight)
    //     squares[whiteLastSelectedLocation].removeEventListener("click",whiteKnight)
    // }
    squares[whiteLastSelectedLocation].removeEventListener("click",whiteKnight)
    squares[whiteLastSelectedLocation].removeEventListener("click",whiteQueen)
    squares[whiteLastSelectedLocation].removeEventListener("click",whiteKing)
    squares[whiteLastSelectedLocation].removeEventListener("click",whiteBishop)
    squares[whiteLastSelectedLocation].removeEventListener("click",whiteRook)
    squares[whiteLastSelectedLocation].removeEventListener("click",whitePawn)





}
function removeLastPieceEventListeners(color){
    
    squares[vars[color+"LastSelectedLocation"]].removeEventListener("click",clickPiece)
    // squares[vars[color+"LastSelectedLocation"]].removeEventListener("click",clickPawn)
    // squares[vars[color+"LastSelectedLocation"]].removeEventListener("click",clickKnight)
    // squares[vars[color+"LastSelectedLocation"]].removeEventListener("click",clickQueen)
    // squares[vars[color+"LastSelectedLocation"]].removeEventListener("click",clickKing)
    // squares[vars[color+"LastSelectedLocation"]].removeEventListener("click",clickBishop)
    // squares[vars[color+"LastSelectedLocation"]].removeEventListener("click",clickRook)




}

function blackRemoveLastPieceEventListeners(square){
    // if (blackLastSelectedPiece==="black-pawn"){
    //     // square.addEventListener("click",blackPawn)
    //     squares[blackLastSelectedLocation].removeEventListener("click",blackPawn)
    // }
    // else if(blackLastSelectedPiece==="black-rook"){
    //     // square.addEventListener("click",blackRook)
    //     squares[blackLastSelectedLocation].removeEventListener("click",blackRook)
    // }
    // else if(blackLastSelectedPiece==="black-bishop"){
    //     // square.addEventListener("click",blackBishop)
    //     squares[blackLastSelectedLocation].removeEventListener("click",blackBishop)
    // }
    // else if(blackLastSelectedPiece==="black-king"){
    //     // square.addEventListener("click",blackKing)
    //     squares[blackLastSelectedLocation].removeEventListener("click",blackKing)
    // }
    // else if(blackLastSelectedPiece==="black-queen"){
    //     // square.addEventListener("click",blackQueen)
    //     squares[blackLastSelectedLocation].removeEventListener("click",blackQueen)
    // }
    // else if(blackLastSelectedPiece==="black-knight"){
    //     // square.addEventListener("click",blackKnight)
    //     squares[blackLastSelectedLocation].removeEventListener("click",blackKnight)
    // }
    console.log("removing event listeners from :")
    console.log(squares[blackLastSelectedLocation])
    squares[blackLastSelectedLocation].removeEventListener("click",blackKnight)
    squares[blackLastSelectedLocation].removeEventListener("click",blackQueen)
    squares[blackLastSelectedLocation].removeEventListener("click",blackKing)
    squares[blackLastSelectedLocation].removeEventListener("click",blackBishop)
    squares[blackLastSelectedLocation].removeEventListener("click",blackRook)
    squares[blackLastSelectedLocation].removeEventListener("click",blackPawn)





}

function addWhitePieceEventListeners(){
    
    whitePawns = document.querySelectorAll(".white-pawn")
    whitePawns.forEach(square =>{
        square.addEventListener("click",whitePawn)
    })
    whiteBishops = document.querySelectorAll(".white-bishop")
    whiteBishops.forEach(square =>{
        square.addEventListener("click",whiteBishop)
    })
    whiteKnights = document.querySelectorAll(".white-knight")
    whiteKnights.forEach(square =>{
        square.addEventListener("click",whiteKnight)
    })
    whiteRooks = document.querySelectorAll(".white-rook")
    whiteRooks.forEach(square =>{
        square.addEventListener("click",whiteRook)
    })
    whiteking = document.querySelector(".white-king")
    
    whiteking.addEventListener("click",whiteKing)
    
    whitequeen = document.querySelector(".white-queen")
    whitequeen.addEventListener("click",whiteQueen)
}


function addBlackPieceEventListeners(){
    
    blackPawns = document.querySelectorAll(".black-pawn")

    blackPawns.forEach(square =>{
        // console.log(square)
        square.addEventListener("click",blackPawn)
    })
    blackBishops = document.querySelectorAll(".black-bishop")
    blackBishops.forEach(square =>{
        square.addEventListener("click",blackBishop)
    })
    blackKnights = document.querySelectorAll(".black-knight")
    blackKnights.forEach(square =>{
        square.addEventListener("click",blackKnight)
    })
    blackRooks = document.querySelectorAll(".black-rook")
    blackRooks.forEach(square =>{
        square.addEventListener("click",blackRook)
    })
    blackking = document.querySelector(".black-king")
    
    blackking.addEventListener("click",blackKing)
    
    blackqueen = document.querySelector(".black-queen")
    blackqueen.addEventListener("click",blackQueen)
}

function addPieceEventListeners(color){
    // console.log("calling addPieceEventListeners"+color)
    // pieces = document.querySelectorAll("."+color+"-knight,."+color+"-pawn,."+color+"-bishop,."+color+"-rook,."+color+"-king,."+color+"-queen")
    pieces = document.querySelectorAll(`[piece="${color}-pawn"],[piece="${color}-bishop"],[piece="${color}-knight"],[piece="${color}-queen"],[piece="${color}-king"],[piece="${color}-rook"]`)
    // console.log(pieces)
    
    pieces.forEach(square=>{
        square.addEventListener("click",clickPiece)
    })

    // bishops = document.querySelectorAll("."+color+"-bishop")
    // bishops.forEach(square =>{
    //     square.addEventListener("click",clickBishop)
    // })
    // knights = document.querySelectorAll("."+color+"-knight")
    // knights.forEach(square =>{
    //     square.addEventListener("click",clickKnight)
    // })
    // rooks = document.querySelectorAll("."+color+"-rook")
    // whiteRooks.forEach(square =>{
    //     square.addEventListener("click",clickRook)
    // })
    // king = document.querySelector("."+color+"-king")
    
    // king.addEventListener("click",clickKing)
    
    // queen = document.querySelector("."+color+"-queen")
    // queen.addEventListener("click",clickQueen)
}


function removeWhitePieceEventListeners(){
    whitePawns = document.querySelectorAll(".white-pawn")
    whitePawns.forEach(square =>{
        square.removeEventListener("click",whitePawn)
    })
    whiteBishops = document.querySelectorAll(".white-bishop")
    whiteBishops.forEach(square =>{
        square.removeEventListener("click",whiteBishop)
    })
    whiteKnights = document.querySelectorAll(".white-knight")
    whiteKnights.forEach(square =>{
        square.removeEventListener("click",whiteKnight)
    })
    whiteRooks = document.querySelectorAll(".white-rook")
    whiteRooks.forEach(square =>{
        square.removeEventListener("click",whiteRook)
    })
    whiteking = document.querySelector(".white-king")
    
    whiteking.removeEventListener("click",whiteKing)
    
    whitequeen = document.querySelector(".white-queen")
    whitequeen.removeEventListener("click",whiteQueen)
}





function removeBlackPieceEventListeners(){
    
    blackPawns = document.querySelectorAll(".black-pawn")
    blackPawns.forEach(square =>{
        square.removeEventListener("click",blackPawn)
    })
    blackBishops = document.querySelectorAll(".black-bishop")
    blackBishops.forEach(square =>{
        square.removeEventListener("click",blackBishop)
    })
    blackKnights = document.querySelectorAll(".black-knight")
    blackKnights.forEach(square =>{
        square.removeEventListener("click",blackKnight)
    })
    blackRooks = document.querySelectorAll(".black-rook")
    blackRooks.forEach(square =>{
        square.removeEventListener("click",blackRook)
    })
    blackking = document.querySelector(".black-king")
    
    blackking.removeEventListener("click",blackKing)
    
    blackqueen = document.querySelector(".black-queen")
    blackqueen.removeEventListener("click",blackQueen)
}

function removePieceEventListeners(color){
    // document.releaseEvents("click",clickPiece)
    // pieces = document.querySelectorAll("."+color+"-pawn","."+color+"-knight")
    pieces = document.querySelectorAll(`[piece="${color}-pawn"],[piece="${color}-bishop"],[piece="${color}-knight"],[piece="${color}-queen"],[piece="${color}-king"],[piece="${color}-rook"]`)

    
    pieces.forEach(square=>{
        square.removeEventListener("click",clickPiece)
        // console.log("removing click from",square)
    })


    // pawns = document.querySelectorAll("."+color+"+-pawn")
    // pawns.forEach(square =>{
    //     square.removeEventListener("click",clickPawn)
    // })
    // bishops = document.querySelectorAll("."+color+"+-bishop")
    // bishops.forEach(square =>{
    //     square.removeEventListener("click",clickBishop)
    // })
    // knights = document.querySelectorAll("."+color+"+-knight")
    // knights.forEach(square =>{
    //     square.removeEventListener("click",clickKnight)
    // })
    // rooks = document.querySelectorAll("."+color+"+-rook")
    // rooks.forEach(square =>{
    //     square.removeEventListener("click",clickRook)
    // })
    // king = document.querySelector("."+color+"+-king")
    
    // king.removeEventListener("click",clickKing)
    
    // queen = document.querySelector("."+color+"+-queen")
    // queen.removeEventListener("click",clickQueen)
}
    
    

function blackMovingEventListeners(square){
    if (blackLastSelectedPiece==="black-pawn"){
        square.addEventListener("click",blackPawn)
        squares[blackLastSelectedLocation].removeEventListener("click",blackPawn)
    }
    else if(blackLastSelectedPiece==="black-rook"){
        square.addEventListener("click",blackRook)
        squares[blackLastSelectedLocation].removeEventListener("click",blackRook)
    }
    else if(blackLastSelectedPiece==="black-bishop"){
        square.addEventListener("click",blackBishop)
        squares[blackLastSelectedLocation].removeEventListener("click",blackBishop)
    }
    else if(blackLastSelectedPiece==="black-king"){
        square.addEventListener("click",blackKing)
        squares[blackLastSelectedLocation].removeEventListener("click",blackKing)
    }
    else if(blackLastSelectedPiece==="black-queen"){
        square.addEventListener("click",blackQueen)
        squares[blackLastSelectedLocation].removeEventListener("click",blackQueen)
    }
    else if(blackLastSelectedPiece==="black-knight"){
        square.addEventListener("click",blackKnight)
        squares[blackLastSelectedLocation].removeEventListener("click",blackKnight)
    }
}


function clearAttacked(){
    attackedSquares = document.querySelectorAll('[attacked]')
    // console.log(pinnedPieces)
    // whiteEnPawn = document.getElementsByClassName("white-en-passant-pawn")[0]
    if(attackedSquares.length>0){
        // console.log(typeof pinnedPieces)
        attackedSquares.forEach(square=>{
            square.removeAttribute("attacked")
        })
    }


    castles = document.querySelectorAll('[castleable]')
    // console.log(pinnedPieces)
    // whiteEnPawn = document.getElementsByClassName("white-en-passant-pawn")[0]
    if(castles.length>0){
        // console.log(typeof pinnedPieces)
        castles.forEach(square=>{
            square.removeAttribute("castleable")
        })
    }
}

function clearPinned(){
    pinnedPieces = document.querySelectorAll("[pinned]")
    // console.log(pinnedPieces)
    // whiteEnPawn = document.getElementsByClassName("white-en-passant-pawn")[0]
    
    if(pinnedPieces.length>0){
        // console.log(typeof pinnedPieces)
        pinnedPieces.forEach(piece=>{
            piece.removeAttribute("pinned")
        })
    }
}


function clearCheck(){
    try{
    document.querySelector("[check]").removeAttribute("check")
    }
    catch{}
}


async function movePiece(color,square){
    console.log("calling movePiece")
    clearPinned()
    clearAttacked()
    if (color.target!=undefined){
        
        console.log("manual move")
        
        color = currentPlayer.substring(0,5)
        square = squaresMatrix[parseInt(this.dataset.idy-1)][parseInt(this.dataset.idx-1)]
        square = squaresMatrix[parseInt(this.dataset.idy-1)][parseInt(this.dataset.idx-1)]
        idx = square.dataset.idx
        idy = square.dataset.idy
    }
    oppositeColor = setOppositeColor(color)
    // console.log("calling movePiece")
    temp = vars[color+"LastSelectedLocation"]
    // console.log(temp)
    // square = squares[whiteLastSelectedLocation]
    // square = squares[8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1]
    //this is the square it moves to
    // let square = squaresMatrix[parseInt(this.dataset.idy-1)][parseInt(this.dataset.idx-1)]
    // whiteIsPromoting = false
    // selectingPieceWhite=false
    if(square.hasAttribute("en-passant-pawn")){
        // console.log("triggered")
        // square.classList.remove(oppositeColor+"-pawn")
        square.toggleAttribute("en-passant-pawn")
    }
    if(square.hasAttribute("captureable")){
        // console.log("removes piece")
        square.toggleAttribute("captureable")
        // console.log(asdf)
    }
        // if(squares[vars[color+"LastSelectedLocation"]].hasAttribute())
        
        // //console.log(whiteLastSelectedPiece)
        // //console.log(whiteLastSelectedLocation)
        // square.classList.add("taken")
    // console.log(vars[color+"LastSelectedPiece"])
    if(vars[color+"LastSelectedPiece"]=="white-king"&&whiteCastleableKS&&(square===squares[62])){

        console.log("castleing kingside")
        squaresMatrix[7][6].setAttribute("piece","white-king")
        squaresMatrix[7][5].setAttribute("piece","white-rook")
        squaresMatrix[7][7].setAttribute("piece","")
        squaresMatrix[7][4].setAttribute("piece","")
    }
    else if(vars[color+"LastSelectedPiece"]=="white-king"&&whiteCastleableQS&&(square===squaresMatrix[7][2])){
        //console.log("castleing queenside")
        squaresMatrix[7][2].setAttribute("piece","white-king")
        squaresMatrix[7][3].setAttribute("piece","white-rook")
        squares[56].setAttribute("piece","")
        squaresMatrix[7][4].setAttribute("piece","")
    }
    else if(vars[color+"LastSelectedPiece"]=="black-king"&&blackCastleableKS&&(square===squaresMatrix[0][6]||square===squaresMatrix[0][7])){
        //console.log("castleing kingside")
        squaresMatrix[0][6].setAttribute("piece","black-king")
        squaresMatrix[0][5].setAttribute("piece","black-rook")
        squaresMatrix[0][7].setAttribute("piece","")
        squaresMatrix[0][4].setAttribute("piece","")
    }
    else if(vars[color+"LastSelectedPiece"]=="black-king"&&blackCastleableQS&&(square===squaresMatrix[0][2]||square===squaresMatrix[0][0])){
        //console.log("castleing queenside")
        squaresMatrix[0][2].setAttribute("piece","black-king")
        squaresMatrix[0][3].setAttribute("piece","black-rook")
        squaresMatrix[0][0].setAttribute("piece","")
        squaresMatrix[0][4].setAttribute("piece","")
    }
    else{
        //actually adds the new piece to location that is clicked
        // console.log("adds king twice")
        square.setAttribute("piece",(vars[color+"LastSelectedPiece"]))
    }
    // console.log(vars[color+"LastSelectedPiece"])
    if(color=="white"){
        if(vars[color+"LastSelectedPiece"]==color+"-king"||vars[color+"LastSelectedLocation"]==56){
            // console.log(color,"can no longer castle QS")
            whiteCastleableQS = false;
        }
        if(vars[color+"LastSelectedPiece"]==color+"-king"||vars[color+"LastSelectedLocation"]==63){
            // console.log(color,"can no longer castle KS")
            whiteCastleableKS = false;
        }
    }
    else{
        if(vars[color+"LastSelectedPiece"]==color+"-king"||vars[color+"LastSelectedLocation"]==0){
            // console.log(color,"can no longer castle QS")
            blackCastleableQS = false;
        }
        if(vars[color+"LastSelectedPiece"]==color+"-king"||vars[color+"LastSelectedLocation"]==7){
            // console.log(color,"can no longer castle KS")
            blackCastleableKS = false;
        }
    }
    
    //actually removes the piece from its previously location
    // squares[vars[color+"LastSelectedLocation"]].classList.remove(vars[color+"LastSelectedPiece"])
    // console.log(squares[vars[color+"LastSelectedLocation"]].classList)
    let currentPiece = squares[vars[color+"LastSelectedLocation"]].getAttribute("piece")
    // console.log(currentPiece)
    squares[vars[color+"LastSelectedLocation"]].setAttribute("piece","")

    // square.classList.remove(check)
    // if( squares[whiteLastSelectedLocation].hasAttribute(check)){
    // squares[vars[color+"LastSelectedLocation"]].classList.remove("check")
    // }

    document.querySelectorAll('[open-square]').forEach(square=>{
        square.toggleAttribute("open-square")
        square.removeEventListener("click",movePiece)
        // console.log("removing movepiece from ",square)
    })

    // document.querySelector('[selecting]').removeAttribute("selecting")

    squares[vars[color+"LastSelectedLocation"]].removeAttribute("selecting")
    document.querySelectorAll('captureable').forEach(square=>{
        square.removeAttribute('captureable')
    })
    

    // squares.forEach(square =>{
    //     // square.toggleAttribute("selecting")        
    //     if(square.hasAttribute("open-square")){
            
    //         //console.log(square.classList)
    //         // if(square.classList[1]=="black-pawn"){
    //         //     square.classList.remove(square.classList[1])
    //         // }
    //         // square.Attribute("selecting-dark")        
    //         square.hasAttribute("castleable-dark")
    //         square.hasAttribute("castleable-light")
    //     }
    // });

    //need to remove casleable light and dark

    // console.log("before:",square.classList)
    //en passant candidates
    clearEnPassant("white")
    clearEnPassant("black")
    if(vars[color+"LastSelectedPiece"]=="white-pawn"&&vars[color+"LastSelectedLocation"]-16===(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)){
        square.toggleAttribute("white-en-passant-pawn")
        // console.log(square.classList)
    }
    
    else if(vars[color+"LastSelectedPiece"]=="black-pawn"&&vars[color+"LastSelectedLocation"]+16===(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)){
        square.toggleAttribute("black-en-passant-pawn")
        // console.log(square.classList)
    }
    
        //capturing en passant
    if(square.hasAttribute("white-en-passant-square")){
        squares[8*(parseInt(square.dataset.idy)-1+1)+parseInt(square.dataset.idx)-1].setAttribute("piece","")
        squares[8*(parseInt(square.dataset.idy)-1+1)+parseInt(square.dataset.idx)-1].removeAttribute("black-en-passant-pawn")
        // squares[8*(parseInt(square.dataset.idy)-1+1)+parseInt(square.dataset.idx)-1].classList.remove("capturable-light")
        // squares[8*(parseInt(square.dataset.idy)-1+1)+parseInt(square.dataset.idx)-1].classList.remove("capturable-dark")
        square.removeAttribute("white-en-passant-square")
    }
    else if(square.hasAttribute("black-en-passant-square")){
        squares[8*(parseInt(square.dataset.idy)-1-1)+parseInt(square.dataset.idx)-1].setAttribute("piece","")
        squares[8*(parseInt(square.dataset.idy)-1-1)+parseInt(square.dataset.idx)-1].removeAttribute("white-en-passant-pawn")
        //these 3 lines cause error because of this not being square. dont think they are necessary tho
        // squares[8*(parseInt(this.dataset.idy)-1+1)+parseInt(this.dataset.idx)-1].classList.remove("white-en-passant-pawn")
        // squares[8*(parseInt(this.dataset.idy)-1+1)+parseInt(this.dataset.idx)-1].classList.remove("capturable-light")
        // squares[8*(parseInt(this.dataset.idy)-1+1)+parseInt(this.dataset.idx)-1].classList.remove("capturable-dark")
        square.removeAttribute("black-en-passant-square")
    }
    
    

    //pawn promotion
    if(vars[color+"LastSelectedPiece"]==="white-pawn"&&parseInt(square.dataset.idy)===1){
        //console.log("promoting on square "+(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1))
        // square.classList.add("white-queen")
        // squares[8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1+8].classList.add("white-knight")
        // squares[8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1+16].classList.add("white-rook")
        // squares[8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1+24].classList.add("white-bishop")
        // squares[arguments[0]+8].addEventListener(pawnHighlight)
        square.setAttribute("piece","white-pawn")
        whitePawnPromotion(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)
        // await whitePromotionChooser()
        // whiteIsPromoting = true
        // square.classList.remove("white-queen")
        // squares[8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1+8].classList.remove("white-knight")
        // squares[8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1+16].classList.remove("white-rook")
        // squares[8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1+24].classList.remove("white-bishop")
    }
    else if(vars[color+"LastSelectedPiece"]==="black-pawn"&&parseInt(square.dataset.idy)===8){
        //console.log("promoting on square "+(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1))
        // square.classList.add("black-queen")
        // squares[8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1+8].classList.add("black-knight")
        // squares[8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1+16].classList.add("black-rook")
        // squares[8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1+24].classList.add("black-bishop")
        // squares[arguments[0]+8].addEventListener(pawnHighlight)
        square.classList.remove("black-pawn")
        blackPawnPromotion(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)
        // await blackPromotionChooser()
        //console.log("done promoting")
        // square.classList.remove("black-queen")
        // squares[8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1+8].classList.remove("black-knight")
        // squares[8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1+16].classList.remove("black-rook")
        // squares[8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1+24].classList.remove("black-bishop")
    }
    else{
        vars[color+"LastSelectedLocation"] = temp
    
    // addWhitePieceEventListeners()
        removeLastPieceEventListeners(color)

    
    // squares.forEach(square =>{
    //     square.addEventListener("click",blackClickBox)
    //     square.removeEventListener("click",whiteClickBox)
    // })

    
    // console.log("checking to see if",oppositeColor,"king is mated")

    //enemy now in check?
        try{
            document.querySelector('[check]').removeAttribute("check")
        }
        catch{}
        clearPrevious(color)
        clickAllColorPieces(color)
        // console.log("removing check from",document.querySelector(`[piece="${color}-king"]`))
        // console.log(Asgd)
        switchTurn()
    }
    // whiteMovingEventListeners(square)
    // whiteIsPromoting = false
    
    // if(colorKinginCheck(oppositeColor,document.getElementsByClassName(oppositeColor+"-king")[0])){
        // document.getElementsByClassName(oppositeColor+"-king")[0].classList.add("check")
        // didColorGetMated2(oppositeColor)
        
    // }
    // console.log(document.querySelector(color+"-king"))
    // document.getElementsByClassName(color+"-king")[0].classList.remove("check")
        //     // didColorGetMated(oppositeColor)

        // if(whiteLastSelectedPiece=="white-king"){
        //     squares[whiteLastSelectedLocation].classList.remove("check")
        // }
        // else{
        //     document.getElementsByClassName("white-king")[0].classList.remove("check")
        // }
    // console.log(evaluate())
    // console.log(whiteCastleableKS)
    // console.log(whiteCastleableQS)
    // console.log(blackCastleableKS)
    // console.log(blackCastleableQS)
    // console.log(allPossibleColorMoves(oppositeColor))
}
                
function clearEnPassant(color){
    let enPawn = document.querySelector(`[${color}-en-passant-pawn]`)
    // console.log(color)
    // whiteEnPawn = document.getElementsByClassName("white-en-passant-pawn")[0]
    if(enPawn != null){
        enPawn.toggleAttribute(color+"-en-passant-pawn")
    }
}





function whiteSelectingPiece(){
    let square = squaresMatrix[parseInt(this.dataset.idy-1)][parseInt(this.dataset.idx-1)]
}



function removeWhiteSelections(){
    console.log("calling removeWhiteSelections")
    squares.forEach(square =>{
            square.classList.remove("selecting-dark")        
            square.classList.remove("selecting-light")
            square.removeEventListener("click",whiteMoving)

                square.classList.remove("open-square")
                square.classList.remove("capturable-dark")
                square.classList.remove("capturable-light")

                square.classList.remove("white-en-passant-square")
            if(square.hasAttribute("open-square")){
                console.log(square)
                square.removeEventListener("click",whiteMoving)

                square.classList.remove("open-square")
                square.classList.remove("capturable-dark")
                square.classList.remove("capturable-light")

                square.classList.remove("white-en-passant-square")
            }square.classList.remove("white-en-passant-pawn")
            
    })
}

function removeBlackSelections(){
    squares.forEach(square =>{
        square.removeEventListener("click",blackMoving)
            square.classList.remove("selecting-dark")        
            square.classList.remove("selecting-light")
            square.classList.remove("open-square")
                square.classList.remove("capturable-dark")
                square.classList.remove("capturable-light")

            if(square.hasAttribute("open-square")){
                square.classList.remove("open-square")
                square.classList.remove("capturable-dark")
                square.classList.remove("capturable-light")

                square.classList.remove("black-en-passant-square")
            }square.classList.remove("black-en-passant-pawn")
    })
}

function removeSelections(color){
    // console.log("calling removeSelections",color)
    
    // pieces = document.querySelectorAll(`[piece="${color}-pawn"],[piece="${color}-bishop"],[piece="${color}-knight"],[piece="${color}-queen"],[piece="${color}-king"],[piece="${color}-rook"]`)
    pieces.forEach(square=>{
        // square.removeEventListener("click",window[color+"Moving"])
    })
    // console.log(document.querySelector('[en-passant-pawn]'))
    try{
        document.querySelector('[en-passant-pawn]').toggleAttribute("en-passant-pawn")
    }
    catch{
        // console.log("no en passants")
    }
    try{
        document.querySelectorAll('[en-passant-square]').forEach(square=>{
            square.toggleAttribute("en-passant-square")
        }) 
    }
    catch{
        // console.log("no en passants")
    }
    document.querySelectorAll('[open-square]').forEach(square=>{
        square.toggleAttribute("open-square")
        square.removeEventListener("click",movePiece)
        console.log("removing moving from",square)
    })
    
    // squares.forEach(square =>{
    //         square.classList.remove("selecting-dark")        
    //         square.classList.remove("selecting-light")
    //         square.removeEventListener("click",window[color+"Moving"])

    //      function doesMove       square.classList.remove("open-square")
    //             square.classList.remove("capturable-dark")
    //             square.classList.remove("capturable-light")

    //             square.classList.remove(color+"-en-passant-square")
    //         if(square.hasAttribute("open-square")){
    //             console.log(square)
    //             square.removeEventListener("click",window[color+"Moving"])
    //             square.classList.remove("open-square")
    //             square.classList.remove("capturable-dark")
    //             square.classList.remove("capturable-light")

    //         square.classList.remove(color+"-en-passant-square")
    //         }square.classList.remove(color+"-en-passant-pawn")
    // })
}


function doesMoveHangColorKing3(color,move){
    let oppositeColor = setOppositeColor(color)
    // console.log("calling doesMoveHang...3 called with",move,color)
    document.querySelectorAll('[open-square]').forEach(square=>{
        square.removeAttribute("open-square")
    })

    if(document.querySelector(`[piece="${color}-king"]`).hasAttribute("check")){
        // console.log("my king is in check")
        // console.log("piecesAttackingKing:",piecesAttackingKing)
        // if(move.target.idx==)

        //If king is in double check, must move king
        if(piecesAttackingKing.length>1){
            // console.log("my king is in double check")
            if(move.piece!=color+"-king"){
                return true
            }
            else if(move.target.hasAttribute("attacked")){
                return true
            }   
            else{
                return false
            }
        }
        else{//if we aren't in double check, we simulate move and then click on the piece that caused check, 
            //if we just captured the piece that was attacking the king, then king is no longer in check
            //must also make she the piece that captures is not pinned
            // console.log(piecesAttackingKing)
            if(move.start.getAttribute("piece")==color+"-king"&&move.target.hasAttribute("attacked")){
                // console.log("new hanging king")
                return true
            }
            if(piecesAttackingKing[0].square==move.target&&(!move.start.hasAttribute("pinned")||move.target==squares[move.start.getAttribute("pinned")])){
                return false
            }
            else if(!move.start.hasAttribute("pinned")){
                // console.log(move.start,"isnt pinned...")
                // console.log(piecesAttackingKing)
                var temp_start_piece = move.start.getAttribute("piece")
                var temp_target_piece = move.target.getAttribute("piece")
                move.start.setAttribute("piece","")
                move.target.setAttribute("piece",temp_start_piece)
                

                window[piecesAttackingKing[0].piece+"Movement"](oppositeColor,piecesAttackingKing[0].square)
                // console.log(document.querySelectorAll('[open-square]'))
                if(document.querySelector(`[piece="${color}-king"]`).hasAttribute("open-square")){
                    document.querySelectorAll('[open-square]').forEach(square=>{
                        square.removeAttribute("open-square")
                    })
                    // console.log(move,"hung king")
                    move.start.setAttribute("piece",temp_start_piece)
                    move.target.setAttribute("piece",temp_target_piece)
                    move.target.removeAttribute("open-square")
                    return true
                }
                document.querySelectorAll('[open-square]').forEach(square=>{
                        square.removeAttribute("open-square")
                })
                move.start.setAttribute("piece",temp_start_piece)
                move.target.setAttribute("piece",temp_target_piece)
                clearPrevious()
            }
            else{//piece was pinned
                return true
            }
            return false
            




        }
    }
    else{

        if(move.piece==color+"-king"){
            if(move.target.hasAttribute("attacked")){
                return true
            }
            return false
        }
        if(move.start.hasAttribute("pinned")){
            if(squares[move.start.getAttribute("pinned")]==move.target){
                // console.log(move.start)
                // console.log(move.target)
                // console.log("we did it!!!!")
                return false

            }
            else{
                return true
            }
        }
        return false
    }
}
    





function doesMoveHangColorKing(color){
    let oppositeColor = setOppositeColor(color)
    // console.log("calling doesMoveHang"+color+"King")
    isKinginCheckatBeginning = document.getElementsByClassName(color+"-king")[0].hasAttribute("check")
    //console.log("starting code to limit moves")
    var openSquares = document.getElementsByClassName("open-square")
    const movesToCheck = []
    
    for(let square of openSquares){
        // //console.log(8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)
        movesToCheck.push(squares[8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1])
    }
    movesToCheck.forEach(square =>{
        // console.log(square)
    })

    movesToCheck.forEach(square =>{
        var tempPieceHolder = false
        var tempPiece = ""
        movesToCheck.forEach(square =>{
            square.classList.remove("open-square")
        })
        //if the first move evaluated stops check but the next dont, it doesnt work

        //console.log("moving to ",8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1)
        // console.log(whiteLastSelectedPiece)
        // console.log(whiteLastSelectedLocation)

        //simulates moving the piece
        enPassant = false
        // piece = vars[color+"LastSelectedPiece"]
        // console.log(piece)
        square.classList.add(vars[color+"LastSelectedPiece"])
        squares[vars[color+"LastSelectedLocation"]].classList.remove(vars[color+"LastSelectedPiece"])

        if (color == "white")
            oppositeColor = "black"
        else   
            oppositeColor = "white"
        // setOppositeColor(asdf)
        // console.log(square)
        // console.log(vars[oppositeColor+"Pieces"])
        if(vars[oppositeColor+"Pieces"].includes(square.classList[1])){//if we are capturing a piece
            // console.log("NO NO NO")
            tempPiece = square.classList[1]
            if(square.classList[2]==oppositeColor+"-en-passant-pawn"){
                enPassant = square.classList[2]
                square.classList.remove(square.classList[2])
                enPassant = true
            }
            tempPieceHolder = true
            square.classList.remove(square.classList[1])
            // console.log(square.classList)
            // if(square.hasAttribute(""))
            // square.classList.add("capturable-light")
        }
        // wait(7000);
        //console.log(square)
        // if(vars[color+"LastSelectedPiece"]==vars[color+"-king"]){
        //     console.log("this doesn make sense")
        //     kinginCheck(color,square)
        //     if(!square.hasAttribute("check")){
        //         square.classList.add("open-square-that-stops-check") 
        //         //console.log("would bring king out of check")
        //     }
        //     //console.log("dealing with king")
        //     square.classList.remove("check")
            
        // }

        //base case, we ask to see if the white king would be in check after the move
        // else{
            // console.log("about to call")
        colorKinginCheck(color,document.getElementsByClassName(color+"-king")[0])
        
        if(colorKinginCheck(color,document.getElementsByClassName(color+"-king")[0])){
            // console.log("SETTING KING IN CHECK TO TRUE")
            kingInCheck = true
        // throw new Error("stop!");
        }
        else
            kingInCheck = false
        
        // }
        //putting the pieces back 
        if(tempPieceHolder){
            // console.log("time to put captured piece baack")
            // console.log(square)
            // console.log(tempPiece)
            square.classList.add(tempPiece)
            // console.log(square.classList)
            if(enPassant)
                square.classList.add(oppositeColor+"-en-passant-pawn")
            // console.log(square.classList)
            // if(square.hasAttribute(""))
            // square.classList.add("capturable-light")
        }
        // console.log("time to put piece back")
        // console.log("removing",vars[color+"LastSelectedPiece"],"from",square)
        
        square.classList.remove(vars[color+"LastSelectedPiece"])

        // console.log("adding",vars[color+"LastSelectedPiece"],"to",squares[vars[color+"LastSelectedLocation"]])
        squares[vars[color+"LastSelectedLocation"]].classList.add(vars[color+"LastSelectedPiece"])
        if(!kingInCheck){
            square.classList.add("open-square-that-stops-check")
        }
        kingInCheck = false
        document.getElementsByClassName(color+"-king")[0].classList.remove("check")
        // if(!document.getElementsByClassName(color+"-king")[0].hasAttribute("check")){
        // throw new Error("stop!");
        // }
    })
    //console.log("done limiting moves")
    
    for(let square of movesToCheck){
        if(square.hasAttribute("open-square-that-stops-check")){
            square.classList.remove("open-square-that-stops-check")
            square.toggleAttribute("open-square")
            // console.log(square)
        }
        else{
            square.removeEventListener("mouseover",whiteHighlight)
            square.removeEventListener("mouseout",whiteUnhighlight)

        }
    }

    if(vars[color+"LastSelectedPiece"]==color+"-king"){
        //console.log(" king")
    }
    else{
    //console.log("not king")
        squaresMatrix[7][7].classList.remove("castleable-dark")
        squares[56].classList.remove("castleable-light")
        squaresMatrix[0][0].classList.remove("castleable-dark")
        squaresMatrix[0][7].classList.remove("castleable-white")
    }
        
    // }
    // blackPiecesToCapture()
    if(isKinginCheckatBeginning){
        console.log("putting",color,"king back into check")
        // console.log(document.getElementsByClassName(color+"-king")[0])
        document.getElementsByClassName(color+"-king")[0].classList.add("check")
    }
}

//can be optimized
function clearPrevious(){
    squares.forEach(square =>{
        square.removeEventListener("click",movePiece)
    })
    document.querySelectorAll('[open-square]').forEach(square=>{
        square.toggleAttribute("open-square")
    })

    document.querySelectorAll('[captureable]').forEach(square=>{
        // console.log("removing capturable from",square)
        square.toggleAttribute("captureable")
    })

    try{
        document.querySelector(`[${currentColor}-en-passant-square]`).removeEventListener("click",movePiece)
        document.querySelector(`[${currentColor}-en-passant-square]`).removeAttribute(currentColor+"-en-passant-square")
        document.querySelector('[selecting]').removeAttribute("selecting")
    }
    catch{

    }

    
    

}


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////        
////////////////////////////////////////////////////////////////////////////////



function addEventListenersToOpenSquares(color){
    // console.log("calling addeventlistenerstoopensquares")
    openSquares =document.querySelectorAll('[open-square]')
    // openSquares[0].addEventListener("click",whiteMoving(openSquares[0]))
    // console.log("calling movePiece next line")
    openSquares.forEach(square =>{
        // console.log(square)
        square.pieceColor = color
        square.addEventListener("click",movePiece)
    })
    document.querySelectorAll('[castleable]').forEach(square=>{
        square.addEventListener("click",movePiece)
    })
    
    //     if(color=="white"){
    //         if (squares[63].hasAttribute("castleable-light")){
    //         squares[63].addEventListener("click",whiteMoving)
    //         squares[63].removeEventListener("click",whiteRook)
    //     }
    //     if (squares[56].hasAttribute("castleable-dark")){
    //         squares[56].addEventListener("click",whiteMoving)
    //         squares[56].removeEventListener("click",whiteRook)
    //     }
    // }
    // else{
    //     if (squares[0].hasAttribute("castleable-light")){
    //         squares[0].addEventListener("click",blackMoving)
    //         squares[0].removeEventListener("click",blackRook)
    //     }
    //     if (squares[7].hasAttribute("castleable-dark")){
    //         squares[7].addEventListener("click",blackMoving)
    //         squares[7].removeEventListener("click",blackRook)
    //     }
    // }
}

function addWhiteEventListenersToCapturables(){
    capturableDarks =document.querySelectorAll('.capturable-dark')
    capturableLights =document.querySelectorAll('.capturable-light')
    // openSquares[0].addEventListener("click",whiteMoving(openSquares[0]))
    capturableDarks.forEach(square =>{
        square.addEventListener("click",whiteMoving)
    })
    capturableLights.forEach(square =>{
        // square.removeEventListener("click",blackPawn)
        square.addEventListener("click",whiteMoving)
    })
    


}
//is this whole function redudant if we already add the event listeners to open squares?
function addEventListenersToCapturables(){
    capturableDarks =document.querySelectorAll('.capturable-dark')
    capturableLights =document.querySelectorAll('.capturable-light')
    // openSquares[0].addEventListener("click",whiteMoving(openSquares[0]))
    capturableDarks.forEach(square =>{
        square.addEventListener("click",movePiece)
    })
    capturableLights.forEach(square =>{
        // square.removeEventListener("click",blackPawn)
        square.addEventListener("click",movePiece)
    })
    

}



function addBlackEventListenersToOpenSquares(){
    openSquares =document.querySelectorAll('.open-square')
    // openSquares[0].addEventListener("click",blackMoving(openSquares[0]))

    openSquares.forEach(square =>{
        square.addEventListener("click",blackMoving)
    })
    if (squares[0].hasAttribute("castleable-light")){
        squares[0].addEventListener("click",blackMoving)
        squares[0].removeEventListener("click",blackRook)
    }
    if (squares[7].hasAttribute("castleable-dark")){
        squares[7].addEventListener("click",blackMoving)
        squares[7].removeEventListener("click",blackRook)
    }

}
function addBlackEventListenersToCapturables(){
    capturableDarks =document.querySelectorAll('.capturable-dark')
    capturableLights =document.querySelectorAll('.capturable-light')
    // openSquares[0].addEventListener("click",blackMoving(openSquares[0]))
    capturableDarks.forEach(square =>{
        square.addEventListener("click",blackMoving)
    })
    capturableLights.forEach(square =>{
        // square.removeEventListener("click",blackPawn)
        square.addEventListener("click",blackMoving)
    })
    

}

function  highlightCurrentSquare(square){
    square.toggleAttribute("selecting")
}





function clickPiece(color,square){


    try{
        document.querySelector('[selecting]').toggleAttribute("selecting")
        document.querySelector()
        document.querySelectorAll("open-square").forEach(square=>{
            
        })
    }
    catch{
        
    }
    // score = evaluate()
    // console.log(score)
    notChecking = false
    // pawns =document.querySelectorAll('.white-pawn')
    // this occurs when square has not been defined
    //this happens when it is clicked, not when checking for checks
    if (color.target!=undefined){
        // console.log(this)
        color = this.getAttribute("piece").substring(0,5)
        piece = this.getAttribute("piece")
        // console.log(piece)
        notChecking = true
        clearPrevious()
        // removeWhiteSelections()
        removeSelections(color)
        square = squaresMatrix[parseInt(this.dataset.idy-1)][parseInt(this.dataset.idx-1)]
        // console.log("calling clickPiece",square)
    }
    // console.log(square)
    idx = square.dataset.idx
    idy = square.dataset.idy
    // console.log(idy)
    // let piece = square.classList[1] //slice off the color
    
    //highlights certain squares depending on the piece
    // console.log(piece+"Movement")
    window[piece.slice(6)+"Movement"](color,square)
    let openSquares = document.querySelectorAll('[open-square]')
    // let candidates = []
    legalMoves = []
    //the doesMoveHangKing function clears open squares each time it runs
    //therefore, we need to hold onto the legal moves in a separate 
    //variable and then add the open square class after
    openSquares.forEach(target=>{
        candidate =  {piece:piece,start:square,target:target}
        candidate.start.removeAttribute('open-square')
        if(!doesMoveHangColorKing3(color,candidate)){
            // console.log(candidate," doesnt hang king")
            legalMoves.push(target)
        }
    })
    legalMoves.forEach(target=>{
        target.toggleAttribute("open-square")
    })
    
    // console.log(color,"lastselectedlocation = ",squares[vars[color+"LastSelectedLocation"]])
    if(notChecking){
        // console.log("not checking")
        vars[color+"LastSelectedPiece"] = square.getAttribute("piece")
        vars[color+"LastSelectedLocation"] = 8*(parseInt(square.dataset.idy)-1)+parseInt(square.dataset.idx)-1
        // console.log(vars[color+"LastSelectedPiece"])
        // console.log(vars[color+"LastSelectedLocation"])
        // doesMoveHangColorKing(color)
        piecesToCapture(color)
        addEventListenersToOpenSquares(color)
        addEventListenersToCapturables(color)
        // console.log("asdfasdf")
        highlightCurrentSquare(square)
    }
    // else{
    //     openSquares = document.querySelectorAll(".open-square")
    //     let moves = []
    //     openSquares.forEach(target=>{
    //         moves.push({piece:piece,start:square,target:target})
    //         // target.classList.remove("open-square")
    //     })
    //     console.log(moves)
    // }

    

}

function blackPiecesToCapture(){
    // console.log("calling blackPiecesToCapture")
    squares.forEach(square =>{
        // //console.log(square.hasAttribute("open-square"))
        if(square.hasAttribute("open-square")&&blackPieces.includes(square.classList[1])||
        square.classList[1]=="black-en-passant-pawn"){
        // ||blackPieces.includes(square.classList[2])){
            if(square.classList[0]=="blackSquare"){
                // square.classList.remove("open-square")
                square.classList.add("capturable-dark")
            }
            
            else{
                // square.classList.remove("open-square")
                square.classList.add("capturable-light")
            }
        }
    });
}


function countPieceValuesAttackingWhite(square){
    console.log("calling countPieceValeusAttackingWhite")
    if(square.hasAttribute("white-pawn")||square.hasAttribute("black-en-passant-square")){
        square.value += 1
    }
    else if(square.hasAttribute("black-pawn-en-passant")){
        square.value += 1
    }
    else if(square.hasAttribute("white-knight")){
        square.value += 3
    }
    else if(square.hasAttribute("white-bishop")){
        square.value += 3
    }
    else if(square.hasAttribute("white-rook")){
        square.value += 5
    }
    else if(square.hasAttribute("white-queen")){
        square.value += 9
    }
    else if(square.hasAttribute("white-king")){
        square.value += 1000
    }
    
}

function countPieceValuesAttackingBlack(square){
    console.log("calling countPieceValuesAttackingBlack")
    if(square.hasAttribute("black-pawn")){
        square.value = 1
    }
    else if(square.hasAttribute("white-pawn-en-passant")){
        square.value = 1
    }
    else if(square.hasAttribute("black-knight")){
        square.value = 3
    }
    else if(square.hasAttribute("black-bishop")){
        square.value = 3
    }
    else if(square.hasAttribute("black-rook")){
        square.value = 5
    }
    else if(square.hasAttribute("black-queen")){
        square.value = 9
    }
    else if(square.hasAttribute("black-king")){
        square.value = 1000
    }
}


function whitePiecesToCapture(){
    // console.log("calling whitePiecesToCapture")
    squares.forEach(square =>{
    
        // //console.log(square.hasAttribute("open-square"))
        if(square.hasAttribute("open-square")&&(whitePieces.includes(square.classList[1])
        ||square.classList[1]=="white-en-passant-pawn")){
            if(square.classList[0]=="blackSquare"){
                // square.classList.remove("open-square")
                square.classList.add("capturable-dark")
            }
            else{
                // square.classList.remove("open-square")
                square.classList.add("capturable-light")
            }
        }
    });
}   

function setOppositeColor(color){
    if(color=="white")
        return "black"
    else
        return "white"
}

function piecesToCapture(color){

    // console.log("piecesToCapture")
    // console.log(currentOppositeColor)
    // if(color=="white")
    //     oppositeColor = "black"
    // else
    //     oppositeColor = "white"
    
    openSquares = document.querySelectorAll('[open-square]')
    openSquares.forEach(square =>{
        // console.log(square)
        if(square.getAttribute("piece").substring(0,5)==currentOppositeColor){
            square.toggleAttribute("captureable") 
        }       
    })
    // console.log(basdf)
    // squares.forEach(square =>{
        
    //     // //console.log(square.hasAttribute("open-square"))
    //     if(square.hasAttribute("open-square")&&(vars[oppositeColor+"Pieces"].includes(square.classList[1])
    //     ||square.classList[1]=="white-en-passant-pawn")){
    //         if(square.classList[0]=="blackSquare"){
    //             // square.classList.remove("open-square")
    //             square.classList.add("capturable-dark")
    //         }
    //         else{
    //             // square.classList.remove("open-square")
    //             square.classList.add("capturable-light")
    //         }
    //     }
    // });
}   

















function whiteWins(){
    console.log("calling whiteWins")
    let winner=document.querySelector(".winner")
    winner.innerHTML="White Won!"
    // currentPlayer.innerHTML=""
    // var x = document.querySelector('.player')
    // x.innerHTML=''
    var span = document.querySelector(".currentPlayer");
    //console.log(span.childNodes[1])
    span.removeChild(span.childNodes[1]);  
}

function blackWins(){
    console.log("calling blackWins")
    //console.log("blackWins")
    let winner=document.querySelector(".winner")
    winner.innerHTML="Black Won!"
    // currentPlayer.innerHTML=""
    // var x = document.querySelector('.player')
    // x.innerHTML=''
    var span = document.querySelector(".currentPlayer");
    //console.log(span.childNodes[1])
    span.removeChild(span.childNodes[1]);  
}

function colorWins(color){
    console.log("calling colorWins",color)
    let winner=document.querySelector(".winner")
    winner.innerHTML=color +" won!"
    // currentPlayer.innerHTML=""
    // var x = document.querySelector('.player')
    // x.innerHTML=''
    var span = document.querySelector(".currentPlayer");
    //console.log(span.childNodes[1])
    span.removeChild(span.childNodes[1]);  
}

function checkWon(){
    console.log("calling checkWon")
    let squares =document.querySelectorAll(".board div")
    for (let y=0;y<winningArray.length;y++){
        let square =winningArray[y]
        if(square.every(q=>squares[q].hasAttribute("player-one"))){
            setTimeout(() =>alert("player one(red) wins "), 200)
            setTimeout(() =>restart.style.display="flex", 500)
        }else if(square.every(q=>squares[q].hasAttribute("player-two"))){
            setTimeout(() =>alert("player two(yellow) wins"), 200)
            setTimeout(() =>restart.style.display="flex", 500)
        }
    }
}

function reset(){
    console.log("calling reset")
    board.innerHTML="" 
    loadDOM() 
    restart.style.display="none" 
}

   


