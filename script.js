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


inverse.setAttribute("style","backgroundColor:red")

let decimalCount = 0;
let numInput = "";
let exp = "";
let ans = 0;
// numInput is for displaying on screen and exp is for the expression to evaluate

// history

historyBtn.addEventListener("click", () => {
    historyDiv.style.display = "block";
});

historyBtnInsideDiv.addEventListener("click", () => {
    historyDiv.style.display = "none";
});

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

outlineDiv.forEach(ele => {
    ele.addEventListener("click", () => {
        if(historyDiv.style.display === "block")
            historyDiv.style.display = "none";
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
        else if((numInput.charAt(numInput.length - 1) === "%") || (numInput.charAt(numInput.length - 1) === "!")){
            numInput+=String.fromCharCode(215);
            exp+="*";
        }
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
        (numInput.charAt(numInput.length - 1) === "!"))){
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
        ans = math.evaluate(exp);
        
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
        


        numInput+=" =";
        currentAns.textContent = numInput;
        currentCalculations.textContent = ans;
        decimalCount = 0;

        if(clear.textContent === "CE"){
            clear.textContent = "AC";
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
    powerBtn.innerHTML = powerBtn.innerHTML.charCodeAt(0) === 120 ? "n".sup()+String.fromCharCode(8730)+"x" : String.fromCharCode(120);
});

// degree

degree.addEventListener("click", () => {
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
    numInput+=percentage.textContent;
    exp+=percentage.textContent;
    currentCalculations.textContent = numInput;
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


