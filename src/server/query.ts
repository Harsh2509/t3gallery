import "server-only";
import { db } from "./db";
import { images } from "./db/schema";
import { sql } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";

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
    return redirect("/");
  } else if (img[0].userId !== userId) {
    throw new Error("Unauthorized");
  }

  return img[0];
};

/**
 * Deletes an image with the specified ID.
 * Throws an error if the user is not authenticated, the image is not found, or the user is unauthorized.
 * @param id - The ID of the image to delete.
 */
export const deleteImage = async (id: string) => {
  const { userId } = auth();
  analyticsServerClient.capture({
    distinctId: userId!,
    event: "delete image",
    properties: {
      imageId: id,
    },
  });

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const img = await db
    .select()
    .from(images)
    .where(sql`${images.id} = ${id}`);

  if (!img || img.length === 0 || img[0] == undefined) {
    return redirect("/");
  } else if (img[0].userId !== userId) {
    throw new Error("Unauthorized");
  }
  await db
    .delete(images)
    .where(sql`${images.id} = ${id} and ${images.userId} = ${userId}`);

  redirect("/");
};
