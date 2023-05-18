const descButton = document.querySelector("#descButton")
const description = document.querySelector("#description")
const username = document.querySelector("#username")
const difficulty = document.querySelector("#difficulty")
const loadGame = document.querySelector("#choose")
const usernameSpan = document.querySelector("#usernameSpan")
const table = document.querySelector("#table")
const result = document.querySelector("#result")
const timeSpan = document.querySelector("#time")


/*
w-white
b-black
number-black with number
l-lightbulb
le-lightbulb effected
*/

descButton.addEventListener('click', ()=>{
    description.innerText = "The king has square rooms, which are either black or white. \n You can place lighbulbs into the white rooms. \n The light from lightbulb goes only horizontally and vertically. \n Black rooms block light.\nBlack rooms occasionally can cointain a number from 0 to 4. This number shows how many lightbulbs can be placed around that room(up,down,left,right). If theres a number you must place lightbulbs according to that!\nTwo or more lightbulbs must not light each other!\nThe purpose of the game to light every white room.\n"
})

let easy = [["w","w","w","1","w","w","w"],
            ["w","0","w","w","w","2","w"],
            ["w","w","w","w","w","w","w"],
            ["b","w","w","b","w","w","b"],
            ["w","w","w","w","w","w","w"],
            ["w","b","w","w","w","2","w"],
            ["w","w","w","3","w","w","w"]]

let intermediate = [["w","w","0","w","b","w","w"],
                    ["w","w","w","w","w","w","w"],
                    ["b","w","b","w","3","w","b"],
                    ["w","w","w","1","w","w","w"],
                    ["2","w","b","w","b","w","b"],
                    ["w","w","w","w","w","w","w"],
                    ["w","w","b","w","2","w","w"]]

let hard = [["w","b","w","w","w","w","w","w","w","w"],
            ["w","w","w","w","w","3","w","2","w","b"],
            ["w","0","b","w","w","w","w","b","w","w"],
            ["w","w","w","w","b","w","w","w","w","w"],
            ["w","1","w","w","b","1","b","w","w","w"],
            ["w","w","w","b","b","b","w","w","3","w"],
            ["w","w","w","w","w","b","w","w","w","w"],
            ["w","w","1","w","w","w","w","0","b","w"],
            ["3","w","b","w","0","w","w","w","w","w"],
            ["w","w","w","w","w","w","w","w","0","w"]
            ]
let data;
function showDesc(){
    if(description.style.display == "none"){
    description.style.display = "block"
    }else{
        description.style.display = "none"
    }
}
function usernameAdded(){
    usernameSpan.innerText = username.value
}

