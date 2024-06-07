import connectMongo from "@/app/_libs/db";
import User from "@/app/_models/User";
import { TUpdateProfile } from "@/dtos/user-dto";
import { HttpStatusCode } from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// POST: /api/users
export async function POST(req: NextRequest) {
  
  try {
    await connectMongo();

    // @ts-ignore
    const headersList = headers();
    const authUser:any = headersList.get('user');

    const body:TUpdateProfile = await req.json();
    const parsedUser = JSON.parse(authUser);

    if (
      !body?.username &&
      !body?.image
    ) return NextResponse.json(
      {message: 'input data is missing',},
      {status: HttpStatusCode.BadRequest},
    );

    if (!parsedUser?.email) return NextResponse.json(
      {message: 'Not authenticated',},
      {status: HttpStatusCode.BadRequest},
    );

    const user = await User.findOne({email: parsedUser.email});
    
    if (!user) {
      return NextResponse.json(
        {message: 'No such User found'},
        {status: HttpStatusCode.NotFound},
      );
    }

    if (body.username?.trim().length) user.username = body.username;
    // this assumes: File is uploaded to the server before /profile-update request.
    if (body.image?.trim().length) user.image = body.image;

    const updated = await user.save();

    return NextResponse.json(
      {user: updated, message: 'Profile was updated'},
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