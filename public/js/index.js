init();

async function init() {
    if (location.search.split("=")[1] ===undefined) {
        const activity = await API.getLastActivity();
        if (activity) {
            location.search = "?id" + activity._id;
        } else {
            document.querySelector("#continue-btn").classList.add("d-none")
        }
    }
}