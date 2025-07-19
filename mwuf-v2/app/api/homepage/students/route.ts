import { NextResponse } from "next/server";
import University from "@/lib/models/university";
import connect from "@/lib/db";

export const GET = async () => {
    try {
        await connect();
        const universities = await University.find();
        return new NextResponse(JSON.stringify(universities), {status: 200});
    } catch (error: any) {
        return new NextResponse("Error in fetching universities " + error.message, {status: 500});
    }
};