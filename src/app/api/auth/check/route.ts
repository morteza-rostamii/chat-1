import {HttpStatusCode} from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/app/_libs/jwt';


// POST: /api/auth/check-auth
export async function POST(req: NextRequest) {
  console.log('================****8');
  try {
    const payload = await getSession();

    if (!payload) return NextResponse.json(
      {message: 'not auth', user: null},
      {status: HttpStatusCode.BadRequest},
    );

    return NextResponse.json(
      {message: 'is auth', user: payload.user},
      {status: HttpStatusCode.Ok},
    );
  }
  catch(err:any) {
    return NextResponse.json(
      {message: err?.message || err || 'empty error'},
      {status: HttpStatusCode.BadRequest},
    )
  }
}