import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.route.js";
import instructorRoutes from "./routes/instructor.route.js";
import studentRoutes from "./routes/student.route.js";
import courseRoutes from "./routes/course.route.js";
import batchRoutes from "./routes/batch.route.js";
import classRoutes from "./routes/class.route.js";
import attendanceRoutes from "./routes/attendance.route.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000
connectDB()

app.use("/api/auth", authRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/batch", batchRoutes);
app.use("/api/class", classRoutes);
app.use("/api/attendance", attendanceRoutes);

app.listen(PORT, () => 
    console.log(`Server is running on ${PORT}`)
)
