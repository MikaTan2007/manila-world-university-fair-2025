import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
    try {
        const cookieStore = cookies();
        const sessionId = (await cookieStore).get('sessionId')?.value;

        if (sessionId) {
            await deleteSession(sessionId);
        }

        const response = NextResponse.json({
            success: true,
            message: "Logged out successfully"
        }, { status: 200 });

        //Clear cookie session
        response.cookies.set('sessionId', '', {
            httpOnly: true,
            secure: true,
            maxAge: 0 
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
        }, { status: 500 });
    }
};