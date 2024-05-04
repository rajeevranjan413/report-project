import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Worker"
    },
    area: {
        type: String,
        enum: ['Area 1', 'Area 2', 'Area 3', 'Area 4'],
        required: true
    },

    topic: {
        type: String,
        enum: ['Before Work', 'After Work', 'Complain'],
        required: true
    },

    chemical: {
        type: String,
        enum: ["Acid", "Alkaline", "Water"],

    },
    premise: {
        type: String,
    },
    tempature: {
        type: String,
    },
    rating: {
        type: String,
        enum: [20, 30, 40, 50, 60, 70, 80, 90, 100]
    },
    test: {
        type: String,
    },
    problem: {
        type: String,
        enum: ["Water", "Hose", "Covering Up", "Another"]
    },
    comment: {
        type: String,
    },
    photo: {
        type: String,
    }

}, { timestamps: true })

export const Report = mongoose.model("Report", reportSchema);

