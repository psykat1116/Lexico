import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { challengeOptions } from "@/db/schema";

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ optionId: number }> }
) {
  const optionId = (await params).optionId;

  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, optionId),
  });

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ optionId: number }> }
) {
  const optionId = (await params).optionId;

  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(challengeOptions)
    .set({
      ...body,
    })
    .where(eq(challengeOptions.id, optionId))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ optionId: number }> }
) {
  const optionId = (await params).optionId;

  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db
    .delete(challengeOptions)
    .where(eq(challengeOptions.id, optionId))
    .returning();

  return NextResponse.json(data[0]);
}
