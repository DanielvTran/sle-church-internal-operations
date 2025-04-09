import { z } from "zod";

export const eventSchema = z.object({
  eventName: z
    .string()
    .trim()
    .min(2, "Title must contain at least two characters")
    .max(50, "Title must be less than 50 characters long")
    .refine((value) => value.trim().length > 0, {
      message: "Title cannot be empty or only spaces.",
    })
    .refine((value) => /^[A-Za-z0-9 ]+$/.test(value), {
      message: "Title can only contain letters, numbers.",
    }),
  eventDate: z.date(),
  startTime: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid time format. Use HH:mm.",
  }),
  endTime: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid time format. Use HH:mm.",
  }),
  description: z.string(),
  location: z.string(),
  tags: z.array(z.string()),
});
