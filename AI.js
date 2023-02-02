//uses AI to move for a chosen color
function colorAI(color){
    console.log("moving",color,"with AI")
    var startTime = performance.now()
    totalMoves = 0
    // let moves = allPossibleColorMoves(color)
    // console.log(moves[0])
    // console.log(asdf)
    bestMove = minimax3(color,globalDepth,Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER)
    console.log("bestMove=",bestMove)
    // console.log(moves)
    vars[color+"LastSelectedPiece"] = bestMove.piece
    vars[color+"LastSelectedLocation"] = 8*(parseInt(bestMove.start.dataset.idy)-1)+parseInt(bestMove.start.dataset.idx)-1

    // console.log(vars[color+"LastSelectedPiece"] )
    // console.log(bestMove.start)
    movePiece(color,bestMove.target)

    // checkForDraw()
    console.log("TOTAL MOVES =",totalMoves)
    document.getElementById('total positions').innerText = totalMoves    
    endTime = performance.now()
    document.getElementById('total time').innerText = (endTime - startTime).toFixed(3)
}

function sortMoves(moves,color,oppositeColor){
    moves.forEach(move=>{
    let attackedSquares = document.querySelectorAll('[attacked]')
    let pinnedPieces = document.querySelectorAll('[pinned]')
    pinnedHolders = []
    pinnedPieces.forEach(pinned=>{
        pinned.value = pinned.getAttribute("pinned")
        pinnedHolders.push(pinned)
    })

    var tempTargetHolder = false
    var oppositeEnPassantHolder = false
    var startEnPassantHolder = false
    var checkHolder = false
        
        if(move.castle != null){
            // move.score=100
            // console.log("setting move score to 100")

                
            if(move.castle=="whiteCastleKS"){

                // console.log("castleing kingside")
                squaresMatrix[7][6].setAttribute("piece","white-king")
                squaresMatrix[7][5].setAttribute("piece","white-rook")
                squaresMatrix[7][7].setAttribute("piece","")
                squaresMatrix[7][4].setAttribute("piece","")
            }
            else if(move.castle=="whiteCastleQS"){
            squaresMatrix[7][2].setAttribute("piece","white-king")
            squaresMatrix[7][3].setAttribute("piece","white-rook")
            squaresMatrix[7][0].setAttribute("piece","")
            squaresMatrix[7][1].setAttribute("piece","")
            squaresMatrix[7][4].setAttribute("piece","")
            }
            else if(move.castle=="blackCastleKS"){
            squaresMatrix[0][6].setAttribute("piece","black-king")
            squaresMatrix[0][5].setAttribute("piece","black-rook")
            squaresMatrix[0][7].setAttribute("piece","")
            squaresMatrix[0][4].setAttribute("piece","")
            }
            else{
                squaresMatrix[0][2].setAttribute("piece","black-king")
                squaresMatrix[0][3].setAttribute("piece","black-rook")
                squaresMatrix[0][0].setAttribute("piece","")
                squaresMatrix[0][1].setAttribute("piece","")
                squaresMatrix[0][4].setAttribute("piece","")
            }
        }

        else{
            // move.score=0
            // console.log("here")
            var originalPiece = move.start.getAttribute("piece")
            var tempTargetPiece = move.target.getAttribute("piece")

            if(move.start.hasAttribute("check")){
                checkHolder = true
                move.start.removeAttribute("check")
            }
            
            if(move.start.hasAttribute(color+"-en-passant-pawn")){
                startEnPassantHolder = true
                move.target.removeAttribute(color+"-en-passant-pawn")
            }

            if(move.target.hasAttribute(oppositeColor+"-en-passant-pawn")){
                oppositeEnPassantHolder = true
                move.target.removeAttribute(oppositeColor+"-en-passant-pawn")
            }

            move.start.setAttribute("piece","")
            move.target.setAttribute("piece",originalPiece)
        }
        clearEnPassant(oppositeColor)


        move.prelimScore=evaluate()

        
        attackedSquares.forEach(square=>{
            square.setAttribute("attacked","")
        })

        document.querySelectorAll('[pinned]').forEach(square=>{
            square.removeAttribute('[pinned]')
        }
        )
        

     
        pinnedHolders.forEach(pinned=>{
            pinned.setAttribute("pinned",pinned.value)
        })


        // if(depth==2){
        //     console.log(asdf)
        // }
        if(move.castle==null){
            
            if(oppositeEnPassantHolder){
                move.target.setAttribute(oppositeColor+"-en-passant-pawn","")
            }
            if(startEnPassantHolder){
                move.start.setAttribute(color+"-en-passant-pawn","")
            }

            if(checkHolder){
                move.start.setAttribute("check","")
            }
            // console.log("putting op",originalPiece,"back to",move.start)
            move.start.setAttribute("piece",originalPiece)
            move.target.setAttribute("piece",tempTargetPiece)
            // if(move.score>.5){
            //         console.log(Asdf)
            //     }
        }
        else{
            // console.log(asdf)
            if(move.castle=="whiteCastleKS"){

                // console.log("putting pieces back after castleing kingside")
                squaresMatrix[7][6].setAttribute("piece","")
                squaresMatrix[7][5].setAttribute("piece","")
                squaresMatrix[7][7].setAttribute("piece","white-rook")
                squaresMatrix[7][4].setAttribute("piece","white-king")
            }
            else if(move.castle=="whiteCastleQS"){
                squaresMatrix[7][2].setAttribute("piece","")
                squaresMatrix[7][3].setAttribute("piece","")
                squaresMatrix[7][0].setAttribute("piece","white-rook")
                squaresMatrix[7][1].setAttribute("piece","")
                squaresMatrix[7][4].setAttribute("piece","white-king")
            }
            else if(move.castle=="blackCastleKS"){
                squaresMatrix[0][6].setAttribute("piece","")
                squaresMatrix[0][5].setAttribute("piece","")
                squaresMatrix[0][7].setAttribute("piece","black-rook")
                squaresMatrix[0][4].setAttribute("piece","black-king")
            }
            else{
                squaresMatrix[0][2].setAttribute("piece","")
                squaresMatrix[0][3].setAttribute("piece","")
                squaresMatrix[0][0].setAttribute("piece","black-rook")
                squaresMatrix[0][1].setAttribute("piece","")
                squaresMatrix[0][4].setAttribute("piece","black-king")
            }
        }


        clearAttacked()
    })
}

