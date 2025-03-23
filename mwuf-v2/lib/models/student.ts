import {Schema, model, models} from 'mongoose';

const StudentSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        first_name: {
            type: String,
            required: false
        },
        last_name: {
            type: String,
            required: false
        },
        birthday: {
            type: Date,
            required: false
        },
        gender: {
            type: String,
            required: false
        },
        citizenship: {
            type: [String],
            required: false,
        }
    },
    {
        timestamps: true
    }
    
);

const Student = models.Student || model("Student", StudentSchema);
export default Student;