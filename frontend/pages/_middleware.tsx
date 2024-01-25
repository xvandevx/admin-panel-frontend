import {NextResponse} from 'next/server';
import * as process from "process";

export async function middleware(request: any) {
    if (request.page.name === '/auth') {
        return
    }
    const token = request.cookies.token;
    let isAuth = false;


    const path = request.nextUrl.protocol + '//' + request.headers.get('host') + ":" + (process.env.PORT || 80);

    if (token) {
        try {
            const response = await fetch(path + "/api/auth/check", {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            const auth = await response.json();
            if (auth.statusCode === 200) {
                isAuth = true;
            }
        } catch(e) {
            console.log('error fetch', e)
        }
    }

    if (!isAuth) {
        return NextResponse.redirect(new URL('/auth', path));
    }
}