import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    factoryName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "User", "Worker"],
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)