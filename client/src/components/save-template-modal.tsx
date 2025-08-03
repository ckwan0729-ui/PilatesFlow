import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Class, InsertTemplate, Movement } from "@shared/schema";

interface SaveTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceClass: Class | null;
}

export default function SaveTemplateModal({ isOpen, onClose, sourceClass }: SaveTemplateModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: movements = [] } = useQuery<Movement[]>({
    queryKey: ["/api/movements"],
  });
  
  const [templateData, setTemplateData] = useState<InsertTemplate>({
    name: "",
    description: "",
    level: sourceClass?.level || "",
    duration: sourceClass?.duration || 60,
    sequence: sourceClass?.sequence || [],
    tags: []
  });

  const [newTag, setNewTag] = useState("");

  const createMutation = useMutation({
    mutationFn: async (data: InsertTemplate) => {
      const response = await apiRequest("POST", "/api/templates", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/templates"] });
      toast({ title: "Template saved successfully" });
      resetForm();
      onClose();
    },
    onError: () => {
      toast({ title: "Failed to save template", variant: "destructive" });
    }
  });

  const resetForm = () => {
    setTemplateData({
      name: "",
      description: "",
      level: sourceClass?.level || "",
      duration: sourceClass?.duration || 60,
      sequence: sourceClass?.sequence || [],
      tags: []
    });
    setNewTag("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateData.name.trim()) {
      toast({ title: "Please enter a template name", variant: "destructive" });
      return;
    }
    createMutation.mutate(templateData);
  };

  const addTag = () => {
    if (newTag.trim() && !templateData.tags?.includes(newTag.trim())) {
      setTemplateData({
        ...templateData,
        tags: [...(templateData.tags || []), newTag.trim()]
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTemplateData({
      ...templateData,
      tags: templateData.tags?.filter(tag => tag !== tagToRemove) || []
    });
  };

  // Reset form when modal opens with new class data
  useEffect(() => {
    if (isOpen && sourceClass) {
      setTemplateData({
        name: `${sourceClass.title} Template`,
        description: `Template based on ${sourceClass.title} class`,
        level: sourceClass.level,
        duration: sourceClass.duration,
        sequence: sourceClass.sequence || [],
        tags: []
      });
    }
  }, [isOpen, sourceClass]);

  if (!sourceClass) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold ios-gray-dark">
            Save as Template
          </DialogTitle>
          <p className="text-sm ios-gray">
            Create a reusable template from "{sourceClass.title}"
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Template Name *</Label>
            <Input
              id="name"
              value={templateData.name}
              onChange={(e) => setTemplateData({...templateData, name: e.target.value})}
              placeholder="Enter template name"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={templateData.description || ""}
              onChange={(e) => setTemplateData({...templateData, description: e.target.value})}
              placeholder="Describe this template (optional)"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="level">Level</Label>
              <Input
                id="level"
                value={templateData.level}
                onChange={(e) => setTemplateData({...templateData, level: e.target.value})}
                placeholder="e.g., Beginner, Intermediate"
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={templateData.duration}
                onChange={(e) => setTemplateData({...templateData, duration: parseInt(e.target.value) || 60})}
                min="15"
                max="120"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <div className="flex items-center space-x-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag (e.g., core, beginner-friendly)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button
                type="button"
                size="sm"
                onClick={addTag}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {templateData.tags?.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Sequence Preview */}
          <div>
            <Label>Movement Sequence ({sourceClass.sequence?.length || 0} movements)</Label>
            <div className="bg-gray-50 rounded-lg p-4 max-h-32 overflow-y-auto">
              {sourceClass.sequence && sourceClass.sequence.length > 0 ? (
                <div className="space-y-1">
                  {sourceClass.sequence.map((movementId, index) => {
                    const movement = movements.find(m => m.id === movementId);
                    return (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <span className="w-6 h-6 bg-ios-blue text-white rounded-full flex items-center justify-center text-xs font-semibold">
                          {index + 1}
                        </span>
                        <span className="ios-gray">{movement?.name || `Movement ${movementId}`}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm ios-gray text-center">No movements in sequence</p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createMutation.isPending}
              className="bg-ios-blue hover:bg-blue-600"
            >
              {createMutation.isPending ? "Saving..." : "Save Template"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}