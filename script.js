const historyBtn = document.getElementById("history");
const historyDiv = document.getElementById("historyDiv");
const historyBtnInsideDiv = document.getElementById("historyBtnInsideDiv");
const currentCalculations = document.getElementById("current-calculation");
const outlineDiv = document.querySelectorAll("#calculator-buttons, #answer-outer-div>div, #answer-outer-div+div");
const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const ansOnState = document.querySelectorAll(".on");
const currentAns = document.getElementById("current-answer");
const equal = document.getElementById("equal");
const historyPara = document.getElementById("history-para");
const clear = document.getElementById("clear");
const inverse = document.getElementById("inverse");
const sinBtn = document.querySelector(".sin");
const lnBtn = document.querySelector(".ln");
const cosBtn = document.querySelector(".cos");
const logBtn = document.querySelector(".log");
const tanBtn = document.querySelector(".tan");
const sqrtBtn = document.querySelector(".sqrt");
const ansBtn = document.querySelector(".ans");
const powerBtn = document.querySelector(".power");
const radian = document.querySelector("#radian");
const degree = document.querySelector("#degree");
const percentage = document.querySelector("#percent");
const factorial = document.querySelector(".fact");
const openingBraces = document.querySelector("#opening-braces");
const closingBraces = document.querySelector("#closing-braces");
const pieBtn = document.querySelector(".pie");
const exponentBtn = document.querySelector(".exponent");
const bigExponent = document.querySelector(".big-exponent");


inverse.setAttribute("style","backgroundColor:red")

let decimalCount = 0;
let numInput = "";
let exp = "";
let ans = 0;
let noOfOpeningBraces = 0;
let noOfClosingBraces = 0;
let isError = false;
let ran = NaN;
let isSqrt = false;
// numInput is for displaying on screen and exp is for the expression to evaluate

// history

historyBtn.addEventListener("click", () => {
    historyDiv.style.display = "block";
});

historyBtnInsideDiv.addEventListener("click", () => {
    historyDiv.style.display = "none";
});

outlineDiv.forEach(ele => {
    ele.addEventListener("click", () => {
        if(historyDiv.style.display === "block")
            historyDiv.style.display = "none";
    });
});

// for ans = 0 on the first click

ansOnState.forEach(ele => {
    ele.addEventListener("click", () => {
        if(clear.textContent === "AC"){
            clear.textContent = "CE";
        }
        if(currentAns.textContent === ""){
            currentAns.textContent = "Ans = 0";
        }
    });
});



// operands

number.forEach(ele => {
    ele.addEventListener("click", () => {
        if(numInput.charAt(numInput.length - 1) === "="){
            currentAns.textContent = `Ans = ${ans}`;
            numInput="";
            exp="";
        }

        // if an operator is passed just after the operand then a multiply operator is appended
        else if((numInput.charAt(numInput.length - 1) === "%") || (numInput.charAt(numInput.length - 1) === "!")
        || (numInput.charAt(numInput.length - 1) === ")") || (numInput.charAt(numInput.length - 1) === String.fromCharCode(960)) || 
        (numInput.charAt(numInput.length - 1) === String.fromCharCode(101)) || 
        (numInput.substring(numInput.length - 3) === "Ans") ||
        (numInput.endsWith(ran.toString()))
        ){
            numInput+=String.fromCharCode(215);
            exp+="*";
        }

        // to check for the number of decimal points in an operand
        if(ele.textContent === ".")
            decimalCount++;

        if(decimalCount<=1 || (decimalCount>1 && ele.textContent !== ".")){
            numInput+=ele.textContent;
            exp+=ele.textContent;
            currentCalculations.textContent = numInput;
        }
        if(clear.textContent === "AC"){
            clear.textContent = "CE";
        }
        
    });
});

// operators

operator.forEach(ele => {
    ele.addEventListener("click", () => {
        if(numInput === ""){
            numInput+="0";
            exp+="0";
        }

        if(numInput.length>0 && ((!Number.isNaN(Number(numInput.charAt(numInput.length - 1)))) || 
        (numInput.charAt(numInput.length - 1) === "=") || (numInput.charAt(numInput.length - 1) === "%") || 
        (numInput.charAt(numInput.length - 1) === "!") || (numInput.charAt(numInput.length - 1) === ")") || 
        (numInput.charAt(numInput.length - 1) === String.fromCharCode(960)) || (numInput.charAt(numInput.length - 1) === String.fromCharCode(101)) 
        )){
            if(numInput.length > 0 && numInput.charAt(numInput.length - 1) === "="){
                exp = ans;
                numInput = ans;
                currentAns.textContent = `Ans = ${exp}`;
            }
            if(ele.textContent.charCodeAt(0) === 215){
                exp+="*";
            }
            else if(ele.textContent.charCodeAt(0) === 247){
                exp+="/";
            }
            else if(ele.textContent.charCodeAt(0) === 8722){
                exp+="-";
            }
            else if(ele.textContent.charCodeAt(0) === 43){
                exp+="+";
            }
            numInput+=ele.textContent;
            currentCalculations.textContent = numInput;
            decimalCount = 0;
        }
        if(clear.textContent === "AC"){
            clear.textContent = "CE";
        }
    });
});

