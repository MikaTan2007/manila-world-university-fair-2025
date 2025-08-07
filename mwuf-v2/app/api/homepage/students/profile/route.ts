import { NextResponse } from "next/server";
import Student from "@/lib/models/student";
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

        const session = getSession(sessionId);

        if (!session || (session.userType !== 'student' && session.userType !== 'admin')) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized: Invalid session"
            }, {status: 401})
        }

        const body = await req.json();
        const {email} = body;

        if (session.userType !== 'admin' && session.email !== email) {
            return NextResponse.json({
                success: false,
                error: "Forbidden: Cannot access other student's data"
            }, {status: 403});
        }

        await connect();

        const student = await Student.findOne({ email });

        if (!student) {
            return NextResponse.json({
                success : false,
                message: "Student not found"
            }, {status: 404})
        } 

        return NextResponse.json({
            success: true,
            student: student
        }, {status: 200})

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
        }, {status: 500});
    }

}