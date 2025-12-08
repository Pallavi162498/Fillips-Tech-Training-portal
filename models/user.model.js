import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => `user-${uuidv4()}`,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Admin", "Student", "Instructor"],
        required: true,
    },
}, {timestamps: true});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))
    {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
    //    return next(error)
    console.error(error)
    }
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret.password;
    return ret;
  }
});

export default mongoose.model("User", userSchema);