import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { optionId: number } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, params.optionId),
  });

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { optionId: number } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(challengeOptions)
    .set({
      ...body,
    })
    .where(eq(challengeOptions.id, params.optionId))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: Request,
  { params }: { params: { optionId: number } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db
    .delete(challengeOptions)
    .where(eq(challengeOptions.id, params.optionId))
    .returning();

  return NextResponse.json(data[0]);
}
