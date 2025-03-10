/**
 * @file Middleware for protecting routes using NextAuth.js.
 * @description This middleware ensures that only authenticated users
 * can access protected routes, specifically those under `/dashboard`.
 */

/**
 * Export the default NextAuth.js middleware.
 * This middleware handles authentication and session management for protected routes.
 */
export { default } from "next-auth/middleware";

/**
 * @constant {Object} config
 * @property {string[]} matcher - Defines the protected routes.
 * @description The `matcher` array specifies which routes require authentication.
 * The pattern `"/dashboard/:path*"` protects `/dashboard` and all its subroutes.
 */
export const config = { matcher: ["/dashboard/:path*", "/event/:path*"] };
