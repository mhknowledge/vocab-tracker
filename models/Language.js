const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LanguageSchema = new Schema(
    {
    day: {
        type: Date,
        default: Date.now
    },
    activities: [
        {
            type: {
                type: String,
                trim: true,
                required: 'Enter an activity type',
            },
            name: {
                type: String,
                trim: true,
                required: 'Enter an activiy name',
            },
            duration: {
                type: Number,
                required: 'Enter an activity duration in minutes',
                default: 0,
           },
            sentences: {
                type: Number,
                default: 0
            },
            amount: {
                type: Number,
                default: 0
            },
            pages: {
                type: Number,
                default: 0
            }
        
        }
    ],
},
    {
        toObject: {virtuals: true},
        toJSON: {virtuals: true},
    }
 );
//  languageSchema.virtuals("totalDuration").get(function () {
//      return this.exercises.reduce((total, exercise) => {
//          return total + exercise.duration;
//      }, 0);
//  });

const Language = mongoose.model("Language", languageSchema);

module.exports = Language;