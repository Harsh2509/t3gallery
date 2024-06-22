import "server-only";
import { db } from "./db";
import { images } from "./db/schema";
import { sql } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export const getImages = async () => {
  const { userId } = auth();

  const imgs = await db
    .select()
    .from(images)
    .where(sql`${images.userId} = ${userId}`);

  return imgs;
};

export const getImage = async (id: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Not authenticated");
  }

  const img = await db
    .select()
    .from(images)
    .where(sql`${images.id} = ${id}`);

  if (!img || img.length === 0 || img[0] == undefined) {
    throw new Error("Image not found");
  } else if (img[0].userId !== userId) {
    throw new Error("Unauthorized");
  }

  return img[0];
};
