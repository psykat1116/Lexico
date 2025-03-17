import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { courseId: number } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, params.courseId),
  });

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { courseId: number } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(courses)
    .set({
      ...body,
    })
    .where(eq(courses.id, params.courseId))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: number } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db
    .delete(courses)
    .where(eq(courses.id, params.courseId))
    .returning();

  return NextResponse.json(data[0]);
}
