import connectMongo from "@/app/_libs/db";
import Membership from "@/app/_models/Membership";
import User from "@/app/_models/User";
import { getUserFromHeader } from "@/app/_utils/helper";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

//GET: /api/users
export async function GET(
  req: NextRequest,
  {params}: {params: {term: string}}
) {
  //const {searchParams} = new URL(req.url);
  //const name = searchParams.get('name');
  console.log(params)
  try {
    await connectMongo();
    //const authUser = getUserFromHeader();

    if (!params?.term) return NextResponse.json(
      {message: 'missing input'},
      {status: HttpStatusCode.BadRequest},
    )

    const users = await User.find({
      $or: [
        {username: {$regex: params.term, $options: 'i'}},
        {email: {$regex: params.term, $options: 'i'}},
      ]
    });

    return NextResponse.json(
      {users, message: 'users searched'},
      {status: HttpStatusCode.Ok},
    );
  }
  catch(err:any) {
    return NextResponse.json({
      message: err?.message || err || 'empt error',
    });
  }
}