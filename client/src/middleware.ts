import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Không có token => redirect login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    // Decode token (dùng jwt verify)
    const decoded: any = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!);

    // Nếu route là dashboard => kiểm tra role
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      if (decoded.role !== "ADMIN") {
        // Không phải admin => về home hoặc custom 403
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Token ok, tiếp tục
    return NextResponse.next();
  } catch (error) {
    // Token hết hạn hoặc lỗi => login
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

// Config matcher để áp dụng cho route cần auth
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/posts/manage/:path*",
    "/posts/[id]/edit",
  ],
};
