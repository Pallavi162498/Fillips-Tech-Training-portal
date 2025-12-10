import mongoose from "mongoose";
import generateUniqueId from "../utils/generateUniqueIdGenerator.js";

const assignmentSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => generateUniqueId("ASSIGNMENT")
    },
    assignmentName: {
            type: String,
            required: true
    },
    courseId: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true

    },
    question: {
        type: String,
        default: ""
    },
    answer: {
        type: String,
        default: ""
    },
    totalmarks: {
        type: Number,
        required: true

    },
    submission: [
        {
            userId: {
                type: String,
            },
            submissionDate: {
                type: Date,
                default: Date.now()
            },
            marksObtained: {
                type: Number,
            }
        }
    ]
}, {timestamps: true})

export default mongoose.model("Assignment", assignmentSchema)