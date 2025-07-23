import { NextResponse } from "next/server";
import University from "@/lib/models/university";
import connect from "@/lib/db";

export const POST = async (req: Request) => {

    try {
        const body = await req.json();
        const {universityEmail, studentEmail} = body;

        await connect();

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

        return NextResponse.json({
            success: true,
            message: "Student registered successfully",
        }, {status: 200});

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }

}