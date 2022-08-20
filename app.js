// Connecting elements
const currentNumber = document.querySelector(".currentNumber");

const previousNumber = document.querySelector(".previousNumber p");

const mathSign = document.querySelector(".mathSign");

const numbersButtons = document.querySelectorAll(".number");

const operatorsButtons = document.querySelectorAll(".operator");

const equalsButton = document.querySelector(".equals");

const clearButton = document.querySelector(".clear");

const calculatorHistory = document.querySelector(".history");

const historyBtn = document.querySelector(".history-btn");

let result = "";

// Prevent to insert more than one dot
function displayNumbers() {
  if (this.textContent === "." && currentNumber.innerHTML.includes(".")) return;
  if (this.textContent === "." && currentNumber.innerHTML === "")
    return (currentNumber.innerHTML = "0.");
  //display values
  currentNumber.innerHTML += this.textContent;
}

//insert operators to display view
function operate() {
  if (currentNumber.innerHTML === "" && this.textContent === "-") {
    currentNumber.innerHTML = "-";
    return;
  } else if (currentNumber.innerHTML === "") {
    return;
  }

  //block inserting operators before numbers
  if (mathSign.innerHTML !== "") {
    showResult();
  }
  previousNumber.innerHTML = currentNumber.innerHTML;
  mathSign.innerHTML = this.textContent;
  currentNumber.innerHTML = "";
}

//core logic of operators on numbers
function showResult() {
  if (previousNumber.innerHTML === "" || currentNumber.innerHTML === "") return;

  let a = Number(currentNumber.innerHTML);
  let b = Number(previousNumber.innerHTML);
  let operator = mathSign.innerHTML;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = b - a;
      break;
    case "x":
      result = a * b;
      break;
    case ":":
      result = b / a;
      break;
    case "2^":
      result = b ** a;
      break;
  }

  // Show button on history
  addToHistory();
  historyBtn.classList.add("active");
  currentNumber.innerHTML = result;
  previousNumber.innerHTML = "";
  mathSign.innerHTML = "";
}

//Add result to history list
function addToHistory() {
  const newHistoryItem = document.createElement("li");
  newHistoryItem.classList.add("history-item");
  newHistoryItem.innerHTML = `${currentNumber.innerHTML} ${mathSign.innerHTML} ${previousNumber.innerHTML} = ${result}`;
  calculatorHistory.appendChild(newHistoryItem);
}

// Clear alle results from the history list and hide button
function clearHistory() {
  calculatorHistory.textContent = "";
  if (calculatorHistory.textContent === "") {
    historyBtn.classList.remove("active");
  }
}

//Remove numbers and operator sign from display view
function clearScreen() {
  result = "";
  currentNumber.innerHTML = "";
  previousNumber.innerHTML = "";
  mathSign.innerHTML = "";
}

// Adding click to buttons

operatorsButtons.forEach((button) => button.addEventListener("click", operate));

equalsButton.addEventListener("click", showResult);

clearButton.addEventListener("click", clearScreen);

numbersButtons.forEach((button) => {
  button.addEventListener("click", displayNumbers);
});

historyBtn.addEventListener("click", clearHistory);
