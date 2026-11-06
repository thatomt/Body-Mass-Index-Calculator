const bmiPointer = document.getElementById("bmi-pointer");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const calculateButton = document.getElementById("calculate-btn");
const resetButton = document.getElementById("reset-btn");

const bmiResult = document.getElementById("bmi-result");
const bmiCategory = document.getElementById("bmi-category");
const weightRange = document.getElementById("weight-range");
const healthMessage = document.getElementById("health-message");

function calculateBMI(weight, height) {
    const heightInMeters = height / 100;

    const bmi = weight / (heightInMeters ** 2);

    return bmi;
}

function analyzeBMI(bmi) {

    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 25) {
        return "Normal weight";
    } else if (bmi < 30) {
        return "Overweight";
    } else {
        return "Obesity";
    }
}


function calculateWeightRange(height) {

    const heightInMeters = height / 100;

    const minimumWeight = 18.5 * (heightInMeters ** 2);
    const maximumWeight = 24.9 * (heightInMeters ** 2);

    return {
        minimum: minimumWeight,
        maximum: maximumWeight
    };
}

// Move the BMI gauge pointer
function moveBMIPointer(bmi) {

    // Keep the pointer within the gauge
    if (bmi < 15) {
        bmi = 15;
    } else if (bmi > 40) {
        bmi = 40;
    }

    // Convert the BMI value into an angle
    const angle = ((bmi - 15) / 25) * 180 - 90;

    // Rotate the pointer
    bmiPointer.setAttribute(
        "transform",
        `rotate(${angle} 150 150)`
    );
}


function getHealthMessage(category) {

    if (category === "Underweight") {
        return "A BMI below the healthy reference range may be associated with nutritional deficiencies and other health concerns.";
    } else if (category === "Normal weight") {
        return "Your BMI falls within the healthy reference range. BMI alone cannot determine your overall health.";
    } else if (category === "Overweight") {
        return "A BMI in this category may be associated with an increased risk of certain health conditions.";
    } else {
        return "A BMI in this category is associated with an increased risk of several health conditions. Consider seeking professional health advice.";
    }
}


calculateButton.addEventListener("click", function () {

    const height = Number(heightInput.value);
    const weight = Number(weightInput.value);

    if (height <= 0 || weight <= 0 || heightInput.value === "" || weightInput.value === "") {
        alert("Please enter a valid height and weight.");
        return;
    }

    const bmi = calculateBMI(weight, height);

    const category = analyzeBMI(bmi);

    const range = calculateWeightRange(height);

    const message = getHealthMessage(category);

    bmiResult.textContent = bmi.toFixed(1);
    bmiCategory.textContent = category;
    moveBMIPointer(bmi);

    weightRange.textContent =
        range.minimum.toFixed(1) + " kg - " +
        range.maximum.toFixed(1) + " kg";

    healthMessage.textContent = message;

});


resetButton.addEventListener("click", function () {

    heightInput.value = "";
    weightInput.value = "";

    bmiResult.textContent = "--";
    bmiCategory.textContent = "--";
    weightRange.textContent = "--";
    healthMessage.textContent = "";
    // Return the pointer to its starting position
    bmiPointer.setAttribute("transform", "rotate(-90 150 150)");

});

