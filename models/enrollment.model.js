import mongoose from "mongoose";
import generateUniqueId from "../utils/generateUniqueIdGenerator.js";

const enrollmentSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => generateUniqueId("ENROLLMENT")
    },
    userId: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true,
    },
    batchId: {
        type: String,
        required: true
    },
    enrollDate: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ["Enrolled", "In Progress", "Completed"], 
    },
    progress: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

export default mongoose.model("Enrollment", enrollmentSchema);