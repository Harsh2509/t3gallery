import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function Images() {
  const { userId } = auth();
  console.log(`User Id: ${userId}`);
  const imgs = await db
    .select()
    .from(images)
    .where(sql`${images.userId} = ${userId}`);
  console.log(JSON.stringify(imgs));
  return (
    <div className="flex flex-wrap gap-4">
      {imgs.map((image, index) => (
        <div className="flex w-48 flex-col" key={image.id}>
          <img src={image.url} alt="" />
          <p>{image.name}</p>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center align-middle text-xl">
          Please SignIn to access this.
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
