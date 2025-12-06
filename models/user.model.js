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
        required: [true, "First Name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },
    phone: {
        type: String,
        unique: true,
        required: [true, "Phone is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
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