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
    // when percent button is clicked
    if (this.classList.contains('percent')) return handlePercent();
    // when comma button is clicked
    if (this.classList.contains('comma')) return handleComma();
  });
});

function handleComma() {
  if (calculator.lastNum !== null) {
    if (calculator.lastNum.slice('.').length > 1) return;
    calculator.lastNum += '.';
  } else if (calculator.result !== null) {
    calculator.firstNum = '0.';
    calculator.result = null;
  } else if (calculator.firstNum !== null) {
    if (calculator.firstNum.slice('.').length > 2) return;
    calculator.firstNum += '.';
  } else {
    calculator.firstNum = '0.';
  }
  updateMainDisplay();
}

function handlePercent() {
  if (calculator.lastNum !== null) {
    calculator.lastNum = (calculator.lastNum / 100).toString();
  } else if (calculator.firstNum !== null) {
    calculator.firstNum = (calculator.firstNum / 100).toString();
  }
  updateMainDisplay();
}

function handleDelete() {
  if (calculator.lastNum !== null) {
    if (calculator.lastNum.length <= 1) {
      calculator.lastNum = null;
    } else {
      calculator.lastNum = calculator.lastNum.slice(0, -1);
    }
  } else if (calculator.operator !== null) {
    calculator.operator = null;
    calculator.isOperatorSet = false;
  } else if (calculator.firstNum !== null) {
    if (calculator.firstNum.length <= 1) {
      calculator.firstNum = null;
    } else {
      calculator.firstNum = calculator.firstNum.slice(0, -1);
    }
  } else {
    return;
  }

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

  if (calculator.lastNum === null) {
    calculator.lastNum = '0';
    calculator.mainContent += calculator.lastNum;
  }

  // change string to float
  const first = parseFloat(calculator.firstNum);
  const last = parseFloat(calculator.lastNum);

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
        if (button.innerText === '0') return;
        calculator.firstNum = button.innerText;
      } else {
        calculator.firstNum += button.innerText;
      }
    }
  }

  updateMainDisplay();
}
