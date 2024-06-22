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
