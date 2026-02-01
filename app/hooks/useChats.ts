"use client";

import { useEffect } from "react";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { useGlobalState } from "../contexts/GlobalState";

/**
 * Custom hook to handle chat fetching and state management
 * Can be used by multiple components to ensure chats are loaded when needed
 */
export const useChats = (shouldFetch: boolean = true) => {
  const user = { id: "default-user" };
  const setChats = (chats: any) => {};

  // Stubbed paginated chats
  const paginatedChats = {
    results: [],
    status: "Exhausted" as const,
    loadMore: () => {},
  };

  return paginatedChats;
};
