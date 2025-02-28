import { NextResponse } from "next/server";
import User from "@/lib/models/student";
import connect from "@/lib/db";

export const GET = async () => {
    try {
        await connect();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), {status: 200});
    } catch (error: any) {
        return new NextResponse("Error in fetching users " + error.message, {status: 500});
    }
};

export const POST = async (req: Request) => {
    try {

        const body = await req.json();
        await connect();

        const user = new User(body);
        await user.save();

        return new NextResponse(JSON.stringify({message: "User created successfully", user: user}), 
        {status: 200});

    } catch {
        return new NextResponse("Error in creating user", {status: 500});
    }
}