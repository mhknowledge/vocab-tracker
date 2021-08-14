const { format } = require("morgan");

const activityTypeSelect = document.querySelector("#type");
const vocabForm = document.querySelector(".vocabulary-form");
const readingForm = document.querySelector(".reading-form");
const writingForm = document.querySelector(".writing-form");
const convoForm = document.querySelector(".converstation-form");
const langNameInput = document.querySelector("language-name");
const nameInput = document.querySelector("#name");
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
    
}