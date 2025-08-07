import {Schema, model, models} from 'mongoose';

const AdminSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
    
);

const Admin = models.Admin || model("Student", AdminSchema);
export default Admin;