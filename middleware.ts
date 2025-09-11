import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // пропускаем статику и API
  if (PUBLIC_FILE.test(pathname) || pathname.startsWith('/api')) return;

  // если уже есть язык в пути — ничего не делаем
  const hasLocale = ['en','ru','pt'].some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  // иначе редиректим на английский
  req.nextUrl.pathname = `/en${pathname}`;
  return NextResponse.redirect(req.nextUrl);
}
