import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function TopNav() {
  return (
    <nav className="items-between mb-4 flex w-full justify-between bg-gray-800 p-4 text-xl font-semibold text-white">
      <div className="flex w-full justify-between">
        <a href="/">Galery</a>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
