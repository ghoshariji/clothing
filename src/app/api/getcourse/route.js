import mongoDb from "@/lib/ddConn";
import course from "@/models/course";
import user from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ message: "UserId is required" }, { status: 400 });
    }

    await mongoDb();

    const data = await course.find({});
    const userData = await user.findOne({ email: userId }).select("-name -email -address -password -isAdmin");

    if (!userData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data, userData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