function sortMovesByCaptures(moves,color,oppositeColor){
    moves.forEach(move=>{
        if(move.target.getAttribute("piece").substring(0,5)==oppositeColor){
            // console.log(move,"is a capture")
            move.capture = true
        }
    })
    moves.sort(function(a, b) {
        // true values first
        return (a.capture == y.capture)? 0 : x? -1 : 1;
        // false values first
        // return (x === y)? 0 : x? 1 : -1;
    });
    // console.log(moves)
    // console.log(asd)
    //         return b.score - a.score
    //     })
}


function chooseBestMove(color,moves){

    moves2 = []
    // console.log(moves)
    moves.forEach(move=>{
        if(move.prune==false){
            moves2.push(move)
        }
        else{
            // console.log(move)
        }
        // console.log(move.prune)
    })
    // return moves2[0]
    // console.log(moves2)
    // console.log(moves)
    // console.log(moves2)
    // console.log(moves2.length)
    if(moves2.length==1){
    //     console.log("choosing random move...")
        // return moves[Math.floor(Math.random()*moves.length)]
        return moves2[0]
    }
    else if(moves2.length==0){
        return moves[0]
    }
    bestMoves = []
    if(color=="black"){
        return moves2[0]
        // console.log(moves)
        // if(moves2[0].score<moves2[moves2.length-1].score){
        //     let i = 1
        //     bestMoves.push(moves2[0])
        //     bestScore = moves2[0].score
        //     while(moves2[i].score==bestScore){
        //         // bestMoves.push(moves[i])
        //         i+=1
        //     }
        //     // console.log(bestMoves)
        //     return bestMoves[Math.floor(Math.random()*bestMoves.length)]
        // }
    }
    else if(color=="white"){
        return moves2[moves2.length-1]
        // console.log(moves)
        // if(moves2[0].score<moves2[moves2.length-1].score){
        //     let i = 1
        //     bestMoves.push(moves2[moves2.length-1])
        //     bestScore = moves2[moves2.length-1].score
        //     // console.log(bestScore)
        //     while(moves2[moves2.length-1-i].score==bestScore){
        //         bestMoves.push(moves2[moves2.length-1-i])
        //         i+=1
        //     }
        //     console.log(bestMoves)
        //     return bestMoves[Math.floor(Math.random()*bestMoves.length)]
        // }
            // return moves[moves.length-1]
    }
    // console.log("choosing random")
    return moves2[Math.floor(Math.random()*moves.length)]
    console.log("this should never print")
    return moves[0]
}



