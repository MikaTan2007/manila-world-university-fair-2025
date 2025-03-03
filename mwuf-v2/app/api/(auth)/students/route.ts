import { NextResponse } from "next/server";
import Student from "@/lib/models/student";
import connect from "@/lib/db";

export const GET = async () => {
    try {
        await connect();
        const students = await Student.find();
        return new NextResponse(JSON.stringify(students), {status: 200});
    } catch (error: any) {
        return new NextResponse("Error in fetching students " + error.message, {status: 500});
    }
};

export const POST = async (req: Request) => {
    try {

        const body = await req.json();
        await connect();

        const student = new Student(body);
        await student.save();

        return new NextResponse(JSON.stringify({message: "Student created successfully", student: student}), 
        {status: 200});

    } catch {
        return new NextResponse("Error in creating student", {status: 500});
    }
}