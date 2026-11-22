
import type { Request, Response } from "express";
import mongoose from "mongoose";
import Project from "../models/Project";

// GEt - Get all project records 
export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    
    } catch (error) {
        res.status(500).json({message: "Error retrieving projects"});
    }
};
// POST - add project
export const createProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    
    } catch (error) {
        res.status(500).json({message: "Error creating project"});
    }
}; 
// PUT - Update project
export const updateProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findByIdAndUpdate(
             req.params.id,
             req.body,
             {new: true, runValidators: true}
        );
        if (!project) {
            res.status(404).json({message: "Project not found"});
            return;
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({message: "Error updating project"});

    }
};
// DELETE 
export const deleteProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id);
        
        if (!project) {
            res.status(404).json({message: "Project not found"});
            return;
        }
        res.status(200).json({message: "Project deleted successfully"});
    } catch (error) {
        res.status(400).json({message: "Error deleting project"});

    }
};
