import { NextResponse } from "next/server";
import Student from "@/lib/models/student";
import University from "@/lib/models/university";
import connect from "@/lib/db";
import { getSession } from "@/lib/session";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
    try {
        //Checking session
        const cookieStore = cookies();
        const sessionId = (await cookieStore).get('sessionId')?.value;

        if (!sessionId) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized: Please log in"
            }, {status: 401})
        }
        
        const session = await getSession(sessionId);

        if (!session || (session.userType !== 'university' && session.userType !== 'admin')) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized: Invalid session"
            }, {status: 403})
        }

        const body = await req.json();
        const {universityEmail} = body;

        if (session.userType !== 'admin' && session.email !== universityEmail) {
            return NextResponse.json({
                success: false,
                error: "Forbidden: Cannot access other university's data"
            }, {status: 403});
        }

        await connect();

        const university = await University.findOne({
            email: universityEmail
        })

        if (!university) {
            return NextResponse.json({
                success: false,
                error: "University not found"
            }, {status: 404});
        }

        const studentEmails = university.registered_students;

        if (!studentEmails || studentEmails.length === 0) {
            return NextResponse.json({
                success: true,
                message: "No students registered",
                students: []
            }, {status: 200});
        }

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