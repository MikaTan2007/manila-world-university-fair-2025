import { NextResponse } from "next/server";
import University from "@/lib/models/university";
import connect from "@/lib/db";
import { getSession } from "@/lib/session";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
    try {
        //Checking session
        const cookieStore = cookies();
        const sessionId = (await cookieStore).get('sessionId')?.value;

        if (!sessionId) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized: Please log in"
            }, {status: 401})
        }

        const session = getSession(sessionId);

        if (!session || session.userType !== 'admin') {
            return NextResponse.json({
                success: false,
                error: "Unauthorized: Invalid session"
            }, {status: 403})
        }

        const body = await req.json();
        const email = body.email

        await connect();

        const university = await University.findOne({ email });

        if (!university) {
            return NextResponse.json({
                success: false,
                message: "University not found"
            }, {status: 404})
        } 

        const {email: _, ...updateData} = body;

        const fieldsToUpdate = Object.entries(updateData).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {} as any);

        const updatedUniversity = await University.findOneAndUpdate(
            { email }, 
            { $set: fieldsToUpdate }, 
            { 
                new: true, 
                runValidators: true 
            }
        );

        if (!updatedUniversity) {
            return NextResponse.json({
                success: false,
                message: "Failed to update university"
            }, {status: 500})
        }

        return NextResponse.json({
            success: true,
            message: "University profile updated successfully",
            university: updatedUniversity
        }, {status: 200})
        
    } catch (error: any) {
        console.error("University update error:", error);
        return NextResponse.json({
            success: false,
            error: error.message,
        }, {status: 500});
    }
}