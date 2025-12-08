import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const enquirySchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => `enquiry-${uuidv4()}`
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    phone: {
        type: String,
        required: true,

    }, 
    location: {
        type: String,
        required: true,

    },
})
enquirySchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});
export default mongoose.model("Enquiry", enquirySchema);