import { db } from "./db";
import {
  chatSessions,
  messages,
  type InsertChatSession,
  type InsertMessage,
  type ChatSession,
  type Message
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Sessions
  createSession(session: InsertChatSession): Promise<ChatSession>;
  getSessions(): Promise<ChatSession[]>;
  getSession(id: number): Promise<ChatSession | undefined>;
  deleteSession(id: number): Promise<void>;

  // Messages
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(sessionId: number): Promise<Message[]>;
}

export class DatabaseStorage implements IStorage {
  async createSession(session: InsertChatSession): Promise<ChatSession> {
    const [newSession] = await db.insert(chatSessions).values(session).returning();
    return newSession;
  }

  async getSessions(): Promise<ChatSession[]> {
    return await db.select().from(chatSessions).orderBy(desc(chatSessions.createdAt));
  }

  async getSession(id: number): Promise<ChatSession | undefined> {
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.id, id));
    return session;
  }

  async deleteSession(id: number): Promise<void> {
    await db.delete(messages).where(eq(messages.sessionId, id));
    await db.delete(chatSessions).where(eq(chatSessions.id, id));
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async getMessages(sessionId: number): Promise<Message[]> {
    return await db.select().from(messages).where(eq(messages.sessionId, sessionId)).orderBy(messages.createdAt);
  }
}

export const storage = new DatabaseStorage();
