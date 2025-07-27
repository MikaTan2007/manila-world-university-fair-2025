import { NextResponse } from "next/server";
import Student from "@/lib/models/student";
import connect from "@/lib/db";


export const POST = async (req: Request) => {

    try {
        const body = await req.json();
        const {email} = body;

        await connect();

        const student = await Student.findOne({ email });

        if (!student) {
            return NextResponse.json({
                success : false,
                message: "Student not found"
            }, {status: 404})
        } 

        return NextResponse.json({
            success: true,
            student: student
        }, {status: 200})

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
        }, {status: 500});
    }

}