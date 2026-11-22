import mongoose, {Schema, type Model} from "mongoose";
export interface IProject {
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    projectUrl: string;
    githubUrl: string; 
}
const projectSchema = new Schema<IProject>(
    {
         title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        technologies: {
            type: [String],
            default: []
        },
        imageUrl: {
            type: String,
        },
        projectUrl: {
            type: String,
        },
        githubUrl: {
            type: String
        }
        
    },
    {
        timestamps: true
    }
);
const Project: Model<IProject> = (mongoose.models.Project as Model<IProject>) || mongoose.model<IProject>("Project", projectSchema);
export default Project;