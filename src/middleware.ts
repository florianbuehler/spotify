import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  // token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // user is logged in
  if (token) {
    return NextResponse.next();
  }

  // user is not logged in
  // if the user want to visit a different page than the login page
  // or requests a resource not needed for the login flow, we should let him through
  // otherwise we need to redirect him to the login page
  if (
    pathname === '/login' ||
    pathname.includes('/_next/static') ||
    pathname.includes('/api/auth')
  ) {
    return NextResponse.next();
  }

  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/login';

  return NextResponse.redirect(redirectUrl);
};
