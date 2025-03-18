/**
 * @file page.tsx Events
 * @description Events page component that serves as the main entry point for managing events.
 * This component is automatically mapped to the `/events` route in a Next.js application.
 */

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { eventDefaultValues } from "@/lib/config";
import { eventSchema } from "@/lib/validationSchema";

// Helper functions
import { generateTimeOptions } from "@/lib/utils";

// Index
import { tagOptions } from "../../../lib";

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
  // Configure the form with default values and validation schema
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: eventDefaultValues,
  });

  const onSubmit = (data: any) => {
    console.log("Event created:", data);
  };

  return (
    <div>
      <h1>Event</h1>

      <Popover>
        <PopoverTrigger asChild>
          <FontAwesomeIcon icon={faCirclePlus} className="w-8 h-8 hover:cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="fixed top-1/2 left-1/2 w-[400px] p-6 bg-white shadow-lg rounded-lg transform -translate-x-1/2 -translate-y-1/2 z-50">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event</FormLabel>
                    <FormControl>
                      <Input placeholder="Youth Group" {...field} />
                    </FormControl>
                    <FormDescription>Choose an event name.</FormDescription>
                    <FormMessage />{" "}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <FontAwesomeIcon icon={faCalendar} className="w-6 h-6 mr-2" />
                          {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(selectedDate) => field.onChange(selectedDate)}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Select the date of the event.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Start Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {generateTimeOptions().map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the start time for the event.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="End Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {generateTimeOptions().map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the end time for the event.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Type your message here." {...field} />
                    </FormControl>
                    <FormDescription>Describe the event.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="83 Ryans Rd, St Lucia QLD 4067" {...field} />
                    </FormControl>
                    <FormDescription>Describe the event.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {tagOptions.map((tag) => (
                          <Badge
                            key={tag}
                            className={cn(
                              "cursor-pointer",
                              field.value.includes(tag) ? "bg-primary text-white" : "bg-gray-200 text-black"
                            )}
                            onClick={() => {
                              const newValue = field.value.includes(tag)
                                ? field.value.filter((t: string) => t !== tag) // Remove tag
                                : [...field.value, tag]; // Add tag

                              field.onChange(newValue);
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
