import { NextResponse } from "next/server";
import University from "@/lib/models/university";
import connect from "@/lib/db";
import { getSession } from "@/lib/session";
import { cookies } from "next/headers";

export const GET = async (req: Request) => {
    try {
        //Checking admin session
        const cookieStore = cookies();
        const sessionId = (await cookieStore).get('sessionId')?.value;

        if (!sessionId) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized: Please log in"
            }, {status: 401})
        }

        const session = await getSession(sessionId)

        if (!session || (session.userType !== "admin")) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized: Invalid session"
            }, {status: 403})
        }

        await connect();
        const universities = await University.find();

        return NextResponse.json({
            success: true,
            message: "Students retrieved successfully",
            universities: universities
        }, {status: 200});
        
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
        }, {status: 500});
    }
}