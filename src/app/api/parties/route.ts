import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import next from "next";

const prisma = new PrismaClient();

export async function Get() {
  const parties = await prisma.party.findMany();
  return NextResponse.json(parties);
}

export async function Post(request: Request) {
  const body = await request.json();
  const party = await prisma.party.create({
    data: {
      name: body.name,
      mobile: body.mobile,
      address: body.address,
    },
  });

  return NextResponse.json(party, { status: 200 });
}
