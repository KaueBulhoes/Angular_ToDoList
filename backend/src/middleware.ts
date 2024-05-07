import { NextResponse } from "next/server";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token,X-Requested-With,Accept,Accept-Version,Content-Length,Content-MD5,Content-Type,Date,X-Api-Version,Accept-Encoding,Accept-Language,Connection,Host,Origin,Referer,Sec-Fetch-Dest,Sec-Fetch-Mode,Sec-Fetch-Site,TE,User-Agent,Authorization",
};

export const middleware = async (request: Request, response: Response) => {
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  const nextResponse = NextResponse.next();

  Object.entries(corsHeaders).forEach(([key, value]) => {
    nextResponse.headers.set(key, value);
  });

  return nextResponse;
};

export const config = {
  matcher: "/api/:path*",
};
