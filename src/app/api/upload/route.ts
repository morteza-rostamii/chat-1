import connectMongo from "@/app/_libs/db";
import { uploadToSupa } from "@/app/_libs/supabase";
import helper from "@/utils/helper";
import { HttpStatusCode } from "axios";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";

// POST: /api/users
export async function POST(req: NextRequest) {

  try {
    await connectMongo();

    console.log('-----------------/upload');

    const formData = await req.formData();
    //return NextResponse.json({formData});
    const file = formData.get('file') as File;

    if (!file) return NextResponse.json(
      {message: 'there is no file to upload'},
      {status: HttpStatusCode.BadRequest},
    );

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    //const uploadPath = `./public/uploads/${file.name}`;
    //await fs.writeFile(uploadPath, buffer);

    //revalidatePath('/');

    const fileName = helper.getRandomId() + file.name;

    // upload to supa
    const response = await uploadToSupa('chat-media', fileName, buffer, {});
    console.log(response);

    // store file.name in mongoDB


    return NextResponse.json(
      {fileName, message: 'File was uploaded'},
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