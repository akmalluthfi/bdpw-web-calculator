const calculator = {
  firstNum: null,
  lastNum: null,
  operator: null,
  isOperatorSet: false,
  mainContent: '',
  secondContent: '',
  result: null,
};

// ambil semua button dan beri event
const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
  button.addEventListener('click', function () {
    // cek apakah click angka
    if (this.classList.contains('num')) return handleNum(this);
    // cek apakah click operator
    if (this.classList.contains('operator')) return handleOperator(this);
    // cek apakah click sama dengan
    if (this.classList.contains('equals')) return performCalculate();
  });
});

function performCalculate() {
  if (calculator.result !== null && !calculator.isOperatorSet) return;

  if (calculator.lastNum == null) {
    calculator.lastNum = '0';
    calculator.mainContent += calculator.lastNum;
  }

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
  // cek apakah firstNum null
  // return false
  if (calculator.firstNum === null) return;
  calculator.isOperatorSet = true;
  // cek operator apa yang ditekan
  if (button.classList.contains('addition')) {
    calculator.operator = '+';
  }

  if (button.classList.contains('subtraction')) {
    calculator.operator = '-';
  }

  if (button.classList.contains('multiplication')) {
    calculator.operator = '*';
  }

  if (button.classList.contains('divide')) {
    calculator.operator = '/';
  }

  updateMainDisplay();
}

function updateMainDisplay() {
  const mainDisplay = document.getElementById('main');
  const first = calculator.firstNum ?? '';
  const operator = calculator.operator ?? '';
  const last = calculator.lastNum ?? '';

  calculator.mainContent = `${first} ${operator} ${last}`;
  mainDisplay.innerText = calculator.mainContent;
}

function handleNum(button) {
  // cek apakah
  if (calculator.isOperatorSet) {
    if (calculator.lastNum === null) {
      calculator.lastNum = button.innerText;
    } else {
      calculator.lastNum += button.innerText;
    }
  } else {
    // result sudah ada dan operator belum diset
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
  // update main display
  updateMainDisplay();
}
