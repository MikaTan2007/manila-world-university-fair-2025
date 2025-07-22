import { NextResponse } from "next/server";
import University from "@/lib/models/university";
import connect from "@/lib/db";

export const POST = async (req: Request) => {

    const body = await req.json();

    if (body.checkEmail == true) {
        const {email} = body;

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
            await connect();
    
            const university = new University(body);
            await university.save();
    
            return new NextResponse(JSON.stringify({message: "University created successfully", university: university}), 
            {status: 200});
        } catch {
            return new NextResponse("Error in creating university", {status: 500});
        }
    }
    
}