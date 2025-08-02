import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMovementSchema, insertClassSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Movement routes
  app.get("/api/movements", async (_req, res) => {
    try {
      const movements = await storage.getMovements();
      res.json(movements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch movements" });
    }
  });

  app.get("/api/movements/:id", async (req, res) => {
    try {
      const movement = await storage.getMovement(req.params.id);
      if (!movement) {
        return res.status(404).json({ message: "Movement not found" });
      }
      res.json(movement);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch movement" });
    }
  });

  app.post("/api/movements", async (req, res) => {
    try {
      const movementData = insertMovementSchema.parse(req.body);
      const movement = await storage.createMovement(movementData);
      res.status(201).json(movement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid movement data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create movement" });
    }
  });

  app.put("/api/movements/:id", async (req, res) => {
    try {
      const movementData = insertMovementSchema.partial().parse(req.body);
      const movement = await storage.updateMovement(req.params.id, movementData);
      if (!movement) {
        return res.status(404).json({ message: "Movement not found" });
      }
      res.json(movement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid movement data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update movement" });
    }
  });

  app.delete("/api/movements/:id", async (req, res) => {
    try {
      const success = await storage.deleteMovement(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Movement not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete movement" });
    }
  });

  // Class routes
  app.get("/api/classes", async (_req, res) => {
    try {
      const classes = await storage.getClasses();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch classes" });
    }
  });

  app.get("/api/classes/date/:date", async (req, res) => {
    try {
      const classes = await storage.getClassesByDate(req.params.date);
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch classes for date" });
    }
  });

  app.get("/api/classes/:id", async (req, res) => {
    try {
      const classData = await storage.getClass(req.params.id);
      if (!classData) {
        return res.status(404).json({ message: "Class not found" });
      }
      res.json(classData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch class" });
    }
  });

  app.post("/api/classes", async (req, res) => {
    try {
      const classData = insertClassSchema.parse(req.body);
      const newClass = await storage.createClass(classData);
      res.status(201).json(newClass);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid class data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create class" });
    }
  });

  app.put("/api/classes/:id", async (req, res) => {
    try {
      const classData = insertClassSchema.partial().parse(req.body);
      const updatedClass = await storage.updateClass(req.params.id, classData);
      if (!updatedClass) {
        return res.status(404).json({ message: "Class not found" });
      }
      res.json(updatedClass);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid class data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update class" });
    }
  });

  app.delete("/api/classes/:id", async (req, res) => {
    try {
      const success = await storage.deleteClass(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Class not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete class" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
