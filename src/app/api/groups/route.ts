import {HttpStatusCode} from 'axios';
import connectMongo from '@/app/_libs/db'
import User from '@/app/_models/User';
import { NextRequest, NextResponse } from 'next/server';
import { TCreateGroup } from '@/dtos/group-dto';
import { getUserFromHeader } from '@/app/_utils/helper';
import Group from '@/app/_models/Group';
import Membership from '@/app/_models/Membership';
import { SUPABASE_STORAGE_URL } from '@/app/_libs/config';

// POST: /groups (create)
export async function POST(req: NextRequest) {

  try {
    await connectMongo();

    const body:TCreateGroup = await req.json();
    const authUser = getUserFromHeader();

    if (
      !body.name ||
      !body.image ||
      !authUser?.email
    ) return NextResponse.json(
      {success: false, message: 'input data is missing',},
      {status: HttpStatusCode.BadRequest},
    );

    // check if group_name is taken
    const groups = await Group.find({});

    const groupExists = groups.some((group:any) => {
      return group.name === body.name.trim();
    });

    if (groupExists) return NextResponse.json(
      {success: false, message: 'a group with this name has already exist'},
      {status: HttpStatusCode.BadRequest}
    )

    // owner
    const user = await User.findOne({
      email: authUser.email,
    });

    const newGroup = await Group.create({
      name: body.name,
      image: SUPABASE_STORAGE_URL + body.image,
      owner: authUser._id || authUser.id,
    });

    const member = await Membership.create({
      group: newGroup._id || newGroup.id,
      user: user._id || user.id,
      role: 'owner',
    });

    // edit group
    //newGroup.image = SUPABASE_STORAGE_URL +  newGroup.image;
    const groupObj = newGroup.toObject();

    return NextResponse.json(
      {group: groupObj, member, message: 'New group was created'},
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