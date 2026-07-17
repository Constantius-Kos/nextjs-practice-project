import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function proxy(req: NextRequest) {
    const isUser = req.cookies.get('authjs.session-token')
    const vercelHeader = req.cookies.get('__Secure-authjs.session-token')
    // console.log(isUser)
    const sessionToken = isUser || vercelHeader
    if (!sessionToken) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    const userAgent = req.headers.get('user-agent')
    if (userAgent?.toLowerCase().includes('bot')) {
        return NextResponse.redirect(new URL(`/contacts`, req.nextUrl))
    }
    // console.log(userAgent)
    return NextResponse.next()


    // ДОДАВАННЯ КАСТОМНОГО ХЕДЕРУ
    const newHeaders = new Headers(req.headers)
    newHeaders.set('x-middleware-applied', 'true')
    return NextResponse.next({ request: { headers: newHeaders } })
}

export const config = {
    matcher: '/projects/:path*'
}