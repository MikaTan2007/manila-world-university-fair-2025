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

        if (!session || session.userType !== 'student') {
            return NextResponse.json({
                success: false,
                error: "Unauthorized: Invalid session"
            }, {status: 401})
        }

        const body = await req.json();
        const originalEmail = body.email;
        const newEmail = body.new_email;

        if (session.email !== originalEmail) {
            return NextResponse.json({
                success: false,
                error: "Forbidden: Cannot access other student's data"
            }, {status: 403});
        }

        await connect();

        const student = await Student.findOne({ email: originalEmail });

        if (!student) {
            return NextResponse.json({
                success: false,
                message: "Student not found"
            }, {status: 404})
        }

        if (newEmail !== originalEmail) {
            // Check if new email already exists
            const existingStudent = await Student.findOne({ email: newEmail });
            if (existingStudent) {
                return NextResponse.json({
                    success: false,
                    message: "Email already exists."
                }, {status: 409})
            }
        }

    } catch (error: any) {
        console.error("Update error:", error);
        return NextResponse.json({
            success: false,
            error: error.message,
        }, {status: 500});
    }
}