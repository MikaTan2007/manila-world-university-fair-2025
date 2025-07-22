import { NextResponse } from "next/server";
import Student from "@/lib/models/student";
import connect from "@/lib/db";

export const POST = async (req: Request) => {

    const body = await req.json();

    if (body.checkEmail == true) {
        const {email} = body;

        try {
            await connect();
            const user = await Student.findOne({email});

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
    
            const student = new Student(body);
            await student.save();
    
            return new NextResponse(JSON.stringify({message: "Student created successfully", student: student}), 
            {status: 200});
    
        } catch {
            return new NextResponse("Error in creating student", {status: 500});
        }
    }
    
}