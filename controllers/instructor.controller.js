import User from "../models/user.model.js";
import Instructor from "../models/instructor.model.js";

export const getAllInstructor = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
} 

export const getInstructorById = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const updateInstructor = async(req, res) => {
      try {
            const { id } = req.params;
            const data = req.body;
    
            const userFields = ["firstName", "lastName", "email", "phone", "location"];
            const instructorFields = ["specialization", "batchId", "module"];
    
            const userUpdate = {};
            const instructorUpdate = {};
    
            Object.keys(data).forEach(key => {
                if (userFields.includes(key)) userUpdate[key] = data[key];
                if (instructorFields.includes(key)) instructorUpdate[key] = data[key];
            });
    
            const instructor = await Instructor.findOne({ userId: id });
            if (!instructor) {
                return res.status(404).json({ 
                    message: "Instructor not found",
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
    
            let updatedInstructor = null;
            if (Object.keys(instructorUpdate).length > 0) {
                instructorStudent = await Instructor.findOneAndUpdate(
                    { userId: id },
                    instructorUpdate,
                    { new: true }
                );
            }
    
            return res.status(200).json({
                message: "Instructor updated successfully",
                success: true,
                data: {
                    updatedUser,
                    updatedInstructor
                }
            });
        } catch (error) {
            res.status(500).json({ 
                message: "Internal server error",
                success: false,
                error: error.message,
            });
        }
} 

export const deleteInstructor = async(req, res) => {
    try {
        const {id} = req.params;
        const deletedInstructor = await User.findOneAndDelete({id})
        if(deletedInstructor)
        {
            return res.status(404).json({
                message: "Instructor Not Found",
                success: false,
            })
        }
        return res.status(200).json({
            message: `${deletedInstructor?.firstName} is deleted successfully`,
            success: true,
        }) 
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        })
    }
}