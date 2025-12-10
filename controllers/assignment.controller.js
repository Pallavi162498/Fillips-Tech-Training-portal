import Assignment from "../models/assignment.model.js";

export const createAssignment = async(req, res) => {
    try {
        const data = req.body;
        const newAssignment = new Assignment(data)
        await newAssignment.save();
        return res.status(201).json({
            message: "Assignment Created Successfully",
            success: true,
            data: newAssignment,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
} 

export const getAllAssignment = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
} 

export const getAssignmentById = async(req, res) => {
   try {
    
   } catch (error) {
    
   }
}

export const submitAssignment = async(req, res) => {
    try {
        const {id} = req.params
        const userId = req.user.id
        const assignment = await Assignment.findOne({id})
        if(!assignment)
        {
            return res.status(404).json({
                message: "Assignment Not Found",
                success: false,
            })
        }

        const alreadySubmitted = assignment.submission.some((sub) => sub.userId === userId);
        if(alreadySubmitted)
        {
            return res.status(400).json({
                message: "You have already submitted this assignment",
                success: false,
            })
        }
        assignment.submission.push({userId})
        await assignment.save();
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        })  
    }
}

export const updateAssignment = async(req, res) => {
    try {
        // const {id} = req.params
        // const u
        
    } catch (error) {
        
    }
} 


export const deleteAssignment = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}