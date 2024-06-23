"use client";
import { useUser } from "@clerk/nextjs";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
  });
}
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PostHogProvider>
  );
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  const userInfo = useUser();
  if (userInfo.isSignedIn) {
    posthog.identify(userInfo.user.id, {
      email: userInfo.user.primaryEmailAddress?.emailAddress,
      username: userInfo.user.username,
      name: userInfo.user.fullName,
    });
  } else if (!userInfo.isSignedIn) {
    posthog.reset();
  }
  return children;
}
