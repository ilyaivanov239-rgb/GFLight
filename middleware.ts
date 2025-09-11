import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Обрабатываем только "страницы", исключаем статику и API
export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)'],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // если уже есть язык в пути — просто пропускаем дальше
  const hasLocale = ['en', 'ru', 'pt'].some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) {
    return NextResponse.next();
  }

  // иначе редиректим на английскую версию
  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.redirect(url);
}
