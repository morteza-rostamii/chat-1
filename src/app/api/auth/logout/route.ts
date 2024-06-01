import {HttpStatusCode} from 'axios';
import connectMongo from '@/app/_libs/db'
import User from '@/app/_models/User';
import { IUser } from '@/dtos/user-dto';
import { NextRequest, NextResponse } from 'next/server';
import { ILogin } from '@/dtos/auth-dto';
import Otp from '@/app/_models/Otp';
import { encrypt } from '@/app/_libs/jwt';
import { cookies } from 'next/headers';

// POST: /api/auth/logout
export async function POST(req: NextRequest) {
  
  try {
    cookies().set('session', '', {expires: new Date(0)});

    return NextResponse.json(
      {message: 'logged out',},
      {status: HttpStatusCode.Ok},
    );
  }
  catch(err:any) {
    return NextResponse.json(
      {message: err?.message || err || 'emt error'},
      {status: HttpStatusCode.BadRequest},
    )
  }
}