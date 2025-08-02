import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Class, Movement } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import SequenceBuilder from "./sequence-builder";

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: Class | null;
}

export default function ClassModal({ isOpen, onClose, classData }: ClassModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    duration: 60,
    level: "All Levels",
    notes: "",
    sequence: [] as string[]
  });

  const { data: movements = [] } = useQuery<Movement[]>({
    queryKey: ["/api/movements"],
  });

  useEffect(() => {
    if (classData) {
      setFormData({
        title: classData.title,
        date: classData.date,
        startTime: classData.startTime,
        duration: classData.duration,
        level: classData.level,
        notes: classData.notes || "",
        sequence: classData.sequence || []
      });
    } else {
      // Reset form for new class
      const today = new Date();
      setFormData({
        title: "",
        date: today.toISOString().split('T')[0],
        startTime: "09:00",
        duration: 60,
        level: "All Levels",
        notes: "",
        sequence: []
      });
    }
  }, [classData, isOpen]);

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/classes", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/classes"] });
      toast({ title: "Class created successfully" });
      onClose();
    },
    onError: () => {
      toast({ title: "Failed to create class", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("PUT", `/api/classes/${classData?.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/classes"] });
      toast({ title: "Class updated successfully" });
      onClose();
    },
    onError: () => {
      toast({ title: "Failed to update class", variant: "destructive" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({ title: "Please enter a class title", variant: "destructive" });
      return;
    }
    
    if (classData) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleCopyClass = () => {
    if (!classData) return;
    
    const newFormData = {
      ...formData,
      title: `${formData.title} (Copy)`,
      date: new Date().toISOString().split('T')[0]
    };
    setFormData(newFormData);
    toast({ title: "Class copied - modify details as needed" });
  };

  const formatDateTime = () => {
    if (!formData.date || !formData.startTime) return "Select date and time";
    
    const date = new Date(formData.date);
    const dateStr = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const [hours, minutes] = formData.startTime.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const timeStr = `${displayHour}:${minutes} ${ampm}`;
    
    const endTime = new Date();
    endTime.setHours(hour, parseInt(minutes) + formData.duration);
    const endHour = endTime.getHours();
    const endAmpm = endHour >= 12 ? 'PM' : 'AM';
    const endDisplayHour = endHour % 12 || 12;
    const endTimeStr = `${endDisplayHour}:${endTime.getMinutes().toString().padStart(2, '0')} ${endAmpm}`;
    
    return `${dateStr} • ${timeStr} - ${endTimeStr}`;
  };

  const sequenceMovements = movements.filter(m => formData.sequence.includes(m.id));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold ios-gray-dark">
                {classData ? formData.title || "Edit Class" : "New Class"}
              </DialogTitle>
              <p className="text-sm ios-gray mt-1">{formatDateTime()}</p>
            </div>
            <div className="flex items-center space-x-2">
              {classData && (
                <Button variant="outline" onClick={handleCopyClass} className="ios-blue border-ios-blue">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Class
                </Button>
              )}
              <Button 
                onClick={handleSubmit}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="bg-ios-blue hover:bg-blue-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Modal Content */}
        <div className="flex h-[600px] gap-6">
          {/* Class Details (Left Panel) */}
          <div className="w-1/3 border-r border-gray-200 pr-6 overflow-y-auto">
            <h4 className="font-semibold ios-gray-dark mb-4">Class Details</h4>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Class Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter class title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select 
                    value={formData.duration.toString()} 
                    onValueChange={(value) => setFormData({...formData, duration: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select 
                    value={formData.level} 
                    onValueChange={(value) => setFormData({...formData, level: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Levels">All Levels</SelectItem>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Class notes and modifications..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            </form>
          </div>

          {/* Movement Sequence (Right Panel) */}
          <div className="flex-1 overflow-y-auto">
            <SequenceBuilder
              sequence={formData.sequence}
              movements={sequenceMovements}
              allMovements={movements}
              onSequenceChange={(newSequence) => setFormData({...formData, sequence: newSequence})}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
