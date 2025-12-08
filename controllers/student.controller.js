import Batch from "../models/batch.model.js"
import User from "../models/user.model.js";
import Student from "../models/student.model.js" 


export const addEnrollment = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const getAllStudent = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const getStudentById = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
} 

export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const userFields = ["firstName", "lastName", "email", "phone", "location"];
        const studentFields = ["batchId", "courseId", "mode", "status"];

        const userUpdate = {};
        const studentUpdate = {};

        Object.keys(data).forEach(key => {
            if (userFields.includes(key)) userUpdate[key] = data[key];
            if (studentFields.includes(key)) studentUpdate[key] = data[key];
        });

        const student = await Student.findOne({ userId: id });
        if (!student) {
            return res.status(404).json({ 
                message: "Student not found",
                success: false,
            });
        }

        let updatedUser = null;
        if (Object.keys(userUpdate).length > 0) {
            updatedUser = await User.findOneAndUpdate(
                { id }, 
                userUpdate,
                { new: true }
            );
        }

        let updatedStudent = null;
        if (Object.keys(studentUpdate).length > 0) {
            updatedStudent = await Student.findOneAndUpdate(
                { userId: id },
                studentUpdate,
                { new: true }
            );
        }

        return res.status(200).json({
            message: "Student updated successfully",
            success: true,
            data: {
                updatedUser,
                updatedStudent
            }
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};

export const deleteStudent = async(req, res) => {
    try {
        const {userId} = req.params;
        const deletedStudent = await User.findOneAndDelete({id: userId})
        if(!deletedStudent)
        {
            return res.status(404).json({
               message: "Student Not Found",
               success: false,
            })
        } 
        return res.status(200).json({
            message: `${deletedStudent?.firstName} is deleted successfully`,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        })
    }
}