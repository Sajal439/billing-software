"use server";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createItem({ data }: { data: Prisma.ItemCreateInput }) {
  try {
    // Assuming alternateUnitId should be checked, ensure it exists in the type
    if (data.altUnit && !data.altUnitConversion) {
      throw new Error(
        "conversion is required when alternateUnitId is provided"
      );
    }
    const newItem = await prisma.item.create({ data });
    return newItem;
  } catch (error) {
    console.error("error creating item", error);
    throw new Error("error creating item");
  }
}
