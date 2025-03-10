/**
 * @file Dashboard.tsx
 * @description Dashboard component handles the display of navigation and logged in user
 */

import Nav from "@/components/Nav";

/**
 * @component
 * @returns {React.ReactElement}
 * @example
 * ```tsx
 * <Dashboard />
 * ```
 */
export default function Dashboard() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8  items-center">We Are In</main>

      {/* Show Navigation */}
      <Nav />

      {/* Show whos is logged in */}
    </div>
  );
}
