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
        const studentEmail = body.email;

        if (!studentEmail) {
            return NextResponse.json({
                success: false,
                error: "Student email is required"
            }, { status: 400 });
        }

        await connect();

        const student = await Student.findOne({ email: studentEmail });

        const universitiesUpdateResult = await University.updateMany(
            { 
                registered_students: { $in: [studentEmail] } // Find universities that have this student
            },
            { 
                $pull: { registered_students: studentEmail } // Remove the student email
            }
        );

        const deleteResult = await Student.findOneAndDelete({ email: studentEmail });

        if (!deleteResult) {
            return NextResponse.json({
                success: false,
                error: "Failed to delete student profile"
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "Student profile deleted successfully",
            details: {
                deletedStudent: {
                    email: deleteResult.email,
                    name: `${deleteResult.first_name} ${deleteResult.last_name}`
                },
                universitiesUpdated: universitiesUpdateResult.modifiedCount,
                totalRegistrationsRemoved: universitiesUpdateResult.modifiedCount
            }
        }, { status: 200 });

    } catch (error: any) {
            console.error("Update error:", error);
            return NextResponse.json({
                success: false,
                error: error.message,
            }, {status: 500});
        }

}