import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prismaClient";
import { Event } from "@prisma/client";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Parse the JSON request body
    const data: Event = await req.json();

    // Destructure the data
    const { eventName, eventDate, startTime, endTime, description, location, tags } = data;

    // Check if all the required fields are provided
    if (!eventName || !eventDate || !startTime || !endTime || !description || !location || !tags) {
      return NextResponse.json({ error: "Please provide all the required fields" }, { status: 400 });
    }

    // Check if the event already exists
    const eventExists = await prisma.event.findFirst({
      where: {
        eventName,
      },
    });

    if (eventExists) {
      return NextResponse.json({ error: "Event already exists" }, { status: 400 });
    }

    // Create event
    const newEvent = await prisma.event.create({
      data: {
        eventName,
        eventDate,
        startTime,
        endTime,
        description,
        location,
        tags: JSON.stringify(tags),
        updatedAt: new Date(),
      },
    });

    // Return categories data
    return NextResponse.json(newEvent, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
