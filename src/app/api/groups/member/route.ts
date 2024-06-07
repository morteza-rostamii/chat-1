import connectMongo from "@/app/_libs/db";
import Membership from "@/app/_models/Membership";
import { getUserFromHeader } from "@/app/_utils/helper";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

//GET: /api/users
export async function GET(
  //req: NextRequest,
  //{params}: {params: {name: string}}
) {
  //const {searchParams} = new URL(req.url);
  //const name = searchParams.get('name');
  try {
    await connectMongo();
    const authUser = getUserFromHeader();

    if (!authUser?.email) return NextResponse.json(
      {message: 'missing input'},
      {status: HttpStatusCode.BadRequest},
    )

    const groups = await Membership.find({
      user: authUser?._id || authUser?.id,
      role: 'member',
    })
    .populate({
      path: 'group',
      populate: {
        path: 'messages',
        model: 'Message',

        populate: {
          path: 'sender',
          model: 'User',
        },
      }
    })
    .populate('user');

    return NextResponse.json(
      {groups, message: 'groups by member'},
      {status: HttpStatusCode.Ok},
    );
  }
  catch(err:any) {
    return NextResponse.json({
      message: err?.message || err || 'empt error',
    });
  }
}