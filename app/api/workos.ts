import { WorkOS } from "@workos-inc/node";

let cachedWorkOS: WorkOS | null = null;

export const getWorkOS = (): WorkOS => {
  if (cachedWorkOS) return cachedWorkOS;
  const apiKey = process.env.WORKOS_API_KEY;
  if (!apiKey) {
    throw new Error("Missing WORKOS_API_KEY");
  }
  cachedWorkOS = new WorkOS(apiKey);
  return cachedWorkOS;
};
