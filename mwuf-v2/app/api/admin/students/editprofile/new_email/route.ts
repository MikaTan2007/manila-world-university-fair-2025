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

        const session = getSession(sessionId);

        if (!session ||  session.userType !== 'admin') {
            return NextResponse.json({
                success: false,
                error: "Unauthorized: Invalid session"
            }, {status: 403})
        }

        const body = await req.json();
        const originalEmail = body.email;
        const newEmail = body.new_email;


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

        const universityUpdateResult = await University.updateMany(
            { registered_students: originalEmail }, // Find universities with old email
            { 
                $set: { 
                    "registered_students.$": newEmail // Replace old email with new email
                }
            }
        );

        const response = NextResponse.json({
            success: true,
            message: "Profile updated successfully",
            student: updatedStudent,
        }, {status: 200})

        return response;
        
    } catch (error: any) {
        console.error("Update error:", error);
        return NextResponse.json({
            success: false,
            error: error.message,
        }, {status: 500});
    }
}