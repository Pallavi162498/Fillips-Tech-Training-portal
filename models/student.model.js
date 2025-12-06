import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "User",
        required: true,
        unique: true,
    },
    batchId: [
        {
        type: String,
        default: ""
    }
    ],
    courseId: [
    {
        type: String,
        default: ""
    }
        ],
    mode: {
        type: String,
        enum: ["Online", "Offline"],
        required: true,
    },
    status: {
        type: String,
        enum: ["In Progress", "Completed"],
        required: true
    },
}, {timestamps: true});

studentSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model("Student", studentSchema);