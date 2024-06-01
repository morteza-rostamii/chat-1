import {HttpStatusCode} from 'axios';
import connectMongo from '@/app/_libs/db'
import User from '@/app/_models/User';
import { IUser } from '@/dtos/user-dto';
import { NextRequest, NextResponse } from 'next/server';
import { ILogin } from '@/dtos/auth-dto';
import Otp from '@/app/_models/Otp';
import { encrypt } from '@/app/_libs/jwt';
import { cookies } from 'next/headers';

// POST: /api/auth/login
export async function POST(req: NextRequest) {
  console.log('login-------------------')
  try {
    await connectMongo();

    const body:ILogin = await req.json();

    if (
      !body.otp ||
      !body.email
    ) return NextResponse.json(
      {message: 'input data is missing',},
      {status: HttpStatusCode.BadRequest},
    );

    console.log('OTP', body.otp);

    const otp = await Otp.findOne({email: body.email}).sort({createdAt: -1}).limit(1);

    if (otp) {
      // if: valid otp
      if (otp.otp === body.otp) {
        console.log('correct otp', otp);

        // generate jwt 
        const user = await User.findOne({email: body.email});

        // 10 seconds
        //const expires = new Date(Date.now() + 10 * 1000);
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const session = await encrypt({
          user, 
          expires,
        });

        // store jwt on http only cookie
        cookies().set("session", session, {
          expires,
          httpOnly: true,
        });

        return NextResponse.json(
          {message: 'logged in successfully'},
          {status: HttpStatusCode.Created},
        );
      }
    }
    //const newUser = await User.create(body);

    return NextResponse.json(
      {message: 'otp not valid',},
      {status: HttpStatusCode.BadRequest},
    );
  }
  catch(err:any) {
    return NextResponse.json(
      {message: err?.message || err || 'empty error'},
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
    return NextResponse.json(
      {message: err?.message || err || 'empty error'},
      {status: HttpStatusCode.BadRequest},
    )
  }
}