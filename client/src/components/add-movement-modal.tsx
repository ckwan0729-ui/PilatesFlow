import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { InsertMovement } from "@shared/schema";

interface AddMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMovementModal({ isOpen, onClose }: AddMovementModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<InsertMovement>({
    name: "",
    category: "",
    level: "",
    description: "",
    instructions: [],
    precautions: [],
    precautionLevel: "Low",
    duration: "",
    thumbnailUrl: "",
    tags: [],
    benefits: [],
    contraindications: [],
    modifications: [],
    equipment: [],
    muscleGroups: [],
    breathingPattern: ""
  });

  const [newInstruction, setNewInstruction] = useState("");
  const [newPrecaution, setNewPrecaution] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [newContraindication, setNewContraindication] = useState("");
  const [newModification, setNewModification] = useState("");
  const [newEquipment, setNewEquipment] = useState("");
  const [newMuscleGroup, setNewMuscleGroup] = useState("");

  const createMutation = useMutation({
    mutationFn: async (data: InsertMovement) => {
      const response = await apiRequest("POST", "/api/movements", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movements"] });
      toast({ title: "Movement created successfully" });
      resetForm();
      onClose();
    },
    onError: () => {
      toast({ title: "Failed to create movement", variant: "destructive" });
    }
  });

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      level: "",
      description: "",
      instructions: [],
      precautions: [],
      precautionLevel: "Low",
      duration: "",
      thumbnailUrl: "",
      tags: [],
      benefits: [],
      contraindications: [],
      modifications: [],
      equipment: [],
      muscleGroups: [],
      breathingPattern: ""
    });
    setNewInstruction("");
    setNewPrecaution("");
    setNewTag("");
    setNewBenefit("");
    setNewContraindication("");
    setNewModification("");
    setNewEquipment("");
    setNewMuscleGroup("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category || !formData.level) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    createMutation.mutate(formData);
  };

  const addListItem = (field: keyof InsertMovement, value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      const currentArray = (formData[field] as string[]) || [];
      setFormData({
        ...formData,
        [field]: [...currentArray, value.trim()]
      });
      setter("");
    }
  };

  const removeListItem = (field: keyof InsertMovement, index: number) => {
    const currentArray = (formData[field] as string[]) || [];
    setFormData({
      ...formData,
      [field]: currentArray.filter((_, i) => i !== index)
    });
  };

  const categories = ["Warm-up", "Core", "Lower Body", "Upper Body", "Full Body", "Stretching", "Cool-down"];
  const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];
  const precautionLevels = ["Low", "Moderate", "High"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold ios-gray-dark">Add New Movement</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Movement Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter movement name"
                required
              />
            </div>
            <div>
              <Label htmlFor="thumbnailUrl">import photo</Label>
              <Input
                id="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={(e) => setFormData({...formData, thumbnailUrl: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="level">Level *</Label>
              <Select value={formData.level} onValueChange={(value) => setFormData({...formData, level: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="precautionLevel">Risk Level</Label>
              <Select value={formData.precautionLevel} onValueChange={(value) => setFormData({...formData, precautionLevel: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  {precautionLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                placeholder="e.g., 3-5 minutes"
              />
            </div>
            <div>
              <Label htmlFor="breathingPattern">Breathing Pattern</Label>
              <Input
                id="breathingPattern"
                value={formData.breathingPattern}
                onChange={(e) => setFormData({...formData, breathingPattern: e.target.value})}
                placeholder="e.g., Exhale on effort, inhale on return"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Brief description of the movement"
              rows={3}
            />
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <div className="flex items-center space-x-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addListItem('tags', newTag, setNewTag);
                  }
                }}
              />
              <Button
                type="button"
                size="sm"
                onClick={() => addListItem('tags', newTag, setNewTag)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags?.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeListItem('tags', index)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Equipment */}
          <div>
            <Label>Equipment</Label>
            <div className="flex items-center space-x-2 mb-2">
              <Input
                value={newEquipment}
                onChange={(e) => setNewEquipment(e.target.value)}
                placeholder="Add equipment"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addListItem('equipment', newEquipment, setNewEquipment);
                  }
                }}
              />
              <Button
                type="button"
                size="sm"
                onClick={() => addListItem('equipment', newEquipment, setNewEquipment)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.equipment?.map((item, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {item}
                  <button
                    type="button"
                    onClick={() => removeListItem('equipment', index)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Muscle Groups */}
          <div>
            <Label>Muscle Groups</Label>
            <div className="flex items-center space-x-2 mb-2">
              <Input
                value={newMuscleGroup}
                onChange={(e) => setNewMuscleGroup(e.target.value)}
                placeholder="Add muscle group"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addListItem('muscleGroups', newMuscleGroup, setNewMuscleGroup);
                  }
                }}
              />
              <Button
                type="button"
                size="sm"
                onClick={() => addListItem('muscleGroups', newMuscleGroup, setNewMuscleGroup)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.muscleGroups?.map((muscle, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1 border-ios-blue text-ios-blue">
                  {muscle}
                  <button
                    type="button"
                    onClick={() => removeListItem('muscleGroups', index)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <Label>Instructions</Label>
            <div className="flex items-center space-x-2 mb-2">
              <Input
                value={newInstruction}
                onChange={(e) => setNewInstruction(e.target.value)}
                placeholder="Add instruction step"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addListItem('instructions', newInstruction, setNewInstruction);
                  }
                }}
              />
              <Button
                type="button"
                size="sm"
                onClick={() => addListItem('instructions', newInstruction, setNewInstruction)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {formData.instructions?.map((instruction, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                  <span className="w-6 h-6 bg-ios-blue text-white rounded-full flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </span>
                  <span className="flex-1">{instruction}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeListItem('instructions', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <Label>Benefits</Label>
            <div className="flex items-center space-x-2 mb-2">
              <Input
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Add health benefit"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addListItem('benefits', newBenefit, setNewBenefit);
                  }
                }}
              />
              <Button
                type="button"
                size="sm"
                onClick={() => addListItem('benefits', newBenefit, setNewBenefit)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {formData.benefits?.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                  <span className="text-green-600">✓</span>
                  <span className="flex-1">{benefit}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeListItem('benefits', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Contraindications */}
          <div>
            <Label>Contraindications</Label>
            <div className="flex items-center space-x-2 mb-2">
              <Input
                value={newContraindication}
                onChange={(e) => setNewContraindication(e.target.value)}
                placeholder="Add health condition or contraindication"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addListItem('contraindications', newContraindication, setNewContraindication);
                  }
                }}
              />
              <Button
                type="button"
                size="sm"
                onClick={() => addListItem('contraindications', newContraindication, setNewContraindication)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {formData.contraindications?.map((contraindication, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-red-50 rounded">
                  <span className="text-red-600">⚠️</span>
                  <span className="flex-1">{contraindication}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeListItem('contraindications', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Precautions */}
          <div>
            <Label>Precautions</Label>
            <div className="flex items-center space-x-2 mb-2">
              <Input
                value={newPrecaution}
                onChange={(e) => setNewPrecaution(e.target.value)}
                placeholder="Add safety precaution"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addListItem('precautions', newPrecaution, setNewPrecaution);
                  }
                }}
              />
              <Button
                type="button"
                size="sm"
                onClick={() => addListItem('precautions', newPrecaution, setNewPrecaution)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {formData.precautions?.map((precaution, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-yellow-50 rounded">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="flex-1">{precaution}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeListItem('precautions', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Modifications */}
          <div>
            <Label>Modifications</Label>
            <div className="flex items-center space-x-2 mb-2">
              <Input
                value={newModification}
                onChange={(e) => setNewModification(e.target.value)}
                placeholder="Add modification or adaptation"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addListItem('modifications', newModification, setNewModification);
                  }
                }}
              />
              <Button
                type="button"
                size="sm"
                onClick={() => addListItem('modifications', newModification, setNewModification)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {formData.modifications?.map((modification, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                  <span className="text-blue-600">💡</span>
                  <span className="flex-1">{modification}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeListItem('modifications', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
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
              className="bg-ios-green hover:bg-green-600"
            >
              {createMutation.isPending ? "Creating..." : "Create Movement"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}