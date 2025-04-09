import { z } from "zod";
import { eventSchema } from "@/lib/validationSchema";

export interface Event {
  eventName: string;
  eventDate: Date;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  tags: string[];
}

export type EventFormType = z.infer<typeof eventSchema>;
