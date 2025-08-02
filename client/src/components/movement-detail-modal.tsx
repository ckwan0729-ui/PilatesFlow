import { Movement } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, TriangleAlert, Plus, Edit } from "lucide-react";

interface MovementDetailModalProps {
  movement: Movement | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MovementDetailModal({ movement, isOpen, onClose }: MovementDetailModalProps) {
  if (!movement) return null;

  const handleAddToSequence = () => {
    // TODO: Implement add to sequence logic
    console.log('Adding movement to sequence:', movement.id);
    onClose();
  };

  const handleEditMovement = () => {
    // TODO: Implement movement editing logic
    console.log('Editing movement:', movement.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold ios-gray-dark">{movement.name}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto">
          {/* Movement Image */}
          <div className="rounded-xl overflow-hidden">
            <img 
              src={movement.thumbnailUrl || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'} 
              alt={movement.name}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Movement Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold ios-gray-dark mb-2">Category</h4>
              <p className="ios-gray">{movement.category} • {movement.level}</p>
            </div>
            <div>
              <h4 className="font-semibold ios-gray-dark mb-2">Duration</h4>
              <p className="ios-gray">{movement.duration || '3-5 minutes'}</p>
            </div>
          </div>

          {/* Description */}
          {movement.description && (
            <div>
              <h4 className="font-semibold ios-gray-dark mb-2">Description</h4>
              <p className="ios-gray leading-relaxed">{movement.description}</p>
            </div>
          )}

          {/* Instructions */}
          {movement.instructions && movement.instructions.length > 0 && (
            <div>
              <h4 className="font-semibold ios-gray-dark mb-2">Instructions</h4>
              <ul className="space-y-2 ios-gray">
                {movement.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-ios-blue text-white rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                      {index + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Precautions */}
          {movement.precautions && movement.precautions.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TriangleAlert className="w-4 h-4 text-yellow-600" />
                <h4 className="font-semibold text-yellow-800">Precautions</h4>
              </div>
              <ul className="space-y-1 text-yellow-700 text-sm">
                {movement.precautions.map((precaution, index) => (
                  <li key={index}>• {precaution}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={handleAddToSequence}
              className="flex-1 bg-ios-blue hover:bg-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Sequence
            </Button>
            <Button 
              variant="outline"
              onClick={handleEditMovement}
              className="ios-blue border-ios-blue hover:bg-ios-blue hover:text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
