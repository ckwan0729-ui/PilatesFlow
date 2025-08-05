import { useState } from "react";
import { Movement } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditMovementModalProps {
  movement: Movement;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditMovementModal({ movement, isOpen, onClose }: EditMovementModalProps) {
  const [movementData, setMovementData] = useState<Movement>({ ...movement });
  const [newTag, setNewTag] = useState("");
  const queryClient = useQueryClient();

  const addTag = () => {
    const normalizedTag = newTag.trim().toLowerCase();
    if (normalizedTag && !movementData.tags?.map(tag => tag.toLowerCase()).includes(normalizedTag)) {
      setMovementData({
        ...movementData,
        tags: [...(movementData.tags || []), newTag],
      });
      setNewTag("");
    }
  };

  const updateMutation = useMutation({
    mutationFn: async (updatedMovement: Movement) => {
      const response = await fetch(`/api/movements/${movement.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovement),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update movement");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movements"] });
      onClose();
    },
    onError: (error: any) => {
      alert(error.message || "An unexpected error occurred.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!movementData.name.trim()) {
      alert("Name is required.");
      return;
    }

    if (!movementData.category) {
      alert("Category is required.");
      return;
    }

    if (!movementData.level) {
      alert("Level is required.");
      return;
    }

    updateMutation.mutate(movementData);
  };

  const removeTag = (tagToRemove: string) => {
    setMovementData({
      ...movementData,
      tags: movementData.tags?.filter(tag => tag !== tagToRemove) || [],
    });
  };

  const handlePrecautionsChange = (value: string) => {
    const precautionsArray = value.split("\n");
    setMovementData({ ...movementData, precautions: precautionsArray });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold ios-gray-dark">
            Edit Movement
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={movementData.name}
              onChange={(e) => setMovementData({...movementData, name: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={movementData.description || ""}
              onChange={(e) => setMovementData({...movementData, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={movementData.category}
                onValueChange={(value) => setMovementData({...movementData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Footwork">Footwork</SelectItem>
                  <SelectItem value="Abdominal Work">Abdominal Work</SelectItem>
                  <SelectItem value="Spinal Articulation">Spinal Articulation</SelectItem>
                  <SelectItem value="Stretches">Stretches</SelectItem>
                  <SelectItem value="Hip Work">Hip Work</SelectItem>
                  <SelectItem value="Arm Work">Arm Work</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="level">Level *</Label>
              <Select
                value={movementData.level}
                onValueChange={(value) => setMovementData({...movementData, level: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="precautions">Precautions</Label>
            <Textarea
              id="precautions"
              value={(movementData.precautions || []).join("\n")}
              onChange={(e) => handlePrecautionsChange(e.target.value)}
              rows={2}
              placeholder="List any precautions or contraindications"
            />
          </div>

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
              {movementData.tags?.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                  aria-label={`Tag: ${tag}`}
                >
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

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={updateMutation.isPending}
              className="bg-ios-blue hover:bg-blue-600"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
