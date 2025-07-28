import { NextResponse } from "next/server";
import University from "@/lib/models/university";
import connect from "@/lib/db";


export const POST = async (req: Request) => {

    try {
        const body = await req.json();
        const {email} = body;

        await connect();

        const university = await University.findOne({ email });

        if (!university) {
            return NextResponse.json({
                success : false,
                message: "University not found"
            }, {status: 404})
        } 

        return NextResponse.json({
            success: true,
            university: university
        }, {status: 200})

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
        }, {status: 500});
    }

}