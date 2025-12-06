import Batch from "../models/batch.model.js"
import User from "../models/user.model.js";
import Student from "../models/student.model.js" 


export const addEnrollment = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const updateStudent = async(req, res) => {
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