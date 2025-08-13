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
        const universityEmail = body.email;

        if (!universityEmail) {
            return NextResponse.json({
                success: false,
                error: "University email is required"
            }, { status: 400 });
        }

        await connect();

        const university = await University.findOne({ email: universityEmail });
        if (!university) {
            return NextResponse.json({
                success: false,
                error: "University not found"
            }, { status: 404 });
        }

        const studentsUpdateResult = await Student.updateMany(
            { registered_universities: { $in: [universityEmail] } },
            { $pull: { registered_universities: universityEmail } }
        );

        const deleteResult = await University.findOneAndDelete({ email: universityEmail });

        if (!deleteResult) {
            return NextResponse.json({
                success: false,
                error: "Failed to delete university profile"
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "University profile deleted successfully",
            details: {
                deletedUniversity: {
                    email: deleteResult.email,
                    name: deleteResult.uni_name
                },
                studentsUpdated: studentsUpdateResult.modifiedCount,
                totalRegistrationsRemoved: studentsUpdateResult.modifiedCount
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