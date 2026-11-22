
import type { Request, Response } from "express";
import mongoose from "mongoose";
import Education from "../models/Education";

// GEt - Get all education records 
export const getEducations = async (req: Request, res: Response) => {
    try {
        const education = await Education.find();
        res.status(200).json(education);
    
    } catch (error) {
        res.status(500).json({message: "Error retrieving education"});
    }
};
// POST - add education 
export const createEducation = async (req: Request, res: Response) => {
    try {
        const education = await Education.create(req.body);
        res.status(201).json(education);
    
    } catch (error) {
        res.status(500).json({message: "Error creating education"});
    }
}; 
// PUT - Update education 
export const updateEducation = async (req: Request, res: Response) => {
    try {
        const education = await Education.findByIdAndUpdate(
             req.params.id,
             req.body,  
             {new: true, runValidators: true}
        );
        if (!education) {
            res.status(404).json({message: "Education not found"});
            return;
        }
        res.status(200).json(education);
    } catch (error) {
        res.status(400).json({message: "Error updating education"});

    }
};
// DELETE 
export const deleteEducation = async (req: Request, res: Response) => {
    try {
        const education = await Education.findByIdAndUpdate(req.params.id);
        
        if (!education) {
            res.status(404).json({message: "Education not found"});
            return;
        }
        res.status(200).json({message: "Education deleted successfully"});
    } catch (error) {
        res.status(400).json({message: "Error deleting education"});

    }
};
