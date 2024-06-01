import {HttpStatusCode} from 'axios';
import connectMongo from '@/app/_libs/db'
import User from '@/app/_models/User';
import { ICreateUser, IUser } from '@/dtos/user-dto';
import { NextRequest, NextResponse } from 'next/server';

// POST: /api/users
export async function POST(req: NextRequest) {

  try {
    await connectMongo();

    const body:ICreateUser = await req.json();

    if (
      !body.username ||
      !body.email
    ) return NextResponse.json(
      {message: 'input data is missing',},
      {status: HttpStatusCode.BadRequest},
    );

    const newUser = await User.create(body);

    return NextResponse.json(
      {newUser, message: 'New User was created'},
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

//GET: /api/users
export async function GET(req: NextRequest) {

  try {
    await connectMongo();
    const users: IUser[] = await User.find(); 
    return NextResponse.json(
      {data: users},
    );
  }
  catch(err:any) {
    return NextResponse.json({
      message: err?.message || err || 'empt error',
    });
  }
}