"use server";

import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUnit({ data }: { data: Prisma.UnitCreateInput }) {
  try {
    const newUnit = await prisma.unit.create({ data });
    return newUnit;
  } catch (error) {
    console.error("error creating unit", error);
    throw new Error("error creating unit");
  }
}

export async function updateUnit({
  id,
  data,
}: {
  id: number;
  data: Prisma.UnitUpdateInput;
}) {
  try {
    const updateUnit = await prisma.unit.update({
      where: { id: id.toString() },
      data,
    });
    return updateUnit;
  } catch (error) {
    console.error("error updating unit", error);
    throw new Error("error updating unit");
  }
}
