
import type { Request, Response } from "express";
import mongoose from "mongoose";
import Contact from "../models/Contact";

// GEt - Get all  contacts
export const getContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    
    } catch (error) {
        res.status(500).json({message: "Error retrieving contacts"});
    }
};
// POST - add contact
export const createContact = async (req: Request, res: Response) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    
    } catch (error) {
        res.status(500).json({message: "Error creating contact"});
    }
}; 
// PUT - Update contact 
export const updateContact = async (req: Request, res: Response) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
             req.params.id,
             req.body,
             {new: true, runValidators: true}
        );
        if (!contact) {
            res.status(404).json({message: "Contact not found"});
            return;
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({message: "Error updating contact"});

    }
};
// DELETE 
export const deleteContact = async (req: Request, res: Response) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id);
        
        if (!contact) {
            res.status(404).json({message: "Contact not found"});
            return;
        }
        res.status(200).json({message: "Contact deleted successfully"});
    } catch (error) {
        res.status(400).json({message: "Error deleting contact"});

    }
};
