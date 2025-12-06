import Course from "../models/course.model.js";
import Batch from "../models/batch.model.js";

export const addCourse = async(req, res) => {
    try {
        const data = req.body;
        const newCourse = new Course(data)
        await newCourse.save();
        return res.status(201).json({
            message: "Course created successfully",
            success: true,
            data: newCourse,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        });
    }
}

export const getAllCourses = async(req, res) => {
    try {
        const {page = 1, limit = 10, search} = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        const filter = {};

    if(search)
    {
        filter.$or = [
            {id: {$regex: search, $options: "i"}},
            {courseName: {$regex: search, $options: "i"}},
        ]
    }
    const course = await Course.find(filter)
    .select("id courseName courseDuration coursePrice")
    .skip((pageNum - 1) * limitNum )
    .limit(limitNum)

    const totalCourse = await Course.countDocuments()

    if(course.length === 0)
    {
        return res.status(200).json({
            message: "No data found",
            data: [],
            totalCourse: 0,
            currentPage: pageNum,
            totalPage: 0
        })
    }
       return res.status(200).json({
            message: "Courses Fetched Successfully",
            data: course,
            totalCourse: totalCourse,
            currentPage: pageNum,
            totalPage: limitNum > 0 ? Math.ceil (totalCourse / limitNum) : 1,
        }) 
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        });
    }
} 


export const getCourseById = async(req, res) => {
    try {
        const {id} = req.params;
        const course = await Course.findOne({id}).select("id courseName courseDuration coursePrice")
        if(!course)
        {
            return res.status(404).json({
                message: "Course Not Found",
                success: false
            });
        }
       return res.status(200).json({
            message: "Course Fetched Successfully",
            data: course,
        }) 
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        });
    }
}


export const updateCourse = async(req, res) => {
    try {
        const {id} = req.parsms;
        const updatedData = req.body;
        const updatedCourse = await Course.findOneAndUpdate({id}, updatedData, {new: true});
        if(!updatedCourse)
        {
            return res.status(404).json({
                message: "Course Not Found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Course Updated Successfully",
            success: true,
            data: updatedCourse,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

export const deleteCourse = async(req, res) => {
    try {
        const {id} = req.params
        const deletedCourse = await Course.findOneAndDelete({id})
        if(!deletedCourse)
        {
            return res.status(404).json({
                message: "Course Not Found",
                success: false
            });
        }
        return res.status.json({
            message: `${deletedCourse?.courseName} is deleted successfully`,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}