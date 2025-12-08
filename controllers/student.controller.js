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
        const {page = 1, limit = 10, search} = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        let filter = {};
        if(search)
        {

        }
        const pipeline = [
            {$match: filter},
            {$sort: {createdAt: -1}},
            {

             $lookup: {
                    from: "users", 
                    localField: "userId",
                    foreignField: "id", 
                    as: "userData",
                },
            },
            { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },
            {
             $lookup: {
                    from: "courses", 
                    localField: "courseId",
                    foreignField: "id", 
                    as: "courseData",
                },
            },
            {
             $lookup: {
                    from: "batches", 
                    localField: "batchId",
                    foreignField: "id", 
                    as: "batchData",
                },
            },
        ]
        if(limitNum > 0)
        {
            pipeline.push({$skip: (pageNum - 1) * limitNum});
            pipeline.push({$limit: limit});
        }
        pipeline.push({
            $project: {
                _id: 0,
                studentId: "$userData.id",
                studentName: "$userData.firstname",
                studentPhone: "$userData.phone",
                studentEmail: "$userData.email",
                studentLocation: "$userData.location",
                courseName: "$courseData.courseName",
                batchName: "$batchData.batchName",
            }
        });
        const students = await Student.aggregate(pipeline)
        const totalStudents = await Student.countDocuments()

        if(totalStudents.length === 0)
        {
            return res.status(200).json({
                message: "No Data Found",
                success: true,
                data: [],
                totalStudents: 0,
                currentPage: pageNum,
                totalPages: 0,
            });
        }
         return res.status(200).json({
                message: "All students fetched successfully",
                success: true,
                data: students,
                totalStudents: totalStudents,
                currentPage: pageNum,
                totalPages: limitNum > 0 ? Math.ceil(totalStudents / limitNum) : 1,
            });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        })
        
    }
}

export const getStudentById = async(req, res) => {
     try {
        const {userId} = req.params;
        const studentData = await User.findOne({id: userId})
        const pipeline = [
            {$match: {userId}},
            {

             $lookup: {
                    from: "users", 
                    localField: "userId",
                    foreignField: "id", 
                    as: "userData",
                },
            },
            { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },
            {
             $lookup: {
                    from: "courses", 
                    localField: "courseId",
                    foreignField: "id", 
                    as: "courseData",
                },
            },
            {
             $lookup: {
                    from: "batches", 
                    localField: "batchId",
                    foreignField: "id", 
                    as: "batchData",
                },
            },
        ]
        pipeline.push({
            $project: {
                _id: 0,
                studentId: "$userData.id",
                studentName: "$userData.firstname",
                studentPhone: "$userData.phone",
                studentEmail: "$userData.email",
                studentLocation: "$userData.location",
                courseName: "$courseData.courseName",
                batchName: "$batchData.batchName",
            }
        });
        const students = await Student.aggregate(pipeline)

         return res.status(200).json({
                message: "Student fetched successfully",
                success: true,
                data: students,
            });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        })
        
    }
} 

export const updateStudent = async (req, res) => {
    try {
        const { userId } = req.params;
        const data = req.body;

        const userFields = ["firstName", "lastName", "email", "phone", "location"];
        const studentFields = ["batchId", "courseId", "mode", "status"];

        const userUpdate = {};
        const studentUpdate = {};

        Object.keys(data).forEach(key => {
            if (userFields.includes(key)) userUpdate[key] = data[key];
            if (studentFields.includes(key)) studentUpdate[key] = data[key];
        });

        const student = await User.findOne({ id: userId });
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