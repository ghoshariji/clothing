import mongoDb from "@/lib/ddConn";
import course from "@/models/course";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, price, duration, title, description } = await req.json();
  // connect the databasse conn

  await mongoDb();
  try {
    const newCourse = new course({
      name,
      price,
      duration,
      title,
      description,
    });

    await newCourse.save();
    return NextResponse.json(
      {
        message: "Course Added Succesfully",
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
