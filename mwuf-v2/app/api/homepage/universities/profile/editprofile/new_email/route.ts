import { NextResponse } from "next/server";
import University from "@/lib/models/university";
import Student from "@/lib/models/student";
import connect from "@/lib/db";
import { getSession, deleteSession, createSession } from "@/lib/session";
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

        if (!session || (session.userType !== 'university' && session.userType !== 'admin')) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized: Invalid session"
            }, {status: 403})
        }

        const body = await req.json();
        const originalEmail = body.email;
        const newEmail = body.new_email;

        if (session.userType !== 'admin' && session.email !== originalEmail) {
            return NextResponse.json({
                success: false,
                error: "Forbidden: Cannot access other university's data"
            }, {status: 403});
        }

        await connect();

        const university = await University.findOne({ email: originalEmail });

        if (!university) {
            return NextResponse.json({
                success: false,
                message: "University not found"
            }, {status: 404})
        } 

        const existingUniversity = await University.findOne({ email: newEmail });

        if (existingUniversity) {
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

        const updatedUniversity = await University.findOneAndUpdate(
            { email: originalEmail }, 
            { $set: fieldsToUpdate }, 
            { 
                new: true, 
                runValidators: true 
            }
        );

        if (!updatedUniversity) {
            return NextResponse.json({
                success: false,
                message: "Failed to update university"
            }, {status: 500})
        }

        const studentUpdateResult = Student.updateMany(
            { registered_universities: originalEmail },
            {
                $set: {
                    "registered_universities.$": newEmail
                }
            }
        )

        const response = NextResponse.json({
            success: true,
            message: "Profile updated successfully",
            university: updatedUniversity
        }, {status: 200})

        deleteSession(sessionId);

        response.cookies.set('sessionId', '', {
            httpOnly: true,
            secure: false,
            maxAge: 0 
        });

        const newSessionId = createSession(newEmail, 'university');

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