import { NextResponse } from "next/server";
import Admin from "@/lib/models/admin";
import connect from "@/lib/db";
import { createSession } from "@/lib/session";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const {username, password} = body;

        await connect();

        const admin = await Admin.findOne({username});

        if (!admin) {
            return NextResponse.json({
                success: false,
                message: "Admin not found"
            }, {status: 404})
        }

        if (admin.password !== password) {
            return NextResponse.json({
                success : false,
                message : "Password does not match"
            }, {status: 401})
        }

        //Create session
        const sessionId = await createSession(username, 'admin');

        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            admin: admin
        }, {status : 200});

        response.cookies.set('sessionId', sessionId, {
            httpOnly: true,
            secure: true, // Set to true in production with HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            sameSite: 'lax',
            path: '/'
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
        }, {status: 500});
    }
}