import { NextResponse } from "next/server";
import University from "@/lib/models/university";
import connect from "@/lib/db";
import { createSession } from "@/lib/session";

export const POST = async (req: Request) => {

    const body = await req.json();
    const {email} = body;

    if (body.checkEmail == true) {

        try {
            await connect();
            const user = await University.findOne({email});

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
            const sessionId = createSession(email, 'university');

            await connect();
    
            const university = new University(body);
            await university.save();

            const response = NextResponse.json({
                success: true,
                message: "University created successfully",
                university: university
            }, {status: 200});

            response.cookies.set('sessionId', sessionId, {
                httpOnly: true,
                secure: false,
                maxAge: 24 * 60 * 60 * 1000
            });

            return response;
    
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                message: "Error in creating university",
            }, {status: 500});
        }
    }
    
}