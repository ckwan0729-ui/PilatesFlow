import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Class, Movement } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Save, Copy, Calendar } from "lucide-react";
import { format, addMinutes } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import SequenceBuilder from "./sequence-builder";

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: Class | null;
  templateData?: any;
  onSaveAsTemplate?: (classData: Class) => void;
}

export default function ClassModal({ isOpen, onClose, classData, templateData, onSaveAsTemplate }: ClassModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    maxParticipants: "",
    isRecurring: false,
    recurrencePattern: "none",
    recurrenceDays: [] as number[],
    recurrenceEndDate: "",
    level: "All Levels",
    category: "Regular",
    roomLocation: "",
    equipment: [] as string[],
    sequence: [] as string[]
  });

  const { data: movements = [] } = useQuery<Movement[]>({
    queryKey: ["/api/movements"],
  });

  useEffect(() => {
    const today = new Date();
    
    if (classData) {
      setFormData({
        ...formData,
        title: classData.title,
        date: format(new Date(classData.startTime), "yyyy-MM-dd"),
        startTime: format(new Date(classData.startTime), "HH:mm"),
        endTime: format(new Date(classData.endTime), "HH:mm"),
        description: classData.description || "",
        maxParticipants: classData.maxParticipants?.toString() || "",
        isRecurring: classData.isRecurring === 1,
        recurrencePattern: classData.recurrencePattern || "none",
        recurrenceDays: classData.recurrenceDays || [],
        recurrenceEndDate: classData.recurrenceEndDate ? format(new Date(classData.recurrenceEndDate), "yyyy-MM-dd") : "",
        level: classData.level || "All Levels",
        category: classData.category || "Regular",
        roomLocation: classData.roomLocation || "",
        equipment: classData.equipment || [],
        sequence: classData.sequence || []
      });
    } else if (templateData) {
      setFormData({
        ...formData,
        title: templateData.name || "",
        date: format(today, "yyyy-MM-dd"),
        startTime: "09:00",
        endTime: "10:00",
        description: templateData.description || "",
        level: templateData.level || "All Levels",
        category: templateData.category || "Regular",
        sequence: templateData.sequence || []
      });
    } else {
      setFormData({
        ...formData,
        date: format(today, "yyyy-MM-dd"),
        startTime: "09:00",
        endTime: "10:00"
      });
    }
  }, [classData, templateData]);

  const createMutation = useMutation({
    mutationFn: (newClass: Partial<Class>) => {
      return apiRequest("POST", "/api/classes", newClass);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/classes"] });
      toast({
        title: "Success",
        description: "Class created successfully",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create class",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedClass: Partial<Class>) => {
      return apiRequest("PUT", `/api/classes/${classData?.id}`, updatedClass);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/classes"] });
      toast({
        title: "Success",
        description: "Class updated successfully",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update class",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.date}T${formData.endTime}`);
    
    const newClassData = {
      title: formData.title.trim(),
      startTime: startDateTime,
      endTime: endDateTime,
      description: formData.description?.trim() || null,
      maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : null,
      isRecurring: formData.isRecurring ? 1 : 0,
      recurrencePattern: formData.isRecurring ? formData.recurrencePattern : null,
      recurrenceDays: formData.isRecurring ? formData.recurrenceDays : [],
      recurrenceEndDate: formData.recurrenceEndDate ? new Date(formData.recurrenceEndDate) : null,
      level: formData.level,
      category: formData.category,
      roomLocation: formData.roomLocation?.trim() || null,
      equipment: formData.equipment,
      sequence: formData.sequence
    };

    if (classData) {
      updateMutation.mutate(newClassData);
    } else {
      createMutation.mutate(newClassData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{classData ? "Edit Class" : "New Class"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => setFormData({ ...formData, level: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="All Levels">All Levels</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Regular">Regular</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Special">Special</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isRecurring"
                checked={formData.isRecurring}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, isRecurring: checked as boolean })
                }
              />
              <Label htmlFor="isRecurring">Recurring Class</Label>
            </div>
          </div>

          {formData.isRecurring && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recurrencePattern">Recurrence Pattern</Label>
                <Select
                  value={formData.recurrencePattern}
                  onValueChange={(value) => setFormData({ ...formData, recurrencePattern: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Recurrence Days</Label>
                <div className="flex space-x-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                    <div key={day} className="flex items-center space-x-1">
                      <Checkbox
                        id={`day-${index}`}
                        checked={formData.recurrenceDays.includes(index)}
                        onCheckedChange={(checked) => {
                          const newDays = checked
                            ? [...formData.recurrenceDays, index]
                            : formData.recurrenceDays.filter(d => d !== index);
                          setFormData({ ...formData, recurrenceDays: newDays });
                        }}
                      />
                      <Label htmlFor={`day-${index}`}>{day}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recurrenceEndDate">End Date</Label>
                <Input
                  id="recurrenceEndDate"
                  type="date"
                  value={formData.recurrenceEndDate}
                  onChange={(e) => setFormData({ ...formData, recurrenceEndDate: e.target.value })}
                  min={formData.date}
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="maxParticipants">Max Participants</Label>
            <Input
              id="maxParticipants"
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roomLocation">Room/Location</Label>
            <Input
              id="roomLocation"
              value={formData.roomLocation}
              onChange={(e) => setFormData({ ...formData, roomLocation: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Equipment Required</Label>
            <div className="flex flex-wrap gap-2">
              {["Reformer", "Cadillac", "Chair", "Barrel", "Mat", "Props"].map((item) => (
                <div key={item} className="flex items-center space-x-1">
                  <Checkbox
                    id={`equipment-${item}`}
                    checked={formData.equipment.includes(item)}
                    onCheckedChange={(checked) => {
                      const newEquipment = checked
                        ? [...formData.equipment, item]
                        : formData.equipment.filter(e => e !== item);
                      setFormData({ ...formData, equipment: newEquipment });
                    }}
                  />
                  <Label htmlFor={`equipment-${item}`}>{item}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Sequence Builder</Label>
            <SequenceBuilder
              sequence={formData.sequence}
              movements={movements}
              allMovements={movements}
              onSequenceChange={(newSequence) => setFormData({ ...formData, sequence: newSequence })}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            {!classData && (
              <Button
                type="button"
                variant="outline"
                onClick={() => onSaveAsTemplate?.(formData as any)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Save as Template
              </Button>
            )}
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              {classData ? "Update" : "Create"} Class
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
