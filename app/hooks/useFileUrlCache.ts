import { useEffect, useRef, useCallback } from "react";
// import { useAction } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
import { isSupportedImageMediaType } from "@/lib/utils/file-utils";
import type { ChatMessage } from "@/types";

interface CachedUrl {
  url: string;
  timestamp: number;
}

const URL_CACHE_EXPIRATION = 50 * 60 * 1000; // 50 minutes (S3 URLs expire in 1 hour)

/**
 * Hook to manage prefetching and caching of file URLs
 *
 * Features:
 * - Batch prefetches URLs for all S3 image files in messages (images need eager loading)
 * - Caches URLs with expiration handling (50 min, before 1 hour S3 expiry)
 * - Provides methods to get and set cached URLs (for lazy-loaded non-image files)
 * - Automatically cleans up expired URLs
 */
export function useFileUrlCache(messages: ChatMessage[]) {
  const getFileUrlsBatchAction = null;
  const urlCacheRef = useRef<Map<string, CachedUrl>>(new Map());
  const prefetchedIdsRef = useRef<Set<string>>(new Set());

  // Get cached URL for a file (returns null if expired or not cached)
  const getCachedUrl = useCallback((fileId: string): string | null => {
    const cached = urlCacheRef.current.get(fileId);
    if (!cached) return null;

    // Check if URL has expired
    const now = Date.now();
    if (now - cached.timestamp > URL_CACHE_EXPIRATION) {
      urlCacheRef.current.delete(fileId);
      prefetchedIdsRef.current.delete(fileId);
      return null;
    }

    return cached.url;
  }, []);

  // Set/update cached URL for a file (used for lazy-loaded non-image files)
  const setCachedUrl = useCallback((fileId: string, url: string) => {
    const now = Date.now();
    urlCacheRef.current.set(fileId, { url, timestamp: now });
    prefetchedIdsRef.current.add(fileId);
  }, []);

  // Prefetch image URLs for messages
  useEffect(() => {
    async function prefetchImageUrls() {
      return; // Convex disabled
    }

    prefetchImageUrls();
  }, [messages]);

  // Cleanup expired URLs periodically
  useEffect(() => {
    const cleanupInterval = setInterval(
      () => {
        const now = Date.now();
        const entriesToDelete: string[] = [];

        for (const [fileId, cached] of urlCacheRef.current.entries()) {
          if (now - cached.timestamp > URL_CACHE_EXPIRATION) {
            entriesToDelete.push(fileId);
          }
        }

        for (const fileId of entriesToDelete) {
          urlCacheRef.current.delete(fileId);
          prefetchedIdsRef.current.delete(fileId);
        }
      },
      5 * 60 * 1000,
    ); // Clean up every 5 minutes

    return () => clearInterval(cleanupInterval);
  }, []);

  return { getCachedUrl, setCachedUrl };
}
