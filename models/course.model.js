import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const courseSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => `course-${uuidv4()}`
    },
    courseName: {
        type: String,
        required: true,
    },
    courseDuration: {
        type: String,
        required: true,
    },
    coursePrice: {
        type: String,
        required: true,
    },
    batchId: {
        type: String,
        default: ""
    },
    totalEnrollment: {
        type: String,
        default: 0
    },
}, {timestamps: true});

courseSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model("course", courseSchema);