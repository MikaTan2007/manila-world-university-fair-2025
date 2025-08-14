import { NextResponse } from "next/server";
import Student from "@/lib/models/student";
import University from "@/lib/models/university";
import connect from "@/lib/db";
import { getSession } from "@/lib/session";
import { cookies } from "next/headers";

export const GET = async () => {
    try {
        //Checking admin session
        const cookieStore = cookies();
        const sessionId = (await cookieStore).get('sessionId')?.value;

        if (!sessionId) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized: Please log in"
            }, {status: 401})
        }

        const session = await getSession(sessionId)

        if (!session || (session.userType !== "admin")) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized: Invalid session"
            }, {status: 403})
        }

        await connect();

        //Total Counts
        const totalStudents = await Student.countDocuments();
        const totalUniversities = await University.countDocuments();

        //Total Registrations
        const universities = await University.find(
            {},
            { registered_students: 1, 
                uni_name: 1 
            }
        );
        let totalRegistrations = 0;
        for (const uni of universities) {
            totalRegistrations += uni.registered_students.length;
        }

        //Today's signups
        const today = new Date();
        today.setHours(0,0,0,0);
        const todaySignups = await Student.countDocuments({createdAt: {$gte: today}}) +
                             await University.countDocuments({createdAt: {$gte: today}})

        //Most popular university
        const popularUniversity = universities.reduce(
            (max, uni) => 
                uni.registered_students.length > max.count
            ?
            {name: uni.uni_name || 'Unknown', count: uni.registered_students.length}
            :
            max,
            {name: '', count: 0}
        );

        //Popular Major
        const students = await Student.find({}, 'ideal_major');
        const majorCount: Record<string, number> = {};
        students.forEach(student => {
            if (student.ideal_major && student.ideal_major.length > 0) {
                student.ideal_major.forEach((major:string) => {
                    majorCount[major] = (majorCount[major] || 0) + 1;
                });
            }
        })

        let popularMajor = "No majors specified"
        let popularMajorCount = 0

        if (Object.keys(majorCount).length > 0) {
            popularMajor = Object.keys(majorCount).reduce((highestMajor, currentMajor) => {
                return majorCount[highestMajor] > majorCount[currentMajor]
                ? highestMajor
                : currentMajor
            })
            popularMajorCount = majorCount[popularMajor]
        }

        const stats = {
            totalStudents,
            totalUniversities,
            totalRegistrations,
            todaySignups,
            popularUniversity: {
                name: popularUniversity.name,
                registrations: popularUniversity.count
            },
            popularMajor,
            popularMajorCount
        }

        return NextResponse.json({
            success: true,
            stats
        })

    } catch {
        return NextResponse.json({
            success: false,
        }, { status: 500 });
    }
}