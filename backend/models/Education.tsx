import mongoose, {Schema, type Model} from "mongoose";
export interface IEducation {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
    subject: string; 
    description?: string;
    currentlyStudying: boolean;
}
const educationSchema = new Schema<IEducation>(
    {
        institution: {
            type: String,
            required: true,
            trim: true
        },
        degree: {
            type: String,
            required: true,
            trim: true
        },
        subject: {
            type: String,
            required: true,
            trim: true
        },
        fieldOfStudy: {
            type: String,
            required: true,
            trim: true
        },
        startDate: {
            type: String, 
            required: true
        },
        endDate: {
            type: String
        },
        description: {
            type: String, 
            trim: true
        },
        currentlyStudying: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);
const Education: Model<IEducation> = (mongoose.models.Education as Model<IEducation>) || mongoose.model<IEducation>("Education", educationSchema);
export default Education;