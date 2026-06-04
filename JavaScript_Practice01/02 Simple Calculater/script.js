document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button");

    let currentInput = "";
    let operator = "";
    let previousInput = "";
    let isNewCalculation = false;

    buttons.forEach((button) => {
        button.addEventListener("click", handleButtonClick);
    });

    function handleButtonClick(e) {
        const buttonValue = e.target.textContent;
        console.log("点击按钮:", buttonValue);

        if (!isNaN(buttonValue) || buttonValue === ".") {
            if (isNewCalculation) {
                currentInput = "";
                isNewCalculation = false;
            }

            if (buttonValue === "." && currentInput.includes(".")) return;
            currentInput += buttonValue;
        }
        else if (buttonValue === "C") {
            clearCalculator();
        }
        else if (buttonValue === "=") {
            performCalculations();
            isNewCalculation = true;
        }
        else if (["+", "-", "*", "/"].includes(buttonValue)) {
            handleOperator(buttonValue);
            isNewCalculation = false;
        }

        updateDisplay();
    }

    function handleOperator(op) {
        if (operator && currentInput) {
            performCalculations();
            previousInput = currentInput;
            currentInput = "";
        } else {
            previousInput = currentInput || "0";
            currentInput = "";
        }

        operator = op;
    }

    function performCalculations() {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);

        if (isNaN(num1) || isNaN(num2)) {
            currentInput = "Error2";
            return;
        }

        if (operator === "/" && num2 === 0) {
            currentInput = "Error1";
            operator = "";
            previousInput = "";
            return;
        }

        switch (operator) {
            case "+":
                currentInput = (num1 + num2).toString();
                break;
            case "-":
                currentInput = (num1 - num2).toString();
                break;
            case "*":
                currentInput = (num1 * num2).toString();
                break;
            case "/":
                currentInput = (num1 / num2).toString();
                break;
            default:
                currentInput = num2.toString();
                break;
        }

        operator = "";
        previousInput = "";
        if (currentInput.includes(".") && currentInput.split(".")[1].length > 6) {
            currentInput = parseFloat(currentInput).toFixed(6);
        }
    }

    function clearCalculator() {
        currentInput = "";
        operator = "";
        previousInput = "";
    }

    function updateDisplay() {
        let displayText = currentInput || (operator ? `${previousInput} ${operator}` : "0");
        if (displayText.length > 12) {
            displayText = displayText.substring(0, 12);
        }
        display.textContent = displayText;
    }
});