import { NextResponse } from "next/server";
import Student from "@/lib/models/student";
import connect from "@/lib/db";
import { createSession } from "@/lib/session";


export const POST = async (req: Request) => {

    try {
        const body = await req.json();
        const {email, password} = body;

        await connect();

        const student = await Student.findOne({ email });

        if (!student) {
            return NextResponse.json({
                success : false,
                message: "Student not found"
            }, {status: 404})
        } 

        if (student.password !== password) {
            return NextResponse.json({
                success : false,
                message : "Password does not match"
            }, {status: 401})
        }

        // Create session
        const sessionId = createSession(email, 'student');

        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            student: student
        }, {status : 200});

        // Set session cookie
        response.cookies.set('sessionId', sessionId, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        return response;


    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
        }, {status: 500});
    }

}