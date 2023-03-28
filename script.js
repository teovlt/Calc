// Initialize the variables
let runningTotal = 0 // The current result of the calculations
let buffer = '0' // The current number being typed in by the user
let previousOperator // The previous math operator selected by the user

// Get the calculator screen element
const screen = document.querySelector('.screen')

// Handle button clicks
function buttonClick(value) {
    if (isNaN(value)) {
        // If the button clicked is a symbol (not a number)
        handleSymbol(value)
    } else {
        // If the button clicked is a number
        handleNumber(value)
    }

    // Update the calculator screen with the current buffer value
    screen.innerText = buffer
}

// Handle symbol buttons (not numbers)
function handleSymbol(symbol) {
    switch (symbol) {
        case 'C': // Clear button
            buffer = '0'
            runningTotal = 0
            break

        case '=': // Equals button
            if (previousOperator === null) {
                // If no operator was selected yet
                return // Do nothing
            }
            flushOperation(parseInt(buffer)) // Perform the math operation
            previousOperator = null // Reset the previous operator
            buffer = runningTotal // Update the buffer with the new running total
            runningTotal = 0 // Reset the running total
            break

        case '←': // Backspace button
            if (buffer.length === 1) {
                // If there's only one digit left
                buffer = '0' // Reset the buffer to 0
            } else {
                buffer = buffer.substring(0, buffer.length - 1) // Remove the last digit from the buffer
            }
            break

        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol) // Handle the math operator button
            break
    }
}

// Handle math operator buttons
function handleMath(symbol) {
    if (buffer === '0') {
        // If the buffer is empty
        return // Do nothing
    }

    const intBuffer = parseInt(buffer) // Convert the buffer to an integer

    if (runningTotal === 0) {
        // If this is the first number entered
        runningTotal = intBuffer // Set the running total to the buffer value
    } else {
        // If there's already a running total
        flushOperation(intBuffer) // Perform the previous operation
    }
    previousOperator = symbol // Set the previous operator to the current one
    buffer = '0' // Reset the buffer
}

// Perform the previous math operation
function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        // If the previous operator was addition
        runningTotal += intBuffer // Add the current buffer value to the running total
    } else if (previousOperator === '-') {
        // If the previous operator was subtraction
        runningTotal -= intBuffer // Subtract the current buffer value from the running total
    } else if (previousOperator === '×') {
        // If the previous operator was multiplication
        runningTotal *= intBuffer // Multiply the running total by the current buffer value
    } else if (previousOperator === '÷') {
        // If the previous operator was division
        runningTotal /= intBuffer // Divide the running total by the current buffer value
    }
}

// Handle number buttons
function handleNumber(numberString) {
    if (buffer === '0') {
        // If the buffer is empty
        buffer = numberString // Set the buffer to the current number
    } else {
        buffer += numberString // Add the current number to the buffer
    }
}

//Initialize the calc, on each button clicked the function "buttonClick" is launch
function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText)
    })
}

//Start the process
init()
