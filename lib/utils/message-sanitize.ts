import { UIMessage } from "ai";

export const sanitizeUIMessagesForModel = (messages: UIMessage[]): UIMessage[] =>
  (Array.isArray(messages) ? messages : [])
    .map((message) => {
      const parts = Array.isArray((message as any)?.parts)
        ? (message as any).parts
        : [];
      const sanitizedParts = parts.filter((part: any) => {
        const type = part?.type;
        return !(typeof type === "string" && type.startsWith("data-"));
      });
      if (sanitizedParts.length === 0) return null;
      return { ...message, parts: sanitizedParts };
    })
    .filter(Boolean) as UIMessage[];
