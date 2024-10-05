"use server";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createAccount({
  data,
}: {
  data: Prisma.UnitCreateInput;
}) {
  try {
    const newAccount = await prisma.unit.create({ data });
    return newAccount;
  } catch (error) {
    console.error("error creating account", error);
    throw new Error("error creating account");
  }
}
