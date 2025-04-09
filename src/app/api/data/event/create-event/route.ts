import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prismaClient";
import { EventFormType } from "../../../../../../lib/types";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Parse the JSON request body
    const data: EventFormType = await req.json();

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

    // Create or find tags based on tag values
    const tagRecords = await Promise.all(
      tags.map(async (tag: string) => {
        let tagRecord = await prisma.tag.findUnique({
          where: { name: tag }, // Match by tag name
        });

        // If tag doesn't exist, create it
        if (!tagRecord) {
          tagRecord = await prisma.tag.create({
            data: { value: tag.toLowerCase().replace(/\s+/g, ""), name: tag },
          });
        }

        return tagRecord;
      })
    );

    // Create the event with the associated tags
    const newEvent = await prisma.event.create({
      data: {
        eventName,
        eventDate,
        startTime,
        endTime,
        description,
        location,
        eventTags: {
          create: tagRecords.map((tag) => ({
            tagId: tag.id,
          })),
        },
        updatedAt: new Date(),
      },
      include: {
        eventTags: true,
      },
    });

    // Return categories data
    return NextResponse.json(newEvent, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
