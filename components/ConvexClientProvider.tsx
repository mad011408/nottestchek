"use client";

import { ReactNode, useState } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth } from "convex/react";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";
import { useAuthFromAuthKit } from "@/lib/auth/use-auth-from-authkit";

const noop = () => {};

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  // Always render children without Convex/AuthKit for now to avoid crashes
  return <>{children}</>;
}
