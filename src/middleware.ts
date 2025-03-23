import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
 
const protectedRoutes = ["/dashboard", 
   "/mechanic", "/mechanic/edit/:id",
  "/services", "/services/add", "/services/edit/:id",
  "/vehicle", "/vehicle/add", "/vehicle/edit/:id"
]


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
 
  const accessToken = request.cookies.get("token")   


  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
 
  if (isProtectedRoute && !accessToken) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }


  return NextResponse.next()
}
 
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
