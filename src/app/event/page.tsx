/**
 * @file page.tsx Events
 * @description Events page component that serves as the main entry point for managing events.
 * This component is automatically mapped to the `/events` route in a Next.js application.
 */

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useForm, FormProvider } from "react-hook-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { eventDefaultValues } from "@/lib/config";

/**
 * Events Page Component
 *
 * This component represents the `/events` page in a Next.js application.
 * When a user visits `/events`, this page is rendered.
 *
 * ## Route Mapping
 * - Located at `app/events/page.tsx`
 * - Available at `/events`
 *
 * ## Usage
 * This is a Next.js **route component** and is not imported manually.
 * Instead, users can visit the `/events` route directly in a browser.
 *
 * ### Navigation Examples:
 * - Manually entering the URL in the browser:
 *   `http://localhost:3000/events`
 *
 * - Using Next.js `<Link>` component:
 *   ```tsx
 *   import Link from "next/link";
 *   <Link href="/events">Go to Events</Link>
 *   ```
 *
 * - Navigating programmatically using `useRouter`:
 *   ```tsx
 *   import { useRouter } from "next/navigation";
 *   const router = useRouter();
 *   router.push("/events");
 *   ```
 *
 * @component
 * @returns {JSX.Element} The rendered events management page.
 */
export default function Event(): React.ReactElement {
  const form = useForm({
    defaultValues: eventDefaultValues,
  });

  return (
    <div>
      <h1>Event</h1>

      <FormProvider {...form}>
        <Popover>
          <PopoverTrigger asChild>
            <FontAwesomeIcon icon={faCirclePlus} className="w-8 h-8 hover:cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              {/* Event Name Field */}
              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Youth Group" {...field} />
                    </FormControl>
                    <FormDescription>Enter the name of your event.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Event Date Field */}
              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Event</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <FontAwesomeIcon icon={faCalendar} className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Select the date of the event.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </PopoverContent>
        </Popover>
      </FormProvider>
    </div>
  );
}
