import mongoose, {Schema, type Model} from "mongoose";
export interface IContact {
    name: string;
    email: string;
    subject: string; 
    message: string;
    phone: string;
}
const contactSchema = new Schema<IContact>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        subject: {
            type: String,
            required: true,
            trim: true
        },
        message: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String, 
            trim: true
        }

    },
    {
        timestamps: true
    }
);
const Contact: Model<IContact> = (mongoose.models.Contact as Model<IContact>) || mongoose.model<IContact>("Contact", contactSchema);
export default Contact;