function mapGeneration(){
    if(difficulty.value == "easy"){
        
        data = easy.map((item) => item.slice());
    }else if(difficulty.value =="intermediate"){
        
        data = intermediate.map((item) => item.slice());

    }else{
        data = hard.map((item) => item.slice());
    }

    startTime = Date.now()
   
    setInterval(handleTimer, 1000)
    frameGeneration();
  

}
//iterate through matrix and based on that creating table
//checking if the game is over
function frameGeneration(){
    table.innerHTML = ""
    for(let i = 0; i<data.length; i++){
        let tr = document.createElement('tr')
        for(let j = 0; j<data.length; j++){
            let td = document.createElement('td')
            if(data[i][j] === "w"){
                td.style.backgroundColor="white"
            }
            else if(data[i][j] === "b"){
                td.style.backgroundColor = "black";
            }else if(data[i][j]==="l"){

                td.style.backgroundColor = "yellow";
                td.style.backgroundImage = "url('lightbulb.png')"
                td.style.backgroundPosition = "center"
                td.style.backgroundSize ="70% 70%"
            
            }else if(data[i][j]==="le"){
                td.style.backgroundColor = "yellow"
               
            }else{
                td.style.backgroundColor="black"
                td.innerText = data[i][j];
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    if(isGameCompleted()){
        result.innerHTML = "Congrats, you won!"
        loadGame.disabled = false
    }else{
        result.innerHTML = ""
        loadGame.disabled = true
    
    }
}

function step(event){
        let rowIndex = event.target.parentElement.rowIndex
        let columnIndex = event.target.cellIndex
       
        if(!(data[rowIndex][columnIndex]=='b' || !isNaN(parseInt(data[rowIndex][columnIndex])))){
        //remove lightbulb and its effects
        if(data[rowIndex][columnIndex] =='l'){
            data[rowIndex][columnIndex] = 'w'
            let wcheck = (columnIndex+1<data.length && data[rowIndex][columnIndex+1] != "b" && isNaN(parseInt(data[rowIndex][columnIndex+1])) && data[rowIndex][columnIndex+1] != "l")
            for(let k = columnIndex+1; wcheck; k++){

                wcheck = (k+1<data[rowIndex].length && data[rowIndex][k+1] != "b" && isNaN(parseInt(data[rowIndex][k+1])) && data[rowIndex][k+1] != "l")
             
                data[rowIndex][k] = "w"
                
            }
            wcheck = (columnIndex-1>=0 && data[rowIndex][columnIndex-1] != "b" && isNaN(parseInt(data[rowIndex][columnIndex-1])) && data[rowIndex][columnIndex-1] != "l")
            
            for(let k = columnIndex-1; wcheck ; k--){

                wcheck = (k-1>=0 && data[rowIndex][k-1] != "b" && isNaN(parseInt(data[rowIndex][k-1])) && data[rowIndex][k-1] != "l")
                data[rowIndex][k] = "w"
                
            }
            wcheck = (rowIndex-1 >= 0 && data[rowIndex-1][columnIndex] != "b" && isNaN(parseInt(data[rowIndex-1][columnIndex])) && data[rowIndex-1][columnIndex] != "l")
            
            for(let k = rowIndex-1; wcheck; k--){

                wcheck =( k-1 >= 0 && data[k-1][columnIndex] != "b" && isNaN(parseInt(data[k-1][columnIndex])) && data[k-1][columnIndex] != "l")
                data[k][columnIndex] = "w"
                
            }
            wcheck = (rowIndex+1 < data.length && data[rowIndex+1][columnIndex] != "b" && isNaN(parseInt(data[rowIndex+1][columnIndex])) && data[rowIndex+1][columnIndex] != "l")
            
            for(let k = rowIndex+1; wcheck ; k++){
                wcheck = (k+1 < data.length && data[k+1][columnIndex] != "b" && isNaN(parseInt(data[k+1][columnIndex])) && data[k+1][columnIndex] != "l")
                data[k][columnIndex] = "w"
                
            }
            
        }
        else{
            data[rowIndex][columnIndex]='l'
            
        }
        //refresh the matrix based on lightbulb effects
        for(let i =0; i<data.length; i++){
            for(let j =0; j<data[i].length; j++){
                if(data[i][j] === "l"){
                    
                    let check=(j+1<data[i].length && data[i][j+1] != "b" && isNaN(parseInt(data[i][j+1])) && data[i][j+1] != "l");
                    
                    for(let k = j+1; check; k++){

                        check = (k+1<data.length && data[i][k+1] != "b" && isNaN(parseInt(data[i][k+1])) && data[i][k+1] != "l")
                        
                        data[i][k] = "le"
                    }
                    check = (j-1>=0 && data[i][j-1] != "b" && isNaN(parseInt(data[i][j-1])) && data[i][j-1] != "l")
                    
                    for(let k = j-1; check ; k--){
                        check = (k-1>=0 && data[i][k-1] != "b" && isNaN(parseInt(data[i][k-1])) && data[i][k-1] != "l")

                        data[i][k] = "le"
                        
                    }
                    check = (i-1 >= 0 && data[i-1][j] != "b" && isNaN(parseInt(data[i-1][j])) && data[i-1][j] != "l")
                    for(let k = i-1; check; k--){
                        check =( k-1 >= 0 && data[k-1][j] != "b" && isNaN(parseInt(data[k-1][j])) && data[k-1][j] != "l")

                        data[k][j] = "le"
                        
                    }
                    check = (i+1 < data.length && data[i+1][j] != "b" && isNaN(parseInt(data[i+1][j])) && data[i+1][j] != "l")
                    for(let k = i+1; check ; k++){
                        check = (k+1 < data.length && data[k+1][j] != "b" && isNaN(parseInt(data[k+1][j])) && data[k+1][j] != "l")

                        data[k][j] = "le"
                        
                    }
                }
            }
        
        }
        }
    //console.log(data)

}

function isGameCompleted(){
    let result = true
    for(let i = 0; i<data.length; i++){
        let isThereBlackBox = false
        let isThereBlackBoxCol = false
        let firstL
        let firstLCol 
        for(let j = 0; j<data[i].length; j++){
            //Every room bright
           
            //right amount of loghtbulb around black rooms
            if(!isNaN(parseInt(data[i][j]))){
                let numOfLb = 0
                
                if(!(j+1 >= data[i].length)){
                    if(data[i][j+1]==="l")numOfLb++
                }
                if(!(i+1>=data[i].length)){
                    if(data[i+1][j]==="l")numOfLb++
                }
                if(j-1>=0){
                    if(data[i][j-1]==="l")numOfLb++
                }
                if(i-1>=0){
                if(data[i-1][j]==="l")numOfLb++
                }
                
                if(numOfLb!==parseInt(data[i][j])){
                
                result = false
                
                }else{
                    
                    table.rows[i].cells[j].style.color="green"
                }
            }
            if(data[i][j]==="w"){
              
                result = false
            }
            if(data[i][j]==="b"|| !isNaN(parseInt(data[i][j]))) isThereBlackBox = true
            if(data[j][i]==="b" || ! isNaN(parseInt(data[j][i]))) isThereBlackBoxCol = true
            
            
            
            //multiple lightbulbs in a row
            if(data[i][j]==="l"){
                if(firstL === undefined){
                    firstL = j
                    isThereBlackBox = false
                }else{
                    if(!isThereBlackBox){
                        
                        result = false
                        table.rows[i].cells[firstL].style.backgroundColor="red"
                        table.rows[i].cells[j].style.backgroundColor="red"
                    }
                    firstL = j
                    isThereBlackBox = false

                }
            }
            //multiple lightbulbs in columns
            if(data[j][i]==="l"){
                if(firstLCol===undefined){
                    firstLCol = j
                    isThereBlackBoxCol = false
                }else{
                    if(!isThereBlackBoxCol) {
                        table.rows[firstLCol].cells[i].style.backgroundColor="red"
                        table.rows[j].cells[i].style.backgroundColor="red"
                        
                        result = false
                    }
                    firstLCol = j
                    isThereBlackBoxCol = false
                }
            }
        
        }
        
    }
    return result
}

function stepEvent(event){
    step(event)
    
    frameGeneration();
    const datspan = document.querySelector("#data")
   

}


function delegal(szulo, gyerek, mikor, mit){
    function esemenyKezelo(esemeny){
        let esemenyCelja    = esemeny.target;
        let esemenyKezeloje = this;
        let legkozelebbiKeresettElem = esemenyCelja.closest(gyerek);
        if(esemenyKezeloje.contains(legkozelebbiKeresettElem)){
            mit(esemeny, legkozelebbiKeresettElem);
        }
    }
    szulo.addEventListener(mikor, esemenyKezelo);
}

function handleTimer(){
    
    if (!isGameCompleted()){
        let time = Date.now()
        
        let sumsec = Math.floor((time - startTime) / 1000)
        let min = String(Math.floor(sumsec / 60)).padStart(2, "0")
        let sec = ("0" + (sumsec % 60)).slice(-2)
        timeSpan.innerText = `Eltelt idő = ${min}:${sec}`
    }
}


delegal(table,'td','click', stepEvent)
descButton.addEventListener('click', showDesc)
username.addEventListener('input', usernameAdded)
loadGame.addEventListener('click', mapGeneration)