// create object to keep state
const calculator = {
  firstNum: null,
  lastNum: null,
  operator: null,
  isOperatorSet: false,
  mainContent: '',
  secondContent: '',
  result: null,
};

// get all buttons and give event onClick
const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
  button.addEventListener('click', function () {
    // when the number button is clicked
    if (this.classList.contains('num')) return handleNum(this);
    // when the operator button is clicked
    if (this.classList.contains('operator')) return handleOperator(this);
    // when the equals button is clicked
    if (this.classList.contains('equals')) return performCalculate();
    // when the clear button is clicked
    if (this.classList.contains('clear')) return clearDisplay();
    // when the delete button is clicked
    if (this.classList.contains('delete')) return handleDelete();
  });
});

function handleDelete() {
  // cek apakah operator null atau tidak
  if (calculator.operator === null) {
    if (calculator.firstNum === null) return;
    calculator.firstNum = calculator.firstNum.slice(0, -1);
  } else {
    calculator.lastNum = calculator.lastNum.slice(0, -1);
  }

  if (calculator.firstNum.length === 0) calculator.firstNum = null;
  updateMainDisplay();
}

function reset() {
  calculator.firstNum = null;
  calculator.lastNum = null;
  calculator.operator = null;
  calculator.isOperatorSet = false;
  calculator.mainContent = '';
  calculator.secondContent = '';
  calculator.result = null;
}

function clearDisplay() {
  reset();
  const second = document.getElementById('second');
  second.style.visibility = 'hidden';
  updateMainDisplay();
}

function performCalculate() {
  if (calculator.result !== null && !calculator.isOperatorSet) return;

  if (calculator.operator === null) return;

  if (calculator.lastNum == null) {
    calculator.lastNum = '0';
    calculator.mainContent += calculator.lastNum;
  }

  // change string to float
  const first = parseFloat(calculator.firstNum);
  const last = parseInt(calculator.lastNum);

  if (calculator.operator === '+') calculator.result = first + last;
  if (calculator.operator === '-') calculator.result = first - last;
  if (calculator.operator === '*') calculator.result = first * last;
  if (calculator.operator === '/') calculator.result = first / last;

  calculator.firstNum = calculator.result.toString();
  updateSecondDisplay();

  // reset
  calculator.lastNum = null;
  calculator.operator = null;
  calculator.isOperatorSet = false;

  updateMainDisplay();
}

function updateSecondDisplay() {
  calculator.secondContent = `${calculator.mainContent} = ${calculator.firstNum}`;
  const second = document.getElementById('second');
  second.style.visibility = 'visible';
  second.innerText = calculator.secondContent;
}

function handleOperator(button) {
  if (calculator.firstNum === null) return;
  calculator.isOperatorSet = true;

  if (button.classList.contains('addition')) calculator.operator = '+';
  if (button.classList.contains('subtraction')) calculator.operator = '-';
  if (button.classList.contains('multiplication')) calculator.operator = '*';
  if (button.classList.contains('divide')) calculator.operator = '/';

  updateMainDisplay();
}

function updateMainDisplay() {
  const mainDisplay = document.getElementById('main');
  const first = calculator.firstNum ?? '0';
  const operator = calculator.operator ?? '';
  const last = calculator.lastNum ?? '';

  calculator.mainContent = `${first} ${operator} ${last}`;
  mainDisplay.innerText = calculator.mainContent;
}

function handleNum(button) {
  if (calculator.isOperatorSet) {
    if (calculator.lastNum === null) {
      calculator.lastNum = button.innerText;
    } else {
      calculator.lastNum += button.innerText;
    }
  } else {
    if (calculator.result !== null) {
      calculator.firstNum = button.innerText;
      calculator.result = null;
    } else {
      if (calculator.firstNum === null) {
        calculator.firstNum = button.innerText;
      } else {
        calculator.firstNum += button.innerText;
      }
    }
  }

  updateMainDisplay();
}
