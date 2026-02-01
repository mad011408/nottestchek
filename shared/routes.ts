import { z } from "zod";
import { insertChatSessionSchema, insertMessageSchema, chatSessions, messages, MODELS } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  sessions: {
    list: {
      method: 'GET' as const,
      path: '/api/sessions',
      responses: {
        200: z.array(z.custom<typeof chatSessions.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/sessions',
      input: insertChatSessionSchema,
      responses: {
        201: z.custom<typeof chatSessions.$inferSelect>(),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/sessions/:id',
      responses: {
        200: z.custom<typeof chatSessions.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/sessions/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    }
  },
  messages: {
    list: {
      method: 'GET' as const,
      path: '/api/sessions/:sessionId/messages',
      responses: {
        200: z.array(z.custom<typeof messages.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/sessions/:sessionId/messages',
      input: insertMessageSchema,
      responses: {
        201: z.custom<typeof messages.$inferSelect>(),
      },
    }
  },
  chat: {
    completion: {
      method: 'POST' as const,
      path: '/api/chat/completions',
      input: z.object({
        message: z.string(),
        model: z.enum(MODELS),
        systemPrompt: z.string().optional(),
        history: z.array(z.object({
          role: z.enum(['system', 'user', 'assistant']),
          content: z.string()
        })).optional(),
        sessionId: z.number().optional()
      }),
      responses: {
        200: z.object({
          role: z.string(),
          content: z.string(),
          model: z.string()
        }),
        500: errorSchemas.internal
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
