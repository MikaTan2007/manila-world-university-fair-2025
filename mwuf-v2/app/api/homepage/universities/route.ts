import { NextResponse } from "next/server";
import Student from "@/lib/models/student";
import University from "@/lib/models/university";
import connect from "@/lib/db";

export const POST = async (req: Request) => {
    try {

        const body = await req.json();
        const {universityEmail} = body;

        await connect();

        const university = await University.findOne({
            email: universityEmail
        })

        const studentEmails = university.registered_students;

        const students = await Student.find({
            email: {$in: studentEmails}
        })

        return NextResponse.json({
            success: true,
            message: "Login successful",
            students: students
        }, {status : 200});

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
        }, {status: 500});
    }
};