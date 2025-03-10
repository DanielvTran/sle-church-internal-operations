/**
 * @file Authentication configuration for NextAuth.js.
 * @description This file configures authentication providers, session handling,
 * and JSON Web Token (JWT) settings for NextAuth.
 */

import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

/**
 * @constant {NextAuthOptions} authOptions
 * @description Configuration object for NextAuth.js, defining authentication
 * providers, session strategy, and JWT settings.
 */
export const authOptions: NextAuthOptions = {
  /**
   * @property {Array} providers - Defines the authentication providers.
   * Currently, Google OAuth is used for authentication.
   */
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  /**
   * @property {string} secret - Secret key for NextAuth.js encryption.
   * Used to sign and encrypt JWT tokens.
   */
  secret: process.env.NEXTAUTH_SECRET,

  /**
   * @property {Object} session - Configuration for session handling.
   * @property {"jwt"} session.strategy - Uses JSON Web Tokens (JWT) for sessions.
   */
  session: {
    strategy: "jwt",
  },

  /**
   * @property {Object} jwt - Configuration for JSON Web Tokens (JWT).
   * @property {string} jwt.secret - Secret key used for JWT encryption and decryption.
   */
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};
