import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Set a high timeout for the server to accommodate long AI responses
  httpServer.setTimeout(1700 * 1000);

  // Session routes
  app.get(api.sessions.list.path, async (req, res) => {
    const sessions = await storage.getSessions();
    res.json(sessions);
  });

  app.post(api.sessions.create.path, async (req, res) => {
    const input = api.sessions.create.input.parse(req.body);
    const session = await storage.createSession(input);
    res.status(201).json(session);
  });

  app.get(api.sessions.get.path, async (req, res) => {
    const session = await storage.getSession(Number(req.params.id));
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  });

  app.delete(api.sessions.delete.path, async (req, res) => {
    await storage.deleteSession(Number(req.params.id));
    res.status(204).send();
  });

  // Message routes
  app.get(api.messages.list.path, async (req, res) => {
    const messages = await storage.getMessages(Number(req.params.sessionId));
    res.json(messages);
  });

  app.post(api.messages.create.path, async (req, res) => {
    const input = api.messages.create.input.parse(req.body);
    const message = await storage.createMessage(input);
    res.status(201).json(message);
  });

  // Chat completion route
  app.post(api.chat.completion.path, async (req, res) => {
    try {
      const input = api.chat.completion.input.parse(req.body);
      const { message, model, systemPrompt, history, sessionId } = input;

      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        return res.status(500).json({ message: "API Key not configured on server" });
      }

      // Prepare messages for the API
      const apiMessages = [];
      
      if (systemPrompt) {
        apiMessages.push({ role: "system", content: systemPrompt });
      } else {
        // Default system prompt if none provided, or user can set one
        apiMessages.push({ role: "system", content: "You are a helpful AI assistant." });
      }

      if (history) {
        apiMessages.push(...history);
      }

      apiMessages.push({ role: "user", content: message });

      // Call external API
      const response = await fetch("https://go.trybons.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: apiMessages,
          max_tokens: 120000,
          stream: false // Using non-streaming for simplicity as requested "very fast response" usually implies stream but zip had "extract" so maybe they want simple. I'll stick to non-stream for stability unless stream requested. User said "fast response" -> Streaming is perceived faster. But I'll do non-stream for MVP stability first.
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        return res.status(500).json({ message: `External API Error: ${response.statusText}`, details: errorText });
      }

      const data = await response.json();
      const assistantMessageContent = data.choices?.[0]?.message?.content || "";

      // Save messages if sessionId is provided
      if (sessionId) {
        await storage.createMessage({
          sessionId,
          role: "user",
          content: message,
          model: model
        });

        const savedAssistantMessage = await storage.createMessage({
          sessionId,
          role: "assistant",
          content: assistantMessageContent,
          model: model
        });
        
        // Return the saved message structure
        res.json({
          role: "assistant",
          content: assistantMessageContent,
          model: model
        });
      } else {
         // Just return response if no session (ephemeral)
         res.json({
          role: "assistant",
          content: assistantMessageContent,
          model: model
        });
      }

    } catch (error) {
      console.error("Chat Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return httpServer;
}

// Seed function
async function seedDatabase() {
  const sessions = await storage.getSessions();
  if (sessions.length === 0) {
    const session = await storage.createSession({ title: "Welcome Chat" });
    await storage.createMessage({
      sessionId: session.id,
      role: "assistant",
      content: "Hello! I am your custom AI assistant. How can I help you today?",
      model: "gpt-5.2-pro-2025-12-11"
    });
  }
}

// Run seed
seedDatabase().catch(console.error);
