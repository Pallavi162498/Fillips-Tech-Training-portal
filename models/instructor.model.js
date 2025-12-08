import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
    userId: {
      type: String,
      ref: "User",
      required: true,
      unique: true,
    },
    specialization: {
        type: String,
        required: true
    },
    batchId: [
        {
          type: String,
          ref: "Batch",
          required: true,
          unique: true,  
        }
    ],
    module: [
        {
            type: String,
            required: true
        }
    ],

}, {timestamps: true});

instructorSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model("Instructor", instructorSchema)