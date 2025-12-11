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
        enum: ["Enrolled", "Completed"], 
    },
    courseStatus: {
        type: String,
        enum: ["In Progress", "Completed"]
    }
}, {timestamps: true})

export default mongoose.model("Enrollment", enrollmentSchema);