import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Negotiator from 'negotiator';

const locales = ['en', 'de', 'it', 'fr'];
const defaultLocale = 'en'; // Set your default language here

function getLocale(request: NextRequest): string {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    // Match client languages against supported locales
    for (const lang of languages) {
        if (locales.includes(lang)) return lang;
        const shortLang = lang.split('-')[0];
        if (locales.includes(shortLang)) return shortLang;
    }

    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the pathname already contains a supported locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale prefix
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    // Matcher ignoring static assets, public folder files, and next internal files
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public|.*\\..*).*)'],
};