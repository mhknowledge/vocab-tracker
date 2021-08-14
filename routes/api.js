const db = require("../models");
const router = require("express").Router();

//get activity
router.get("/api/activity", (req, res) => {

    // db.Language.find({}).then(dbLanguage => {
    //     dbLanguage.forEach(activity => {
    //         var total = 0;
    //         activity.exercises.forEach(e => {
    //             total += e.duration;
    //         });
    //         activity.totalDuration = total;
    //     });
    //     res.json(dbLanguage);
    // }).catch(err => {
    //     res.json(err);
    // });
    db.Language.aggregate([{
        $addFields: {
            totalDuration: {$sum: "$exercises.duration"}
        }
    }])
    .sort({day: 1})
    .then(dbActivity => {
        res.json(dbActivity);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

//add & Update exercises
router.put("/api/activity/:id", (req, res) => {

    db.Language.findOneAndUpdate(
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

    router.post("/api/activity", ({body}, res) => {
        db.Language.create(body)
        .then(dbLanguage => {
            res.json(dbLanguage);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });

    //get activities in range
    router.get("/api/activity/range", (req, res) => {

        db.Language.find({}).then(dbLanguage => {
            console.log("ALL ACTIVITIES");
            console.log(dbLanguage);

            res.json(dbLanguage);
        }).catch(err => {
            res.json(err);
        });
    });

    router.delete('/api/activity', ({body}, res) => {
        db.Language.findByIdAndDelete(body.id)
        .then(() => {
            res.json(true);
        })
        .catch((err) => {
            res.json(err);
        });
    });
    
    module.exports = router;