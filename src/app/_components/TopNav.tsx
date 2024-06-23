"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";
import { MultiUploader } from "./simple-upload-button";

export function TopNav() {
  const router = useRouter();
  return (
    <nav className="items-between mb-4 flex w-full justify-between bg-gray-800 p-4 text-xl font-semibold text-white">
      <div className="flex w-full justify-between">
        <a href="/">Galery</a>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <div className="flex items-center justify-center gap-3">
              {/* <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={() => router.refresh()}
              /> */}
              <MultiUploader></MultiUploader>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
