import Attendance from "../models/attendance.model.js";

export const markAttendance = async(req, res) => {
    try {
        const userId = req.user.id;

        const today = new Date().toISOString().split("T")[0];
        const alreadyMarked = await Attendance.findOne({userId, date: today});
        if(alreadyMarked)
        {
            return res.status(400).json({
                message: "Attendance already marked for today",
                success: false,
            });
        }
        const attendance = new Attendance({
            userId,
            date: today,
        })
        return res.status(200).json({
            message: "Attendance marked successfully",
            success: true,
            data: attendance,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        })
        
    }
}

export const getAllAttendance = async(req, res) => {
    try {
        const {page = 1, limit = 10} = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const allAttendance = await Attendance.find().sort({date: -1}).skip((pageNum - 1) * limitNum);
        return res.status(200).json({
            message: "All attendance fetched successfully",
            success: true,
            data: allAttendance,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        })
    }
}


export const getAttendanceById = async(req, res) => {
    try {
        const {userId} = req.params;
        const attendancedata = await Attendance.findOne({userId})
        if(!attendancedata)
        {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        return res.status(200).json({
            message: "Attendance fetched successfully",
            success: true,
            data: attendancedata,
        })  
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        })
    }
}