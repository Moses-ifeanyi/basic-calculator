const display = document.getElementById("display");
const clearBtn = document.querySelector(".clear");
const signBtn = document.querySelector(".sign");
const percentBtn = document.querySelector(".percent");
const operatorBtns = document.querySelectorAll(".operator");
const operandBtns = document.querySelectorAll(".operand");
const decimalBtn = document.querySelector(".decimal");
const equalsBtn = document.querySelector(".equals");

let firstOperand = null;
let operator = null;
let secondOperand = null;
let result = null;
let decimalPressed = false;

function clear() {
  display.textContent = "0";
  firstOperand = null;
  operator = null;
  secondOperand = null;
  result = null;
  decimalPressed = false;
}

function handleOperandClick(e) {
  const operand = e.target.value;

  if (operator) {
    secondOperand = secondOperand ? secondOperand + operand : operand;
    display.textContent = secondOperand;
  } else {
    firstOperand = firstOperand ? firstOperand + operand : operand;
    display.textContent = firstOperand;
  }
}

function handleOperatorClick(e) {
  const newOperator = e.target.value;

  if (operator && secondOperand) {
    performCalculation();
  }

  operator = newOperator;
  decimalPressed = false;
}

function handleDecimalClick() {
  if (!decimalPressed) {
    decimalPressed = true;

    if (operator && secondOperand) {
      secondOperand = secondOperand ? secondOperand + "." : "0.";
      display.textContent = secondOperand;
    } else {
      firstOperand = firstOperand ? firstOperand + "." : "0.";
      display.textContent = firstOperand;
    }
  }
}

function handleSignClick() {
  if (operator && secondOperand) {
    secondOperand = (-1 * parseFloat(secondOperand)).toString();
    display.textContent = secondOperand;
  } else if (firstOperand) {
    firstOperand = (-1 * parseFloat(firstOperand)).toString();
    display.textContent = firstOperand;
  }
}

function handlePercentClick() {
  if (operator && secondOperand) {
    secondOperand = (parseFloat(secondOperand) / 100).toString();
    display.textContent = secondOperand;
  } else if (firstOperand) {
    firstOperand = (parseFloat(firstOperand) / 100).toString();
    display.textContent = firstOperand;
  }
}

function performCalculation() {
  const num1 = parseFloat(firstOperand);
  const num2 = parseFloat(secondOperand);

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    default:
      return;
  }

  firstOperand = result.toString();
  operator = null;
  secondOperand = null;
  decimalPressed = false;
  display.textContent = result;
}

clearBtn.addEventListener("click", clear);
operandBtns.forEach((btn) => {
  btn.addEventListener("click", handleOperandClick);
});
operatorBtns.forEach((btn) => {
  btn.addEventListener("click", handleOperatorClick);
});
decimalBtn.addEventListener("click", handleDecimalClick);
signBtn.addEventListener("click", handleSignClick);
percentBtn.addEventListener("click", handlePercentClick);
equalsBtn.addEventListener("click", performCalculation);
