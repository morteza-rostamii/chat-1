import {HttpStatusCode} from 'axios';
import connectMongo from '@/app/_libs/db'
import User from '@/app/_models/User';
import { NextRequest, NextResponse } from 'next/server';
import { TInviteGroup } from '@/dtos/group-dto';
import { getUserFromHeader } from '@/app/_utils/helper';
import Group from '@/app/_models/Group';
import Notification from '@/app/_models/Notification';

// POST: /groups/invite
export async function POST(req: NextRequest) {

  try {
    await connectMongo();

    const body:TInviteGroup = await req.json();
    const authUser = getUserFromHeader();

    if (
      !body.receiver ||
      !body.group ||
      !authUser?.email
    ) return NextResponse.json(
      {success: false, message: 'input data is missing',},
      {status: HttpStatusCode.BadRequest},
    );

    const group = await Group.findById(body.group);

    const notification = await Notification.create({
      content: `You are invited to ${group.name} group`,
      link: `http://localhost:3000/groups/${group.name}`,
      sender: authUser?._id || authUser?.id,
      receiver: body.receiver,
    });

    return NextResponse.json(
      {notification, message: 'New notification was created'},
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