//equal

equal.addEventListener("click", () => {
    if(numInput.length > 0 && numInput.charAt(numInput.length - 1) !== "="){
        
        // if the opening braces are more than the closing braces then the required number of closing braces 
        // are appended automatically

        if(noOfOpeningBraces>0 && noOfOpeningBraces>noOfClosingBraces){
            const bracesLeft = noOfOpeningBraces - noOfClosingBraces;
            for(let i = 0; i < bracesLeft; i++){
                numInput+=")";
                exp+=")";
                noOfClosingBraces++;
            }
        }
        console.log(exp);

        try{
            isError = false;
            if(math.evaluate(exp) % 1 === 0)
                ans = math.evaluate(exp);
            else 
                ans = math.evaluate(exp).toFixed(10);    
        }
        catch(err){
            isError = true;

        }
        finally{
            historyPara.style.display = "none";
            const calcHistMostOuterDiv = document.createElement("div");
            const calcHistOuterDiv = document.createElement("div");
            const calcHistExpDiv = document.createElement("div");
            const calcHistEqualDiv = document.createElement("div");
            const calcHistAnsDiv = document.createElement("div");
            
            if((historyDiv.lastElementChild.nodeName === "P")||(historyDiv.lastElementChild.nodeName === "DIV" && historyDiv.lastElementChild.firstElementChild.textContent !== numInput)){
                calcHistEqualDiv.textContent = "=";
                calcHistExpDiv.textContent = numInput;
                calcHistAnsDiv.textContent = ans;
                calcHistOuterDiv.appendChild(calcHistExpDiv);
                calcHistOuterDiv.appendChild(calcHistEqualDiv);
                calcHistOuterDiv.appendChild(calcHistAnsDiv);
                calcHistMostOuterDiv.appendChild(calcHistOuterDiv);
                historyDiv.appendChild(calcHistOuterDiv);
        
                calcHistOuterDiv.setAttribute("style", "display:flex;alignItems:center;position:relative;top:50px;marginRight:20px;")
                calcHistExpDiv.setAttribute("style", "border:1px solid gray;padding:10px;borderRadius:10px;color:blue;margin:10px;");
                calcHistAnsDiv.setAttribute("style", "border:1px solid gray;padding:10px;borderRadius:10px;color:blue;margin:10px;");
                calcHistEqualDiv.setAttribute("style", "fontSize:40px;margin:10px 0;padding:10px;");
                calcHistMostOuterDiv.setAttribute("style", "position:relative;overflowY:scroll;height:200px;top:(100px);")
            }
            
    
            if(!isError){
                currentCalculations.textContent = ans;
                numInput+=" =";
                currentAns.textContent = numInput;
            }
            else{
                currentCalculations.textContent = "Error";
                numInput+=" =";
                currentAns.textContent = numInput;
                numInput = "";
                exp = "";
                ans = 0;
            }
            
            
            decimalCount = 0;
            noOfClosingBraces = 0;
            noOfOpeningBraces = 0;
    
            if(clear.textContent === "CE"){
                clear.textContent = "AC";
            }
        }      
       
    }

});

//clear

clear.addEventListener("click", () => {
    if(currentAns.textContent === ""){
        currentAns.textContent = "Ans = 0";
    }
    if(clear.textContent === "CE"){
        numInput = numInput.substring(0,numInput.length-1);
        exp = exp.substring(0, exp.length - 1);
        if(numInput.length>0)
            currentCalculations.textContent = numInput; 
        else
            currentCalculations.textContent = "0";
    }
    else if (clear.textContent === "AC"){
        currentAns.textContent = `Ans = ${ans}`;
        currentCalculations.textContent = "0";
        numInput = "";
        exp = "";
        clear.textContent = "CE";    
    }
});

// inverse

