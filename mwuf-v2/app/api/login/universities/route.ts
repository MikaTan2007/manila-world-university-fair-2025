import { NextResponse } from "next/server";
import University from "@/lib/models/university";
import connect from "@/lib/db";


export const POST = async (req: Request) => {

    try {
        const body = await req.json();
        const {email, password} = body;

        await connect();

        const university = await University.findOne({ email });

        if (!university) {
            return NextResponse.json({
                success : false,
                message: "University not found"
            }, {status: 404})
        } 

        if (university.password !== password) {
            return NextResponse.json({
                success : false,
                message : "Password does not match"
            }, {status: 401})
        }

        return NextResponse.json({
            success: true,
            message: "Login successful",
            university: university
        }, {status : 200});


    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
        }, {status: 500});
    }

}