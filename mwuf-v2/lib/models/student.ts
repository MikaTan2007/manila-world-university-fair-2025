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
        gender: {
            type: String,
            required: false
        },
        citizenship: {
            type: [String],
            required: false,
        },
        graduation_year : {
            type: String,
            required: false
        },
        school_name : {
            type: String,
            required: false
        },
        ideal_major : {
            type: [String],
            required: false
        },
        registered_universities: { //For Unis student has registered for
            type: [String],
            required: false
        }
    },
    {
        timestamps: true
    }
    
);

const Student = models.Student || model("Student", StudentSchema);
export default Student;