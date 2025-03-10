/**
 * @file Nav.tsx
 * @description Nav component that handles next link navigations to events page
 * Displays events page button link
 */

import React from "react";

import Link from "next/link";

/**
 * Nav components
 *
 * A nav bar that shows the button link to events page
 *
 * @component
 * @returns {React.ReactElement}
 * @example
 * ```tsx
 * <Nav />
 * ```
 */
export default function Nav(): React.ReactElement {
  return (
    <nav className="p-4 bg-gray-100 shadow-md">
      <ul className="flex gap-4">
        <li>
          <Link href="/event" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Events
          </Link>
        </li>
      </ul>
    </nav>
  );
}
