let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        // Prevent multiple decimal points
        if (num === '.' && currentInput.includes('.')) {
            return;
        }
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') {
        return;
    }

    if (previousInput !== '') {
        calculate();
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function calculate() {
    if (operator === null || currentInput === '' || previousInput === '') {
        return;
    }

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

// Show the calculation process
function updateDisplay() {
    if (operator && previousInput) {
        display.value = previousInput + ' ' + operator + ' ' + (currentInput || '');
    } else {
        display.value = currentInput || '0';
    }
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-') {
        appendOperator(e.key);
    } else if (e.key === '*') {
        appendOperator('*');
    } else if (e.key === '/' || e.key === ':') {
        e.preventDefault();
        appendOperator('/');
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});

// Initialize display
updateDisplay();