function minimax3(color,depth,alpha,beta){

    let attackedSquares = document.querySelectorAll('[attacked]')
    let pinnedPieces = document.querySelectorAll('[pinned]')
    pinnedHolders = []
    pinnedPieces.forEach(pinned=>{
        pinned.value = pinned.getAttribute("pinned")
        pinnedHolders.push(pinned)
    })
    let oppositeColor = setOppositeColor(color)
    let moves = allPossibleColorMoves(color)

    if(depth==globalDepth){
    // clearAttacked()
        sortMoves(moves,color,oppositeColor)
        if(color=="white")
        moves.sort((a,b)=>{
            return b.prelimScore - a.prelimScore
        })
        else{
            moves.sort((a,b)=>{
            return a.prelimScore - b.prelimScore
        })
        }
        // console.log(moves)
        // console.log(asdf)
    }

    else{
        sortMovesByCaptures(moves,color,oppositeColor)
    }
    // console.log("calling minimax d=",depth)
    
    // console.log(moves)
    // console.log(asg)
    
    
    if(moves.length==0){ //if there are no moves available, then this is checkmate. return max or min score
            // console.log(moves)
            // console.log(moves)
            // console.log(afs)
            if(color=="white"){
                
                // move.score=
                return Number.MIN_SAFE_INTEGER
            }
            else{
                // let move = "mate"
                // move.score=Number.MIN_SAFE_INTEGER
                // console.log(color,"about to return",move,move,score)
                // console.log(asdf)
                return Number.MIN_SAFE_INTEGER
            }
            
    }
    // if(moves.length==1){
    //     console.log(moves)
    //     console.log(asdf)
    // }
    // console.log(asdf)
    // clearAttacked()
    // console.log("calling findBestColorMove",color)
    
    if(color=="white"){
        var bestVal = Number.MIN_SAFE_INTEGER
    }
    else{
        var bestVal = Number.MAX_SAFE_INTEGER
    }
    // console.log(bestVal)
    //simulate move
    var pruning = false
    moves.every(move=>{
        // clearAttacked()
        // if(depth==3){
            // console.log("WHITE WILL NOW BEGIN EXPLORING",move,"on move 1")
            // console.log("a = ",alpha)
            // console.log("b = ",beta)
        // }
        // var mmtemp = ""
        // var mmtemp2 = ""
        // var mmtempHolder = false
        // var mmtemp2Holder = false
        // var mmtemp3Holder = false
        // var mmtemp3 = ""
        // totalMoves+=1
        // var temp = ""
        // var temp2 = ""
        // var tempHolder = false
        // var temp2Holder = false
        // var temp3Holder = false
        var tempTargetHolder = false
        var oppositeEnPassantHolder = false
        var startEnPassantHolder = false
        var checkHolder = false
        
        if(move.castle != null){
            // move.score=100
            // console.log("setting move score to 100")

                
            if(move.castle=="whiteCastleKS"){

                // console.log("castleing kingside")
                squaresMatrix[7][6].setAttribute("piece","white-king")
                squaresMatrix[7][5].setAttribute("piece","white-rook")
                squaresMatrix[7][7].setAttribute("piece","")
                squaresMatrix[7][4].setAttribute("piece","")
            }
            else if(move.castle=="whiteCastleQS"){
            squaresMatrix[7][2].setAttribute("piece","white-king")
            squaresMatrix[7][3].setAttribute("piece","white-rook")
            squaresMatrix[7][0].setAttribute("piece","")
            squaresMatrix[7][1].setAttribute("piece","")
            squaresMatrix[7][4].setAttribute("piece","")
            }
            else if(move.castle=="blackCastleKS"){
            squaresMatrix[0][6].setAttribute("piece","black-king")
            squaresMatrix[0][5].setAttribute("piece","black-rook")
            squaresMatrix[0][7].setAttribute("piece","")
            squaresMatrix[0][4].setAttribute("piece","")
            }
            else{
                squaresMatrix[0][2].setAttribute("piece","black-king")
                squaresMatrix[0][3].setAttribute("piece","black-rook")
                squaresMatrix[0][0].setAttribute("piece","")
                squaresMatrix[0][1].setAttribute("piece","")
                squaresMatrix[0][4].setAttribute("piece","")
            }
        }

        else{
            // move.score=0
            // console.log("here")
            var originalPiece = move.start.getAttribute("piece")
            var tempTargetPiece = move.target.getAttribute("piece")

            if(move.start.hasAttribute("check")){
                checkHolder = true
                move.start.removeAttribute("check")
            }
            
            if(move.start.hasAttribute(color+"-en-passant-pawn")){
                startEnPassantHolder = true
                move.target.removeAttribute(color+"-en-passant-pawn")
            }

            if(move.target.hasAttribute(oppositeColor+"-en-passant-pawn")){
                oppositeEnPassantHolder = true
                move.target.removeAttribute(oppositeColor+"-en-passant-pawn")
            }

            move.start.setAttribute("piece","")
            move.target.setAttribute("piece",originalPiece)
        }
        clearEnPassant(oppositeColor)

        if(depth>1){

            
            // console.log("moves at depth greater than 1:",moves)
            // opponentMoves = allPossibleColorMoves(oppositeColor) 
            // console.log(opponentMoves[0])
            // prev.push(move)
            // console.log("depth=",depth,move)
            clearPinned()
            clearAttacked()
            clearCheck()
            clickAllColorPieces(color)
            bestOpponentMove = minimax3(oppositeColor,depth-1,alpha,beta)
            // console.log("finished evaluating",depth,move)
            // console.log(bestOpponentMove)
            // console.log(move)
            if(bestOpponentMove==Number.MIN_SAFE_INTEGER){
               
                // console.log("we got a mate",depth,move)
                move.prune=false
                move.score = Number.MIN_SAFE_INTEGER
            }
            else if(bestOpponentMove==Number.MAX_SAFE_INTEGER){
                move.prune=false
                move.score = Number.MAX_SAFE_INTEGER
            }


            else{
            // console.log("bom=",bestOpponentMove)
                move.score = bestOpponentMove.score
            }
            // if(bestOpponentMove=="mate"){
            //     console.log(move.score)
            // }
            
            // console.log(move)
            
            // console.log(depth,color)
            
            move.bom = bestOpponentMove
            // move.opponentMoves = allPossibleColorMoves(oppositeColor)
            // if(depth==3){
            // }
            if(bestOpponentMove.prune==true){
                move.prune =true
            }
            // console.log(bestOpponentMove)
            // console.log(move.score)
        }
        else{
            
            // console.log("about to evaluate",move)
            // console.log("depth=",depth,move)
            move.score = evaluate()
            // console.log(1,color)
            // if(move.castle != null){
            //     // console.log("adding castle bonus")
            //     move.score = move.score + 500
            // }
            totalMoves+=1
            // console.log(move,"just received a score of ",move.score)
            // if(move.piece==color+"-knight"&&move.target==squares[21]){
                
            // }
            // console.log()
        }
        if(color=="white"){
            // console.log(alpha)
            // console.log("white is choosing")
            // if(depth==3){
                bestVal = Math.max(bestVal,move.score)
                alpha = Math.max(alpha,move.score)
            // }
            // if(depth==3)
                // console.log(bestOpponentMove)
                // console.log(move.score)
                
                // console.log("white is exploring",move)
                // console.log(alpha)
            // }
        }
        else if(color == "black"){
            // console.log(beta)
            // console.log("black was exploring",move,"assuming white will play")
            // console.log("a = ",alpha)
            // console.log("b = ",beta)
            bestVal = Math.min(bestVal,move.score)
            beta = Math.min(beta,move.score)
            // console.log("b=",beta)
        }
        // if(depth>1){
        //     console.log(originalPiece)
            
        // }

        
        
        
        
        //put pieces back
        // returnMove(color,move)
        // document.querySelectorAll('[attacked').forEach(square=>{
        //     console.log("removing attacked from",square)
        //     square.removeAttribute('[attacked]')
        // }
        // )
        

        attackedSquares.forEach(square=>{
            square.setAttribute("attacked","")
        })

        document.querySelectorAll('[pinned]').forEach(square=>{
            square.removeAttribute('[pinned]')
        }
        )
        

     
        pinnedHolders.forEach(pinned=>{
            pinned.setAttribute("pinned",pinned.value)
        })


        // if(depth==2){
        // }
        if(move.castle==null){
            
            if(oppositeEnPassantHolder){
                move.target.setAttribute(oppositeColor+"-en-passant-pawn","")
            }
            if(startEnPassantHolder){
                move.start.setAttribute(color+"-en-passant-pawn","")
            }

            if(checkHolder){
                move.start.setAttribute("check","")
            }
            // console.log("putting op",originalPiece,"back to",move.start)
            move.start.setAttribute("piece",originalPiece)
            move.target.setAttribute("piece",tempTargetPiece)
            // if(move.score>.5){
            //     }
        }
        else{
            if(move.castle=="whiteCastleKS"){

                // console.log("putting pieces back after castleing kingside")
                squaresMatrix[7][6].setAttribute("piece","")
                squaresMatrix[7][5].setAttribute("piece","")
                squaresMatrix[7][7].setAttribute("piece","white-rook")
                squaresMatrix[7][4].setAttribute("piece","white-king")
            }
            else if(move.castle=="whiteCastleQS"){
                squaresMatrix[7][2].setAttribute("piece","")
                squaresMatrix[7][3].setAttribute("piece","")
                squaresMatrix[7][0].setAttribute("piece","white-rook")
                squaresMatrix[7][1].setAttribute("piece","")
                squaresMatrix[7][4].setAttribute("piece","white-king")
            }
            else if(move.castle=="blackCastleKS"){
                squaresMatrix[0][6].setAttribute("piece","")
                squaresMatrix[0][5].setAttribute("piece","")
                squaresMatrix[0][7].setAttribute("piece","black-rook")
                squaresMatrix[0][4].setAttribute("piece","black-king")
            }
            else{
                squaresMatrix[0][2].setAttribute("piece","")
                squaresMatrix[0][3].setAttribute("piece","")
                squaresMatrix[0][0].setAttribute("piece","black-rook")
                squaresMatrix[0][1].setAttribute("piece","")
                squaresMatrix[0][4].setAttribute("piece","black-king")
            }
        }

        // if(depth==3&&(move.score==Number.MIN_SAFE_INTEGER||move.score==Number.MAX_SAFE_INTEGER)){
        //     console.log("here working")
        //     return move
        // }
       

        clearAttacked()//why is this here? Shouldn't this be messing things up

        // if(depth==3){
        //     console.log(move)
        // }
  
        // console.log(squares[27].classList)
        // console.log(squares[34].classList)
        // console.log(move.piece)
        // console.log(piece)
        if(beta<=alpha){
            
            // console.log("pruning!")

            // console.log(color,"was exploring",move,"at depth",depth,"assuming opponent would play",bestOpponentMove)
            // console.log("a = ",alpha)
            // console.log("b = ",beta)
            // console.log(moves)
            
            pruning = true
            move.prune = true
            pruneMove = move
            return
        }

    return true;

    })
    if(pruning){
    //     moves.forEach(move2=>{
    //     if(!move2.prune){
    //         console.log("actual move")
    //         console.log(move2)
    //     }
    // })
        return pruneMove
    }
    moves.sort((a,b)=>{
        return a.score - b.score
    })

    if(depth==globalDepth){
        // console.log(moves)
    }

    // if(color == "black"){
    //     console.log("after pruning,")
    //     console.log("a=",alpha)
    //     console.log("b=",beta)
    // }
    

    bm = chooseBestMove(color,moves)
    // if(depth==3){
    //     console.log("WHITE JUST EXPLORED",move,"on move 1")
    // }
    // if(depth==1)
    //     console.log("bm=",bm)

    
    aboutToReturn =  chooseBestMove(color,moves)
    if(typeof aboutToReturn=="undefined"){
        console.log(moves,"resulting in aboutToReturn undefined")
    }

    return aboutToReturn
    
    

    //     moves.sort((a,b)=>{
    //         return a.score - b.score
    //     })
    // }
    // else{
    //     moves.sort((b,a)=>{
    //         return b.score - a.score
    //     })
    // }
    // console.log(moves)
    // return moves[0]
    // vars[color+"LastSelectedPiece"] = 
    // squares[vars[color+"LastSelectedLocation"]].classList.remove(vars[color+"LastSelectedPiece"])

    //evaluate position
    //store evaluation in move
}