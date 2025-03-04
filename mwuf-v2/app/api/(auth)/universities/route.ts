import { NextResponse } from "next/server";
import University from "@/lib/models/university";
import connect from "@/lib/db";

export const GET = async() => {
    try {
        await connect();
        const universities = await University.find();
        return new NextResponse(JSON.stringify(universities), {status: 200});
    } catch (error: any) {
        return new NextResponse("Error in fetching universities " + error.message, {status: 500});
    }
};

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        await connect();

        const university = new University(body);
        await university.save();

        return new NextResponse(JSON.stringify({message: "University created successfully", university: university}), 
        {status: 200});
    } catch {
        return new NextResponse("Error in creating university", {status: 500});
    }
}