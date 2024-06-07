import {HttpStatusCode} from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/app/_libs/jwt';
import { getUserFromHeader } from '@/app/_utils/helper';


// POST: /api/auth/check-auth
export async function POST(req: NextRequest) {
  console.log('================****8');
  try {
    const authUser = getUserFromHeader();

    if (!authUser?.email) return NextResponse.json(
      {message: 'not auth', user: null},
      {status: HttpStatusCode.BadRequest},
    );

    return NextResponse.json(
      {message: 'is auth', user: authUser},
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