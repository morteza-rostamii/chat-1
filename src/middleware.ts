import { NextRequest, NextResponse } from "next/server";
import {getSession, updateSession} from '@/app/_libs/jwt';
import { HttpStatusCode } from "axios";
import { request } from "http";
import upload from "./app/_libs/multer";
//import connectMongo from "./app/_libs/db";

// runs on each request:
export async function middleware(req: NextRequest) {
  // connect to mongo:
  //await connectMongo();
  console.log('============middleware running');
  // const privateRoutes = ['/api/users', '/client']

  const pathname = req.nextUrl.pathname;
  const method = req.method;
  //console.log(method, pathname)
  // if (
  //   method == 'GET' && pathname.startsWith('/api/users')
  // ) {
  //   const payload = await getSession();

  //   //NextResponse.redirect(new URL("/dashboard",request.url))
  //   if (!payload) {
  //     return NextResponse.json(
  //       {message: 'not allowed'},
  //       {status: HttpStatusCode.Unauthorized},
  //     );
  //   }
  // }

  //console.log(req)
  // const formData = await req.formData();
  // const file = formData.get('file');
  // console.log(typeof file);
  // //Object.keys((file as any)).forEach((el:any) => console.log(el))
  // const {myfile}:any = req;
  // console.log('---', myfile);

  


  const response = await updateSession(req);
  return response;
}