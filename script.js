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

        if(ele.textContent === ".")
            decimalCount++;

        if(decimalCount<=1 || (decimalCount>1 && ele.textContent !== ".")){
            numInput+=ele.textContent;
            exp+=ele.textContent;
            currentCalculations.textContent = numInput;
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
        if(numInput.length>0 && ((!Number.isNaN(Number(numInput.charAt(numInput.length - 1)))) || (numInput.charAt(numInput.length - 1) === "="))){
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
    });
});

//equal

equal.addEventListener("click", () => {
    if(numInput.length > 0 && numInput.charAt(numInput.length - 1) !== "="){
        ans = math.evaluate(exp);
        numInput+=" =";
        currentAns.textContent = numInput;
        currentCalculations.textContent = ans;
        decimalCount = 0;
    }

});


