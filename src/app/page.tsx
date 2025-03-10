/**
 * @file Home.tsx
 * @description Home page component that handles user authentication using NextAuth.
 * Displays a greeting message and login/logout options based on the user's session state.
 */

"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

/**
 * Home Component
 *
 * @component
 *
 * @example
 * ```tsx
 * <Home />
 * ```
 */
export default function Home() {
  // Retrieve the user's session data
  const { data: session } = useSession();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">Hello</main>

      {/* Show different content based on session state */}
      {session ? (
        <>
          <h2>Welcome Back: {session.user?.name}</h2>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Button onClick={() => signIn("google", { callbackUrl: `/dashboard` })}>Sign in with Google</Button>
        </>
      )}
    </div>
  );
}
