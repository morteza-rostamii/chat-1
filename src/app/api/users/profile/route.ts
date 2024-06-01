import connectMongo from "@/app/_libs/db";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

// POST: /api/users
export async function POST(req: NextRequest) {

  try {
    await connectMongo();

    console.log('-----------------/users/profile')

    return NextResponse.json(
      {message: 'New User was created'},
      {status: HttpStatusCode.Created},
    );
  }
  catch(err:any) {
    return NextResponse.json(
      {message: err?.message || err || 'empt error',},
      {status: HttpStatusCode.BadRequest},
    )
  }
}