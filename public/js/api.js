const API = {
    async getLastActivity() {
        let res;
        try {
            res = await fetch("/api/activities");
        } catch (err) {
            console.log(err)
        }
        const json = await res.json();
        return json[json.length -1];
    },
    async addActivity(data) {
        const id = location.search.split("=")[1];

        const res = await fetch("/api/activities/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        return json;
    },
    async createActivity(data = {}) {
        const res = await fetch("/api/activities", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });

        const json = await res.json();
        return json;
    },

    async getActivityInRange() {
        const res = await fetch(`/api/activities/range`);
        const json = await res.json();

        return json;
    },
};