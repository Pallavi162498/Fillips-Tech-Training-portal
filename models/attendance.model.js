import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "User"
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Present", "Absent", "Leave"],
        required: true,
    }
}, {timestamps: true});

attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);