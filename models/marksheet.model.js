import mongoose from "mongoose";
import generateUniqueId from "../utils/generateUniqueIdGenerator.js";

const marksheetSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => generateUniqueId("MARKS")
    },
    userId: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    assignments:{
        type: [String],
        required: true,
    },
    totalPercentage: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
}, {timestamps: true})

export default mongoose.model("Marksheet", marksheetSchema)