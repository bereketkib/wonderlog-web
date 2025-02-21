import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const userData = searchParams.get("user");
  const theme = searchParams.get("theme");

  if (!token || !userData) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const user = JSON.parse(userData);
    const script = `
      localStorage.setItem('accessToken', '${token}');
      localStorage.setItem('user', '${userData}');
      localStorage.setItem('theme', '${theme || "light"}');
      if ("${theme}" === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
      window.location.href = '/profile';
    `;

    return new NextResponse(
      `<!DOCTYPE html><html><body><script>${script}</script></body></html>`,
      {
        headers: { "Content-Type": "text/html" },
      }
    );
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
