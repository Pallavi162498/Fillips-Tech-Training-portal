import Batch from "../models/batch.model.js"

export const createBatch = async(req, res) => {
    try {
        const data = req.body;
        const existingBatch = await Batch.findOne({batchName: data.batchName});
        if(existingBatch)
        {
            return res.status(409).json({
                message: "Batch already exist",
                success: false
            });
        }
        const newBatch = new Batch(data)
        await newBatch.save()
        return res.status(201).json({
            message: "Batch created successfully",
            success: true,
            data: newBatch,
        }) 
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}


export const getAllBatch = async(req, res) => {
    try {
        const {page = 1, limit = 10, search} = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const filter = {};
        if(search)
        {
            filter.$or = [
                {id: {$regex: search, $options: "i"}},
                {batchName: {$regex: search, $options: "i"}},
                {batchTiming: {$regex: search, $options: "i"}},
                {mode: {$regex: search, $options: "i"}},
            ]
        }
        const pipeline = [
            {$match: filter},
            {$sort: {createdAt: -1}},
            { 
                $lookup: {
                    from: "users", 
                    localField: "instructorId",
                    foreignField: "id", 
                    as: "instructorData",
                },
            },
            { $unwind: { path: "$instructorData", preserveNullAndEmptyArrays: true } }, 
             { 
                $lookup: {
                    from: "courses", 
                    localField: "courseId",
                    foreignField: "id", 
                    as: "courseData",
                },
            },
            { $unwind: { path: "$courseData", preserveNullAndEmptyArrays: true } }, 
        ];

        if(limitNum > 0)
        {
            pipeline.push({$skip: (pageNum -1) * limitNum});
            pipeline.push({$limit: limitNum});
        }

        pipeline.push({
            $project: {
                _id: 0,
                id: 1,
                batchName: 1,
                batchTiming: 1,
                mode: 1,
                status: 1,
                capacity: 1,
                courseName: "$courseData.courseName",
                InstructorName: "$instructorData.firstName",
            }
        }) 

        const batches = await Batch.aggregate(pipeline);
        const totalbatches = await Batch.countDocuments();
        if(batches.length === 0)
        {
            return res.status(200).json({
                message: "No data found",
                data: [],
                currentPage: pageNum,
                totalBatches: 0,
                totalPages: 0,
            })
        }
          return res.status(200).json({
                message: "All Batches fetched successfully",
                data: batches,
                currentPage: pageNum,
                totalBatches: totalbatches,
                totalPages: limitNum > 0 ? Math.ceil(totalbatches / limitNum) : 1,
            })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        })
    }
}


export const getBatchById = async(req, res) => {
   try {
        const {id} = req.params;
        const batch = await Batch.findOne({id})
        if(!batch)
        {
            return res.status(404).json({
                message: "No Batch Found",
                success: false,
            })
        }
        const pipeline = [
            {$match: {id}},
            {$sort: {createdAt: -1}},
            { 
                $lookup: {
                    from: "users", 
                    localField: "instructorId",
                    foreignField: "id", 
                    as: "instructorData",
                },
            },
            { $unwind: { path: "$instructorData", preserveNullAndEmptyArrays: true } }, 
             { 
                $lookup: {
                    from: "courses", 
                    localField: "courseId",
                    foreignField: "id", 
                    as: "courseData",
                },
            },
            { $unwind: { path: "$courseData", preserveNullAndEmptyArrays: true } }, 
        ];

        pipeline.push({
            $project: {
                _id: 0,
                id: 1,
                batchName: 1,
                batchTiming: 1,
                mode: 1,
                status: 1,
                capacity: 1,
                courseName: "$courseData.courseName",
                InstructorName: "$instructorData.firstName",
            }
        }) 

        const batchData = await Batch.aggregate(pipeline);
          return res.status(200).json({
                message: "Batch fetched successfully",
                data: batchData,
            })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        })
    }
}


export const updatebatch = async(req, res) => {
    try {
        const {id} = req.params;
        const updatedData = req.body;
        const updatedBatches = await Batch.findOneAndUpdate({id}, updatedData, {new: true});
        if(!updatedBatches)
        {
            return res.status(404).json({
                message: "Batch Not Found",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Batch updated successfully",
            success: true,
            data: updatedBatches,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server Error",
            success: false,
            error: error.message,
        })
        
    }
}


export const deleteBatch = async(req, res) => {
    try {
        const {id} = req.params;
        const deletedBatch = await Batch.findOneAndDelete({id});
        if(!deletedBatch)
        {
            return res.status(404).json({
                message: "Batch Not Found",
                success: false,
            })
        }
        return res.status(200).json({
            message: `${deletedBatch?.batchName} is deleted successfully`,
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