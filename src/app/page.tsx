import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { getImages } from "~/server/query";

export const dynamic = "force-dynamic";

async function Images() {
  const { userId } = auth();

  const imgs = await getImages();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {imgs.map((image, index) => (
        <div className="flex w-48 flex-col" key={image.id}>
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              alt={image.name}
              width={480}
              height={480}
              style={{ objectFit: "contain" }}
              // fill
            />
            <p>{image.name}</p>
          </Link>
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
