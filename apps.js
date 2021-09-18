const billAmount = document.querySelector("#billAmount");
const cashGiven = document.querySelector("#cashGiven");

const cashGivenGroup = document.querySelector("#cashGivenGroup");

const btnNext = document.querySelector("#btnNext");
const btnCheck = document.querySelector("#btnCheck");

const errorMessage = document.querySelector("#message");

const output = document.querySelector("#output");

const noOfNotes = document.querySelectorAll(".noOfNotes");
const notesAvailable = [2000, 500, 100, 20, 10, 5, 1];

btnNext.addEventListener("click", () => {
    clearError();
    const bill = billAmount.value;
    if (bill > 0) {
        btnNext.style.display="none";
        cashGivenGroup.style.display = "block";
    } else {
        error("Enter a valid bill amount.");
    }
});

btnCheck.addEventListener("click", () => {
    clearError();
    const cashValue = cashGiven.value;
    const billValue = billAmount.value;
    if (billValue > 0 && cashValue > 0) {
        let returnAmount = cashValue - billValue;
        if(Number(cashValue) < Number(billValue)) {
            error("Cash entered is lesser than bill amount");
            output.style.display = "none";
            return;
        }else if (returnAmount < 1) {
            error("No amount should be returned.");
            output.style.display = "none";
            return;
        } else {
            output.style.display = "block";
            calculateChange(cashValue, billValue);
        }
    } else {
        error("Enter a valid bill amount and cash given amount.");
    }
});

function calculateChange(cash, bill) {
    let restAmount = cash - bill;
    for (let i = 0; i < notesAvailable.length; i++) {
        let notes = Math.floor(restAmount / notesAvailable[i]);
        restAmount = restAmount - notes * notesAvailable[i];
        noOfNotes[i].innerText = notes;
    }
}

function error(message) {
    errorMessage.style.display = "block";
    errorMessage.innerText = message;
    output.style.display = "none";
}

function clearError() {
    errorMessage.style.display = "none";

}