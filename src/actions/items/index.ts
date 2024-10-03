"use server";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function createItem({ data }: { data: Prisma.ItemCreateInput }) {
  prisma.item.create({ data });
}
