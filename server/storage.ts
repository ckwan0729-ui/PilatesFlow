import { type Movement, type InsertMovement, type Class, type InsertClass, type Template, type InsertTemplate } from "@shared/schema";
import { randomUUID } from "crypto";
import { sampleMovements } from "../client/src/lib/sample-movements";

export interface IStorage {
  // Movement operations
  getMovements(): Promise<Movement[]>;
  getMovement(id: string): Promise<Movement | undefined>;
  createMovement(movement: InsertMovement): Promise<Movement>;
  updateMovement(id: string, movement: Partial<InsertMovement>): Promise<Movement | undefined>;
  deleteMovement(id: string): Promise<boolean>;

  // Class operations
  getClasses(): Promise<Class[]>;
  getClass(id: string): Promise<Class | undefined>;
  createClass(classData: InsertClass): Promise<Class>;
  updateClass(id: string, classData: Partial<InsertClass>): Promise<Class | undefined>;
  deleteClass(id: string): Promise<boolean>;
  getClassesByDate(date: string): Promise<Class[]>;

  // Template operations
  getTemplates(): Promise<Template[]>;
  getTemplate(id: string): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  updateTemplate(id: string, template: Partial<InsertTemplate>): Promise<Template | undefined>;
  deleteTemplate(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private movements: Map<string, Movement>;
  private classes: Map<string, Class>;
  private templates: Map<string, Template>;

  constructor() {
    this.movements = new Map();
    this.classes = new Map();
    this.templates = new Map();
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Load Polestar Pilates movements
    sampleMovements.forEach(movement => {
      const id = randomUUID();
      this.movements.set(id, { ...movement, id, isPolestar: 1 });
    });
  }

  // Movement operations
  async getMovements(): Promise<Movement[]> {
    return Array.from(this.movements.values());
  }

  async getMovement(id: string): Promise<Movement | undefined> {
    return this.movements.get(id);
  }

  async createMovement(movement: InsertMovement): Promise<Movement> {
    const id = randomUUID();
    const newMovement: Movement = { 
      ...movement, 
      id, 
      isPolestar: 0,
      // Handle optional fields with proper defaults
      thumbnailUrl: movement.thumbnailUrl || null,
      description: movement.description || null,
      duration: movement.duration || null,
      breathingPattern: movement.breathingPattern || null,
      // Ensure arrays are properly initialized
      tags: movement.tags || [],
      benefits: movement.benefits || [],
      contraindications: movement.contraindications || [],
      modifications: movement.modifications || [],
      equipment: movement.equipment || [],
      muscleGroups: movement.muscleGroups || [],
      instructions: movement.instructions || [],
      precautions: movement.precautions || [],
      precautionLevel: movement.precautionLevel || 'Low',
    };
    this.movements.set(id, newMovement);
    return newMovement;
  }

  async updateMovement(id: string, movement: Partial<InsertMovement>): Promise<Movement | undefined> {
    const existing = this.movements.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...movement };
    this.movements.set(id, updated);
    return updated;
  }

  async deleteMovement(id: string): Promise<boolean> {
    return this.movements.delete(id);
  }

  // Class operations
  async getClasses(): Promise<Class[]> {
    return Array.from(this.classes.values());
  }

  async getClass(id: string): Promise<Class | undefined> {
    return this.classes.get(id);
  }

  async createClass(classData: InsertClass): Promise<Class> {
    const id = randomUUID();
    const newClass: Class = { 
      ...classData, 
      id, 
      createdAt: new Date(),
      notes: classData.notes || null,
      sequence: (classData.sequence || []) as string[],
      // Ensure `category` and `description` are always defined or null.
      category: classData.category || null,
      description: classData.description || null,
      equipment: classData.equipment || null, // Ensure `equipment` is always defined or null
    };
    this.classes.set(id, newClass);
    return newClass;
  }

  async updateClass(id: string, classData: Partial<InsertClass>): Promise<Class | undefined> {
    const existing = this.classes.get(id);
    if (!existing) return undefined;
    
    const updated = { 
      ...existing, 
      ...classData,
      sequence: classData.sequence ? (classData.sequence as string[]) : existing.sequence
    };
    this.classes.set(id, updated);
    return updated;
  }

  async deleteClass(id: string): Promise<boolean> {
    return this.classes.delete(id);
  }

  async getClassesByDate(date: string): Promise<Class[]> {
    return Array.from(this.classes.values()).filter(c => c.date === date);
  }

  // Template operations
  async getTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }

  async getTemplate(id: string): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async createTemplate(template: InsertTemplate): Promise<Template> {
    const id = randomUUID();
    const newTemplate: Template = { 
      ...template, 
      id, 
      createdAt: new Date(),
      sequence: (template.sequence || []) as string[],
      tags: template.tags || [],
      // Ensure `description` is always defined or null.
      description: template.description || null,
    };
    this.templates.set(id, newTemplate);
    return newTemplate;
  }

  async updateTemplate(id: string, template: Partial<InsertTemplate>): Promise<Template | undefined> {
    const existing = this.templates.get(id);
    if (!existing) return undefined;
    
    const updated = { 
      ...existing, 
      ...template,
      sequence: template.sequence ? (template.sequence as string[]) : existing.sequence,
      tags: template.tags ? template.tags : existing.tags
    };
    this.templates.set(id, updated);
    return updated;
  }

  async deleteTemplate(id: string): Promise<boolean> {
    return this.templates.delete(id);
  }
}

export const storage = new MemStorage();
