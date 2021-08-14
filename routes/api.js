const db = require("../models");
const router = require("express").Router();

//get activity
router.get("/api/activities", (req, res) => {

    db.Language.find({}).then(dbLanguage => {
        dbLanguage.forEach(activity => {
            var total = 0;
            activity.exercises.forEach(e => {
                total += e.duration;
            });
            activity.totalDuration = total;
        });
        res.json(dbLanguage);
    }).catch(err => {
        res.json(err);
    });
});

//add exercise
router.put("/api/activities/:id", (req, res) => {

    db.activity.findOneAndUpdate(
        {_id: req.params.id},
        {
            $inc: {totalDuration: req.body.duration},
            $push: {exercises: req.body}
        },
        {new: true}).then(dbLanguage => {
            res.json(dbLanguage);
        }).catch(err => {
            res.json(err);
        });
    });

    //get activities in range
    router.get("/api/activities/range", (req, res) => {

        db.activity.find({}).then(dbLanguage => {
            console.log("ALL ACTIVITIES");
            console.log(dbLanguage);

            res.json(dbLanguage);
        }).catch(err => {
            res.json(err);
        });
    });

    module.exports = router;