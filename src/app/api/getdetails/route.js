import mongoDb from "@/lib/ddConn";
import course from "";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    console.log(id)
    await mongoDb();
    const data = await course.findById(id).select("-lectures");
    console.log(data)
    return NextResponse.json(
      {
        data: data,
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
