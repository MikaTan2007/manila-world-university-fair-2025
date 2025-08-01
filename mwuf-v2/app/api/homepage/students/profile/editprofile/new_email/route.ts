import { NextResponse } from "next/server";
import Student from "@/lib/models/student";
import connect from "@/lib/db";
import { createSession, deleteSession, getSession } from "@/lib/session";
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

        const existingStudent = await Student.findOne({ email: newEmail });
        
        if (existingStudent) {
            return NextResponse.json({
                success: false,
                message: "Email already exists."
            }, {status: 409})
        }

        const {email: _, new_email: __, ...updateData} = body;

        if (newEmail && newEmail !== originalEmail) {
            updateData.email = newEmail;
        }

        const fieldsToUpdate = Object.entries(updateData).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {} as any);

        const updatedStudent = await Student.findOneAndUpdate(
            { email: originalEmail }, // Find by original email
            { $set: fieldsToUpdate }, // Update fields including new email if provided
            { 
                new: true, 
                runValidators: true 
            }
        );

        if (!updatedStudent) {
            return NextResponse.json({
                success: false,
                message: "Failed to update student"
            }, {status: 500})
        }

        const response = NextResponse.json({
            success: true,
            message: "Profile updated successfully",
            student: updatedStudent,
        }, {status: 200})

        deleteSession(sessionId);

        response.cookies.set('sessionId', '', {
            httpOnly: true,
            secure: false,
            maxAge: 0 
        });

        const newSessionId = createSession(newEmail, 'student');

        response.cookies.set('sessionId', newSessionId, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        return response;
        
    } catch (error: any) {
        console.error("Update error:", error);
        return NextResponse.json({
            success: false,
            error: error.message,
        }, {status: 500});
    }
}