inverse.addEventListener("click", () => {
    const invColor = inverse.getAttribute("style").substring(16);
    if(invColor === "red")
        inverse.setAttribute("style","backgroundColor:red");
    else
        inverse.setAttribute("style","backgroundColor:blue");
    sinBtn.innerHTML = sinBtn.innerHTML === "sin" ? "sin"+"-1".sup() : "sin";
    lnBtn.innerHTML = lnBtn.innerHTML === "ln" ? "e"+"x".sup() : "ln";
    cosBtn.innerHTML = cosBtn.innerHTML === "cos" ? "cos"+"-1".sup() : "cos";
    logBtn.innerHTML = logBtn.innerHTML === "log" ? "10"+"x".sup() : "log";
    tanBtn.innerHTML = tanBtn.innerHTML === "tan" ? "tan"+"-1".sup() : "tan";
    sqrtBtn.innerHTML = sqrtBtn.innerHTML.charCodeAt(0) === 8730 ? "x"+"2".sup() : String.fromCharCode(8730);
    ansBtn.innerHTML = ansBtn.innerHTML === "Ans" ? "Rnd" : "Ans";
    powerBtn.innerHTML = powerBtn.innerHTML.charCodeAt(0) === 120 ? "n".sup()+String.fromCharCode(8730)+"x" : String.fromCharCode(120)+"n".sup();
});

// degree

degree.addEventListener("click", () => {
    console.log(degree.textContent);
    radian.disabled = false;
    degree.disabled = true;
});

// radian

radian.addEventListener("click", () => {
    radian.disabled = true;
    degree.disabled = false;
});

//  percentage

percentage.addEventListener("click", () => {
    if(numInput.length === 0){
        numInput+="0";
        exp+="0";
    }
    else if(numInput.length>0 && numInput.charAt(numInput.length - 1) === "="){
        numInput = ans;
        exp = ans;
        currentAns.textContent = `Ans = ${ans}`;
    }
    if(numInput.length>0 && numInput.charAt(numInput.length - 1) !== "("){
        numInput+=percentage.textContent;
        exp+=percentage.textContent;
        currentCalculations.textContent = numInput;
    }
    
});

// factorial

factorial.addEventListener("click", () => {
    if(numInput.length === 0){
        numInput+="0";
        exp+="0";
    }
    else if(numInput.length>0 && numInput.charAt(numInput.length - 1) === "="){
        numInput = ans;
        exp = ans;
        currentAns.textContent = `Ans = ${ans}`;
    }
    numInput+=factorial.textContent.charAt(1);
    exp+=factorial.textContent.charAt(1);
    currentCalculations.textContent = numInput;
});


// opening braces

openingBraces.addEventListener("click", () => {
    if(numInput.length === 0){
        currentAns.textContent = `Ans = ${ans}`;
    }
    if(numInput.length !== 0){
        if(Number.isNaN(Number(numInput.charAt(numInput.length - 1))) !== true){
            exp+="*";
        }
    }
    noOfOpeningBraces++;
    numInput+=openingBraces.textContent;
    exp+=openingBraces.textContent;
    currentCalculations.textContent = numInput;

});

// closing braces

closingBraces.addEventListener("click", () => {
    // closing braces should not be more than the opening braces and not allowing empty opening and closing braces
    if(noOfOpeningBraces>noOfClosingBraces && (numInput.length>0 && numInput.charAt(numInput.length - 1) !== "(")){
        noOfClosingBraces++;
        numInput+=closingBraces.textContent;
        exp+=closingBraces.textContent;
        currentCalculations.textContent = numInput;
        if(isSqrt){
            exp+="^(1/2)";
        }
        isSqrt = false;
    }
});


// sin and sin^-1

function trigoCompute(btn, val){
    if(numInput.length>0 && numInput.charAt(numInput.length - 1) === "="){
        numInput = "";
        exp = "";
        currentAns.textContent = `Ans = ${ans}`;
    }
    if(numInput.length !== 0){
        if(Number.isNaN(Number(numInput.charAt(numInput.length - 1))) !== true){
            exp+="*";
        }
    }
    if(btn.textContent === val){
        numInput+=btn.textContent;
        exp+=btn.textContent;
    }
    else{
        numInput+="arc";
        numInput+=val;
        exp+="arc";
        exp+=val;
    }
    noOfOpeningBraces++;
    numInput+="(";
    exp+="(";
    currentCalculations.textContent = numInput;
}

// sin and sin^-1

sinBtn.addEventListener("click", () => {
    trigoCompute(sinBtn, "sin");
});

// cos and cos^-1

cosBtn.addEventListener("click", () => {
    trigoCompute(cosBtn, "cos");
});

// tan and tan^-1

tanBtn.addEventListener("click", () => {
    trigoCompute(tanBtn, "tan");
});

// ln and e^x

