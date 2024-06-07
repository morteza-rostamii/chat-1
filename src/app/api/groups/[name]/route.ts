import connectMongo from "@/app/_libs/db";
import Group from "@/app/_models/Group";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

//GET: /api/users
export async function GET(
  req: NextRequest,
  {params}: {params: {name: string}}
) {
  //const {searchParams} = new URL(req.url);
  //const name = searchParams.get('name');
  try {
    await connectMongo();

    if (!params?.name) return NextResponse.json(
      {message: 'missing input'},
      {status: HttpStatusCode.BadRequest}
    );

    const group = await Group.findOne({name: params.name});

    return NextResponse.json(
      {group, message: 'group was found'},
      {status: HttpStatusCode.Created}
    );
  }
  catch(err:any) {
    return NextResponse.json({
      message: err?.message || err || 'empt error',
    });
  }
}