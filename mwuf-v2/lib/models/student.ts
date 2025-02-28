import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true},
        password: {
            type: String,
            required: true},
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        birthday: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        citizenship: {
            type: [String],
            required: true,
        }

    },
    {
        timestamps: true
    }
    
);

const Student = models.User || model('Student', UserSchema);
export default Student;