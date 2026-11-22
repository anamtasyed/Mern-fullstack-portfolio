import mongoose, {Schema, type Model} from "mongoose";
export interface IUser {
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role: "Admin" | "User";
}
const userSchema = new Schema<IUser>(
    {
        username: {type: String, required: true, trim: true},
        firstName: {type: String, trim: true},
        lastName: {type: String, trim: true},
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        password: {type: String, required:true, select: false},
        role: {type: String, enum: ["Admin", "User"], default: "User"}
    },
    {timestamps: true}
);
const User: Model<IUser> = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", userSchema);
export default User; 