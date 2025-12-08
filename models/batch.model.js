import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid"

const batchSchema = new mongoose.Schema ({
    id: {
        type: String,
        default: () => `batch-${uuidv4()}`
    },
    batchName: {
        type: String,
        required: true,
        unique: true
    },
    courseId: {
        type: String,
        default: ""
    },
    instructorId: {
        type: String,
        default: ""
    },
    studentId: {
        type: String,
        default: ""
    },
    batchTiming: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    mode: {
        type: String,
        enum: ["Online", "Offline"],
        required: true,
    },
    status: {
        type: String,
        enum: ["Ongoing", "Will Start"],
        required: true,
    },
    // totalEnrolledStudent: {
    //     type: Number,
    //     default: ""
    // },
    capacity: {
        type: Number,
        required: true
    }
}, {timestamps: true} )

batchSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model("Batch", batchSchema);