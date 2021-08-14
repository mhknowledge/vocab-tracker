const { findAllByTestId } = require("@testing-library/react");
let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/language", {
    useNewUrlParser: true,
    useFindAndModify: false 
});

let languageSeed = [
    {
        day: new Date().setDate(new Date().getDate()-5),
        exercises: [
            {
                type: "vocabulary",
                name: "Old Words Review",
                amount: 15,
                duration: 10,
            }
        ]
    },
    {
    day: new Date().setDate(new Date().getDate()-4),
    exercises: [
        {
            type: "vocabulary",
            name: "New Words",
            amount: 15,
            duration: 20,
        }
    ]
    },
    {
        day: new Date().setDate(new Date().getDate()-3),
        exercises: [
        {
            type: "reading",
            pages: 10,
            duration: 20
       }
        ]
    },
    {
        day: new Date().setDate(new Date().getDate()-2),
        exercises: [
            {
                type: "writing",
                sentences: 10,
                duration:  15
            }
        ],
    },
    {
    day: new Date().setDate(new Date().getDate()-1),
    exercises: [
        {
            type: "conversation",
            duration: 15
        }
    ],
}
];

db.Language.deleteMany({})
.then(() => db.Language.collection.insertMany(languageSeed))
.then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});