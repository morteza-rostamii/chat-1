import connectMongo from "@/app/_libs/db";
import Group from "@/app/_models/Group";
import Message from "@/app/_models/Message";
import User from "@/app/_models/User";
import { getUserFromHeader } from "@/app/_utils/helper";
import { TCreateMessage } from "@/dtos/message-dto";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

// POST: /api/users
export async function POST(req: NextRequest) {
  
  try {
    await connectMongo();

    // @ts-ignore
    const authUser = getUserFromHeader();

    const body:TCreateMessage = await req.json(); 

    if (
      !body?.groupId ||
      !body?.message ||
      !authUser?.email
    ) return NextResponse.json(
      {message: 'input data is missing',},
      {status: HttpStatusCode.BadRequest},
    );

    const user = await User.findOne({email: authUser.email});
    
    if (!user) {
      return NextResponse.json(
        {message: 'No such User found'},
        {status: HttpStatusCode.NotFound},
      );
    }

    const message = await Message.create({
      content: body.message,
      image: body?.image || '',
      sender: authUser._id || authUser.id,
      group: body.groupId,
    });

    // save message in group
    const group = await Group.findOne({_id: body.groupId});
    
    if (!Array.isArray(group?.message)) {
      group.messages = [];
    }

    group.messages.push(message._id || message.id);

    const edited = await group.save();

    return NextResponse.json(
      {group: edited, Message: message, message: 'message was created'},
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