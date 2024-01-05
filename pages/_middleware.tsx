import {NextResponse} from 'next/server';

export async function middleware(request: any) {
    if (request.page.name === '/auth') {
        return
    }
    const token = request.cookies.token;
    let isAuth = false;

    if (token) {
        try {
            const response = await fetch("http://localhost:3001/auth/check", {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            const auth = await response.json();
            if (auth.statusCode === 200) {
                isAuth = true;
            }
        } catch {

        }
    }

    if (!isAuth) {
        const originalUrl = request.nextUrl.protocol + request.headers.get('host') + request.nextUrl.pathname
        return NextResponse.redirect(new URL('/auth', originalUrl));
    }
}