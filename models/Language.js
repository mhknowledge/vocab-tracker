const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    activities: [
        {
            type: {
                type: String,
                trim: true,
            },
            name: {
                type: String,
                trim: true,
            },
            duration: Number,
            words: {
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
    totalDuration: {
        type: Number,
        default: 0,
    }
});

const Language = mongoose.model("Language", LanguageSchema);

module.exports = Language;