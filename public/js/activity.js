async function initActivity() {
    const lastActivity = await API.getlastActivity();
    console.log("Last activity", lastActivity);
    if (lastActivity) {
        document
        .querySelector("a[href='/exercise?']")
        .setAttribute("href", `/exercise?id=${lastActivity._id}`);

        const activitySummary = {
            date: formatdate(lastActivity.day),
            totalDuration: lastActivity.totalDuration,
            numExercises: lastActivity.numExercises.length,
            ...tallyExercises(lastActivity.exercises)
        };

        renderActivitySummary(activitySummary);
    }else {
        renderNoActivityText()
    }
}

function tallyExercises(exercises) {
    const tallied = exercises.reduce((acc, curr) => {
        if (curr.type === "vocabulary") {
            acc.totalAmount =(acc.totalAmount || 0) + curr.amount;
            acc.totalDuration = (acc.totalDuration || 0) + curr.duration;
        } else if (curr.type === "reading") {
            acc.totalPages = (acc.totalPages || 0) + curr.pages;
            acc.totalDuration = (acc.totalDuration || 0) + curr.duration;
        } else if (curr.type === "writing") {
            acc.totalSentences = (acc.totalSentences || 0) + curr.sentences;
            acc.totalDuration = (acc.totalDuration || 0) + curr.duration;
        } else if (curr.type === "conversation") {
            acc.totalDuration = (acc.totalDuration || 0) + curr.duration;
        }
        return acc;
    }, {});
}

function formatDate(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    return new Date(date).toLocaleDateString(options);
}

function renderActivitySummary(summary) {
    const container = document.querySelector(".activity-stats");

    const activityKeyMap = {
        date: "Date",
        totalDuration: "Total Activity Duration",
        numExercises: "Exercises Performed",
        totalAmount: "Total Amount of New Words",
        totalPages: "Total # of Pages Read",
        totalSentences: "Total # of Sentences Written"
    };

    Object.keys(summary).forEach(key => {
        const p = document.createElement("p");
        const strong = document.createElement("strong");

        strong.textContent = activityKeyMap[key];
        const textNode = document.createTextMode(`: ${summary[key]}`);

        p.appendChild(strong);
        p.appendChild(textNode);
    
        container.appendChild(p);
    });
}

function renderNoActivityText() {
    const container = document.querySelector(".activity-stats");
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = "You have not created an activity yet!"

    p.appendChild(strong);
    container.appendChild(p);
}

initActivity();

