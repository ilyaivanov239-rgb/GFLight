import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const PUBLIC_FILE = /\.(.*)$/;
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC_FILE.test(pathname) || pathname.startsWith('/api')) return;
  const locales = ['en','ru','pt'];
  const hasLocale = locales.some(l => pathname===`/${l}` || pathname.startsWith(`/${l}/`));
  if (!hasLocale) { req.nextUrl.pathname = `/en${pathname}`; return NextResponse.redirect(req.nextUrl); }
}