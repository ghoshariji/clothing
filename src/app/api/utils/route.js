// pages/api/verifyToken.js
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { token } = await req.json();

  console.log("backend" + token);
  if (!token) {
    return res.status(400).json({ isValid: false });
  }

  try {
    const decoded = jwt.verify(token, "Hello");
    console.log(decoded)
    return NextResponse.json({ isValid: true,decoded }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ isValid: false }, { status: 401 });
  }
}
