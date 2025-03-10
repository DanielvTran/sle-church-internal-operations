/**
 * @file API route to handle authentication-protected GET requests.
 * @description This route checks for a valid user session using NextAuth and
 * returns either the session data or an unauthorized error response.
 */

import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../lib/authOptions";
import { NextResponse } from "next/server";

/**
 * Handles GET requests to the API route.
 *
 * @async
 * @function GET
 * @returns {Promise<NextResponse>} JSON response containing either the session data or an error message.
 */
export async function GET(): Promise<NextResponse> {
  // Retrieve the user session using NextAuth
  const session = await getServerSession(authOptions);

  // If no session exists, return an unauthorized response
  if (!session) {
    return NextResponse.json({ error: "Not Authorised" }, { status: 400 });
  }

  // Return the session data if authentication is successful
  return NextResponse.json({ success: session }, { status: 200 });
}
