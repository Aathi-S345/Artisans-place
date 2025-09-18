// In src/middleware.ts
export { default } from "next-auth/middleware";

// This config specifies which routes the middleware should protect.
export const config = {
  matcher: [
    '/admin/:path*',    // Protects all routes starting with /admin/
    '/artisan/:path*',  // Also protects artisan routes
    '/account/:path*',  // Protects the user account page
  ],
};