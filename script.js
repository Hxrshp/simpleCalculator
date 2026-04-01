let display = document.getElementById("display");

// Check if character is operator
function isOperator(ch) {
    return ['+', '-', '*', '/'].includes(ch);
}

// Append value with UX fixes
function appendValue(val) {
    let current = display.value;
    let lastChar = current.slice(-1);

    // Prevent starting with operator
    if (current === "" && isOperator(val)) return;

    // Replace operator (5+- → 5-)
    if (isOperator(lastChar) && isOperator(val)) {
        display.value = current.slice(0, -1) + val;
        return;
    }

    // Prevent multiple dots in a number
    if (val === '.') {
        let parts = current.split(/[\+\-\*\/]/);
        let lastPart = parts[parts.length - 1];
        if (lastPart.includes('.')) return;
    }

    display.value += val;
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
    try {
        const result = eval(display.value);
        display.value = String(result);
        display.classList.add("flash");
        setTimeout(() => display.classList.remove("flash"), 170);
    } catch {
        display.value = "Error";
        setTimeout(() => { display.value = ""; }, 900);
    }
}