lnBtn.addEventListener("click", () => {
    if(numInput.length>0 && numInput.charAt(numInput.length - 1) === "="){
        numInput = "";
        exp = "";
        currentAns.textContent = `Ans = ${ans}`;
    }
    if(lnBtn.textContent === "ln"){
        numInput+=lnBtn.textContent;
        exp+="log";
        noOfOpeningBraces++;
        numInput+="(";
        exp+="(";
        currentCalculations.textContent = numInput;
    }
    else{
        numInput+=lnBtn.textContent.charAt(0);
        exp+=lnBtn.textContent.charAt(0);
        numInput+="^";
        exp+="^";
        currentCalculations.textContent = numInput;
    }
});

// log and 10^x

logBtn.addEventListener("click", () => {
    if(numInput.length>0 && numInput.charAt(numInput.length - 1) === "="){
        numInput = "";
        exp = "";
        currentAns.textContent = `Ans = ${ans}`;
    }

    if(logBtn.textContent === "log"){
        numInput+=logBtn.textContent;
        exp+=logBtn.textContent;
        exp+="10";
        noOfOpeningBraces++;
        numInput+="(";
        exp+="(";
        currentCalculations.textContent = numInput;
    }
    else{
        numInput+=logBtn.textContent.substring(0,2);
        exp+=logBtn.textContent.substring(0,2);
        numInput+="^";
        exp+="^";
        currentCalculations.textContent = numInput;
    }
});

// ^(1/2) and ^2

sqrtBtn.addEventListener("click", () => { 
    if(numInput.length>0 && numInput.charAt(numInput.length - 1) === "="){
        numInput = ans;
        exp = ans;
        currentAns.textContent = `Ans = ${ans}`;
    }

    if(sqrtBtn.textContent.charCodeAt(0) === 8730){
        if(numInput.length !== 0){
            if(Number.isNaN(Number(numInput.charAt(numInput.length - 1))) !== true){
                exp+="*";
            }

        }
        isSqrt = true;
        numInput+=sqrtBtn.textContent;
        numInput+="(";
        exp+="(";
        noOfOpeningBraces++;
    }
    else{
        if(numInput.length === 0){
            exp = "0";
            numInput = "0";
        }
        exp+="^2";
        numInput+="^2";
    }
    currentCalculations.textContent = numInput;
});



function constantVal(code, val){
    if(numInput.length>0 && numInput.charAt(numInput.length - 1) === "="){
        numInput = "";
        exp = "";
        currentAns.textContent = `Ans = ${ans}`;
    }
    else if(numInput.length>0 && numInput.charAt(numInput.length - 1) === String.fromCharCode(code)){
        numInput+=String.fromCharCode(215);
        exp+="*";
    }
    numInput+=String.fromCharCode(code);
    exp+= val;
    currentCalculations.textContent = numInput;
};

// pie

pieBtn.addEventListener("click", () => {
    constantVal(960, "PI");
});

// exponent

exponentBtn.addEventListener("click", () => {
    constantVal(101, "e")
});

// answer

ansBtn.addEventListener("click", () => {
    if(numInput.length>0 && numInput.charAt(numInput.length - 1) === "="){
        numInput = "";
        exp = "";
        currentAns.textContent = `Ans = ${ans}`;
    }
    if(ansBtn.textContent === "Ans"){
        if(numInput.length>0 && numInput.substring(numInput.length - 3) === "Ans"){
            numInput+=String.fromCharCode(215);
            exp+="*";
        }
        numInput+="Ans";
        exp+=ans;
        currentCalculations.textContent = numInput;
        console.log(numInput.substring(numInput.length - 3));
    }
    else if(ansBtn.textContent === "Rnd"){
        if(numInput.length>0){
            numInput+=String.fromCharCode(215);
            exp+="*";
        }
        ran = math.random();
        numInput+=ran;
        exp+=ran;
        currentCalculations.textContent = numInput;
    }
    
});

// big exponent

bigExponent.addEventListener("click", () => {
    if(numInput.length !== 0){
        numInput+="E";
        exp+="E";
        currentCalculations.textContent = numInput;
    }
});

// nth power

powerBtn.addEventListener("click", () => {
    if(numInput.length>0 && numInput.charAt(numInput.length - 1) === "="){
        numInput = ans;
        exp = ans;
        currentAns.textContent = `Ans = ${ans}`;
    }
    if(numInput.length !== 0 && powerBtn.textContent === (String.fromCharCode(120)+String.fromCharCode(8319))){
        numInput+="^";
        exp+="^";
        currentCalculations.textContent = numInput;
    }

    else if(numInput.length !== 0 && powerBtn.textContent === (String.fromCharCode(110)+String.fromCharCode(8730)+String.fromCharCode(120))){
        numInput+="^(1/";
        exp+="^(1/";
        noOfOpeningBraces++;
        currentCalculations.textContent = numInput;
    }

}); 


// sin in degree, nth square root



