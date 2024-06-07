import {HttpStatusCode} from 'axios';
import connectMongo from '@/app/_libs/db'
import User from '@/app/_models/User';
import { NextRequest, NextResponse } from 'next/server';
import { IRegister } from '@/dtos/auth-dto';

import otpGenerator from 'otp-generator'
import Otp from '@/app/_models/Otp';
import {generateFromEmail} from 'unique-username-generator';

// POST: /api/auth/register
export async function POST(req: NextRequest) {
  
  try {
    await connectMongo();
    
    const body:IRegister = await req.json();
    // if: input exists
    if (
      !body.email
    ) return NextResponse.json(
      {message: 'input data is missing',},
      {status: HttpStatusCode.BadRequest},
    );

    // *********** generate unique otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let oldOtp = await Otp.findOne({otp: otp});
    // check if otp not repeated
    while (oldOtp) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      
      oldOtp = await Otp.findOne({otp: otp});
    }
    // *********** generate unique otp

    const newOtp = await Otp.create({
      email: body.email,
      otp,
    });

    const oldUser = await User.findOne({email: body.email});
    // if: user already exists
    if (oldUser) {
      // send otp
      return NextResponse.json(
        {success: true, message: 'here otp', otp: otp},
        {status: HttpStatusCode.Created},
      )
    }
    else {

      const username = generateFromEmail(body.email, 4);

      // create new user
      const newUser = await User.create({
        email: body.email,
        username,
      });

      return NextResponse.json(
        {success: true, message: 'here otp', otp: newOtp.toObject(), user: newUser.toObject()},
        {status: HttpStatusCode.Created},
      )
    }
    
    //return NextResponse.json({});
  }
  catch(err:any) {
    return NextResponse.json(
      {message: err?.message || err || 'empty error'},
      {status: HttpStatusCode.BadRequest},
    )
  }
}