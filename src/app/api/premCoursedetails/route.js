import mongoDb from "@/lib/ddConn";
import course from "";
import user from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    await mongoDb();
    const courseData = await course.findById(id)
    return NextResponse.json(
      {
        data: courseData,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 401 }
    );
  }
}
