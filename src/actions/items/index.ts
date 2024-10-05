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

export async function updateItem({
  id,
  data,
}: {
  id: string;
  data: Prisma.ItemUpdateInput;
}) {
  try {
    const updateItem = await prisma.item.update({
      where: { id },
      data,
    });
    return updateItem;
  } catch (error) {
    console.error("error updating item", error);
    throw new Error("error updating item");
  }
}

export async function getItembyId({ id }: { id: string }) {
  try {
    const item = await prisma.item.findUnique({
      where: { id },
    });
    return item;
  } catch (error) {
    console.error("error getting item", error);
    throw new Error("error getting item");
  }
}

export async function getAllItems() {
  try {
    const items = await prisma.item.findMany();
    return items;
  } catch (error) {
    console.error("error getting items", error);
    throw new Error("error getting items");
  }
}

export async function deleteItem({ id }: { id: string }) {
  try {
    const deleteItem = await prisma.item.delete({
      where: { id },
    });
    return deleteItem;
  } catch (error) {
    console.error("error deleting item", error);
    throw new Error("error deleting item");
  }
}
