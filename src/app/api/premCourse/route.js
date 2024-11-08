import mongoDb from "@/lib/ddConn";
import course from "";
import user from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const id = req.nextUrl.searchParams.get('userId');
    console.log(id)
    await mongoDb();
    const userData = await user.findOne({email:id})
    const couseArr = userData.courses
    const courseData = await course.find({})
    const data = courseData.filter((val,ind)=> couseArr.includes(val._id))
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
