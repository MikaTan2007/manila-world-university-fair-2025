import { NextResponse } from "next/server";
import University from "@/lib/models/university";
import Student from "@/lib/models/student";
import connect from "@/lib/db";

export const POST = async (req: Request) => {

    try {
        const body = await req.json();
        const {universityEmail, studentEmail} = body;

        if (studentEmail == null || universityEmail == null) {
            return NextResponse.json({
                success: false,
                message: "Uni/Student not found",
            }, {status: 404});
        }

        await connect();

        //Adding student email to registered_students
        const university = await University.findOne({email : universityEmail});

        if (!university) {
            return NextResponse.json({
                success: false,
                message: "University not found",
            }, {status: 404});
        }

        if (university.registered_students.includes(studentEmail)) {
            return NextResponse.json({
                message: "Student already registered"
            }, {status: 200});
        }

        const updatedUniversity = await University.findOneAndUpdate(
            {email: universityEmail},
            {$push: {registered_students: studentEmail}},
            {new: true}
        );

        //Adding uni email to registered_uni
        const student = await Student.findOne({email: studentEmail});

        if (!student) {
            return NextResponse.json({
                success: false,
                message: "Student not found",
            }, {status: 404});
        }

        const updatedStudent = await Student.findOneAndUpdate(
            {email: studentEmail},
            {$push: {registered_universities: universityEmail}},
            {new: true}
        )

        return NextResponse.json({
            success: true,
            message: "Student and University registered successfully",
        }, {status: 200});

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }

}