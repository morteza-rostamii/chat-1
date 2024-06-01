import { SignJWT,  jwtVerify } from "jose";
import { JWT_SECRET } from "./config";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(JWT_SECRET);

// generate jwt
export async function encrypt(payload: any) {

  return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

// decode jwt
export async function decrypt(jwt:string): Promise<any> {
  const {payload} = await jwtVerify(jwt, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function updateSession(req: NextRequest) {
  // get jwt from cookie
  const session = req.cookies.get("session")?.value;
  // no session
  if (!session) {
    return null;
  }

  // refresh session
  const parsed = await decrypt(session);
  // @ts-ignore
  parsed.expires = new Date(Date.now()) + 10 * 1000;

  // set cookies on next response
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
  });

  return res;
}

// get payload out of jwt 
export async function getSession(): Promise<any> {
  const session = cookies().get("session")?.value;
  if (!session) return  null;
  return await decrypt(session);
}