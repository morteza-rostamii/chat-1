import {HttpStatusCode} from 'axios';
import connectMongo from '@/app/_libs/db'
import { NextRequest, NextResponse } from 'next/server';
import { TJoinGroup } from '@/dtos/group-dto';
import { getUserFromHeader } from '@/app/_utils/helper';
import Group from '@/app/_models/Group';
import Membership from '@/app/_models/Membership';

// POST: /groups/invite
export async function POST(req: NextRequest) {

  try {
    await connectMongo();

    const body:TJoinGroup = await req.json();
    const authUser = getUserFromHeader();

    if (
      !body.groupId ||
      !authUser?.email
    ) return NextResponse.json(
      {success: false, message: 'input data is missing',},
      {status: HttpStatusCode.BadRequest},
    );

    const group = await Group.findById(body.groupId);

    // check if: user is already a member
    const memberExists = await Membership.findOne({
      group: group._id || group.id,
      user: authUser._id || authUser.id,
    });

    if (memberExists) return  NextResponse.json(
      {success: false, message: 'member exists.',},
      {status: HttpStatusCode.BadRequest},
    );
    //===========

    const membership = await Membership.create({
      group: group._id || group.id,
      user: authUser._id || authUser.id,
      role: 'member',
    });

    return NextResponse.json(
      {membership, message: 'New membership was created'},
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