import {Schema, model, models} from 'mongoose';

const UniversitySchema = new Schema (
    {
        email : {
            type: String,
            required: true,
            unique: true
        },
        password : {
            type: String,
            required: true,
        },
        uni_name : {
            type: String,
            required: false,
        },
        region : {
            type: [String],
            required: false,
        },
        countries : {
            type: [String],
            required: false,
        },
        cities : {
            type: [String],
            required: false,
        },
        rep_first_name : {
            type: String,
            required: false,
        },
        rep_last_name : {
            type: String,
            required: false,
        },
        rep_contact_email : {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
);

const University = models.User || model('University', UniversitySchema);
export default University;