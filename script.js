document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".buttonss button");
    const display = document.querySelector(".res");
    let currentInput = '';
    let operator = null;
    let firstNumber = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            if (value === "C") {
                currentInput = '';
                firstNumber = null;
                operator = null;
                display.textContent = '0';
            } else if (value === "back") {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
            } else if (value === "=") {
                if (operator && firstNumber !== null) {
                    const secondNumber = parseFloat(currentInput);
                    if (!isNaN(secondNumber)) {
                        const result = calculate(firstNumber, operator, secondNumber);
                        display.textContent = result;
                        firstNumber = result;
                        currentInput = '';
                        operator = null;
                    }
                }
            } else if (["+", "-", "*", "/"].includes(value)) {
                if (operator && currentInput) {
                    firstNumber = calculate(firstNumber, operator, parseFloat(currentInput));
                    display.textContent = firstNumber;
                    currentInput = '';
                } else {
                    firstNumber = parseFloat(currentInput);
                }
                operator = value;
                shouldResetDisplay = true;
            } else {
                if (shouldResetDisplay) {
                    currentInput = '';
                    shouldResetDisplay = false;
                }
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    function calculate(num1, operator, num2) {
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                return num1 / num2;
            default:
                return num2;
        }
    }
});
