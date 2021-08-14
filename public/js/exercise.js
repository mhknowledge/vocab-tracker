const { format } = require("morgan");

const activityTypeSelect = document.querySelector("#type");
const vocabForm = document.querySelector(".vocabulary-form");
const readingForm = document.querySelector(".reading-form");
const writingForm = document.querySelector(".writing-form");
const convoForm = document.querySelector(".converstation-form");
const langNameInput = document.querySelector("language-name");
// const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const durationInput = document.querySelector("#duration");
const pagesInput = document.querySelector("#pages");
const sentencesInput = document.querySelector("#sentences");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const newActivity = document.querySelector(".new-activity");

let activityType = null;
let shouldNavigateAway = false;

async function initExercise () {
    let activities;
    
    if (location.search.split("=")[1] ===undefined) {
        acitivy = await API.createActivity()
        console.log(activity)
    }
    if (activity) {
        location.search = "?id=" + activity._id;
    }
}

initExercise();

function handleActivityTypeChange(event) {
    activityType = event.target.value;

    if (activityType === "vocabulary") {
        vocabForm.classList.remove("d-none");
        readingForm.classList.add("d-none");
        writingForm.classList.add("d-none");
        convoForm.classList.add("d-none");
    } else if (activityType ==="reading") {
        readingForm.classList.remove("d-none");
        vocabForm.classList.add("d-none");
        writingForm.classList.add("d-none");
        convoForm.classList.add("d-none");
    } else if (activityType === "writing") {
        writingForm.classList.remove("d-none");
        vocabForm.classList.add("d-none");
        readingForm.classList.add("d-none");
        convoForm.classList.add("d-none");
    } else if (activityType === "conversation") {
        convoForm.classList.remove("d-none");
        vocabForm.classList.add("d-none");
        readingForm.classList.add("d-none");
        writingForm.classList.add("d-none");
    } else {
        vocabForm.classList.add("d-none");
        readingForm.classList.add("d-none");
        writingForm.classList.add("d-none");
        convoForm.classList.add("d-none");
    }

    validateInputs();
}

function validateInputs() {
    let isValid = true;

    if (activityType === "vocabulary") {
        if (langNameInput.value.trim() ==="") {
            isValid = false;
        }
        if (amountInput.value.trim() ==="") {
            isValid = false;
        }
        if (durationInput.value.trim() === "") {
            isValid = false;
        }
    } else if (activityType === "reading") {
        if (langNameInput.value.trim() ==="") {
            isValid = false;
        }
        if (pagesInput.value.trim() === "") {
            isValid = false;
        }
        if (durationInput.value.trim() === "") {
            isValid = false;
        }
    } else if (activityType === "writing") {
        if (langNameInput.value.trim() ==="") {
            isValid = false;
        }
        if (sentencesInput.value.trim() === "") {
            isValid = false;
        }
        if (durationInput.value.trim() === "") {
            isValid = false;
        }
    } else if (activityType === "conversation") {
        if (langNameInput.value.trim() ==="") {
            isValid = false;
        }
        if (durationInput.value.trim() === "") {
            isValid = false;
        }
    }

    if (isValid) {
        completeButton.removeAttribute("disabled");
        addButton.removeAttribute("disabled");
    } else {
        completeButton.setAttribute("disabled", true);
        addButton.setAttribute("disabled", true);
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();

    let activityData = {};

    if (activityType === "vocabulary") {
        activityData.type = "vocabulary";
        activityData.name = langNameInput.value.trim();
        activityData.amount = Number(amountInput.value.trim());
        activityData.duration = Number(durationInput.value.trim());
    } else if (activityType === "reading") {
        activityData.type = "reading";
        activityData.name = langNameInput.value.trim();
        activityData.pages = Number(pagesInput.value.trim());
        activityData.duration = Number(durationInput.value.trim());
    } else if (activityType === "writing") {
        activityData.type = "writing";
        activityData.name = langNameInput.value.trim();
        activityData.sentences = Number(sentencesInput.value.trim());
        activityData.duration = Number(durationInput.value.trim());
    } else if (activityType === "conversation") {
        activityData.type = "conversation";
        activityData.name = langNameInput.value.trim();
        activityData.duration = Number(durationInput.value.trim());
    }

    await API.addExercise(workoutData);
    clearInputs();
    toast.classList.add("success");
}

function handleToastAnimationEnd() {
    toast.removeAttribute("class");
    if (shouldNavigateAway) {
        location.href = "/";
    }
}

function clearInputs() {
    langNameInput.value = "";
    amountInput.value = "";
    durationInput.value = "";
    pagesInput.value = "";
    sentencesInput.value = "";
}

if (activityTypeSelect) {
    activityTypeSelect.addEventListener("change", handleActivityTypeChange);
}

if (completeButton) {
    completeButton.addEventListener("click", function (event) {
        shouldNavigateAway = true;
        handleFormSubmit(event);
    });
}
if (addButton) {
    addButton.addEventListener("click", handleFormSubmit);
}
toast.addEventListener("animationend", handleToastAnimationEnd);

document
.querySelectorAll("input")
.forEach(element => element.addEventListener("input", validateInputs));