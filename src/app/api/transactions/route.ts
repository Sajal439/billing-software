import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const partyId = searchParams.get("partyId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  let whereClause: any = {};

  if (partyId) {
    whereClause.partyId = parseInt(partyId);
  }

  if (startDate) {
    whereClause.data = {
      ...whereClause.data,
      gte: new Date(startDate),
    };
  }
  if (endDate) {
    whereClause.data = {
      ...whereClause.data,
      lte: new Date(endDate),
    };
  }
  const transactions = await prisma.transaction.findMany({
    where: whereClause,
    include: {
      party: true,
    },
    orderBy: { date: "asc" },
  });

  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  const body = await request.json();
  const transaction = await prisma.transaction.create({
    data: {
      date: new Date(body.date),
      description: body.description,
      debit: body.debit,
      credit: body.credit,
      partyId: body.partyId,
    },
  });

  return NextResponse.json(transaction, { status: 200 });
}
