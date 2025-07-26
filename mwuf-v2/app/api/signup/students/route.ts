import { NextResponse } from "next/server";
import Student from "@/lib/models/student";
import connect from "@/lib/db";
import { createSession } from "@/lib/session";

export const POST = async (req: Request) => {

    const body = await req.json();

    if (body.checkEmail == true) {
        const {email} = body;

        try {
            await connect();
            const user = await Student.findOne({email});

            if (user) {
                return new NextResponse(JSON.stringify({exists: true}), {status: 200});
            } else {
                return new NextResponse(JSON.stringify({exists: false}), {status: 300});
            }
        } catch (error: any) {
            return new NextResponse(JSON.stringify({ exists: false, error: "Internal server error" }), { status: 500 });
        }
    }
    else {
        try {
            const {email} = body;

            //Create session
            const sessionId = createSession(email, 'student');

            await connect();
    
            const student = new Student(body);
            await student.save();
    
            const response = NextResponse.json({
                success: true,
                message: "Student created successfully",
                student: student
            }, {status : 200});

            response.cookies.set('sessionId', sessionId, {
                httpOnly: true,
                secure: false,
                maxAge: 24 * 60 * 60 * 1000
            });

            return response;
            
    
        } catch (error: any) {

            return NextResponse.json({
                success: false,
                message: "Error in creating student",
            }, {status: 500});
        }
    }
    
}
