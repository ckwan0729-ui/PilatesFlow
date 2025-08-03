import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMovementSchema, insertClassSchema, insertTemplateSchema } from "@shared/schema";
import { z } from "zod";
import * as multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage_config = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'photo-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage_config,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // File upload route
  app.post("/api/upload", upload.single('photo'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      // Return the file path relative to the public directory
      const filePath = `/uploads/${req.file.filename}`;
      res.json({ thumbnailUrl: filePath });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

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

  // Template routes
  app.get("/api/templates", async (_req, res) => {
    try {
      const templates = await storage.getTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });

  app.get("/api/templates/:id", async (req, res) => {
    try {
      const template = await storage.getTemplate(req.params.id);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch template" });
    }
  });

  app.post("/api/templates", async (req, res) => {
    try {
      const templateData = insertTemplateSchema.parse(req.body);
      const template = await storage.createTemplate(templateData);
      res.status(201).json(template);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid template data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create template" });
    }
  });

  app.put("/api/templates/:id", async (req, res) => {
    try {
      const templateData = insertTemplateSchema.partial().parse(req.body);
      const updatedTemplate = await storage.updateTemplate(req.params.id, templateData);
      if (!updatedTemplate) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.json(updatedTemplate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid template data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update template" });
    }
  });

  app.delete("/api/templates/:id", async (req, res) => {
    try {
      const success = await storage.deleteTemplate(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete template" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
