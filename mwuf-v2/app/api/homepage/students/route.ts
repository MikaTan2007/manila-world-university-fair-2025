import { NextResponse } from "next/server";
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

        if (!session || (session.userType !== 'student' && session.userType !== 'admin')) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized: Invalid session"
            }, {status: 403})
        }

        const body = await req.json();
        const {studentEmail} = body;

        if (session.userType !== 'admin' && session.email !== studentEmail) {
            return NextResponse.json({
                success: false,
                error: "Forbidden: Cannot access other student's data"
            }, {status: 403});
        }

        await connect();
        const universities = await University.find();
        return NextResponse.json({
            success: true,
            message: "Universities retrieved successfully",
            universities: universities
        }, {status: 200})


    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
        }, {status: 500});
    }
};