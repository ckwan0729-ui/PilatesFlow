import { Movement } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, TriangleAlert, Plus, Edit, Heart, AlertTriangle, Zap } from "lucide-react";

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
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src={movement.thumbnailUrl || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'} 
              alt={movement.name}
              className="w-full h-64 object-cover"
            />
            {movement.isPolestar === 1 && (
              <div className="absolute top-4 left-4 bg-ios-blue text-white px-3 py-2 rounded-lg font-semibold">
                ⭐ Polestar Exercise
              </div>
            )}
          </div>

          {/* Tags */}
          {movement.tags && movement.tags.length > 0 && (
            <div>
              <h4 className="font-semibold ios-gray-dark mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2 ios-blue" />
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {movement.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-ios-gray-light text-ios-gray-dark">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

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
            {movement.equipment && movement.equipment.length > 0 && (
              <div>
                <h4 className="font-semibold ios-gray-dark mb-2">Equipment</h4>
                <p className="ios-gray">{movement.equipment.join(', ')}</p>
              </div>
            )}
            {movement.breathingPattern && (
              <div>
                <h4 className="font-semibold ios-gray-dark mb-2">Breathing</h4>
                <p className="ios-gray">{movement.breathingPattern}</p>
              </div>
            )}
          </div>

          {/* Description */}
          {movement.description && (
            <div>
              <h4 className="font-semibold ios-gray-dark mb-2">Description</h4>
              <p className="ios-gray leading-relaxed">{movement.description}</p>
            </div>
          )}

          {/* Benefits */}
          {movement.benefits && movement.benefits.length > 0 && (
            <div>
              <h4 className="font-semibold ios-gray-dark mb-3 flex items-center">
                <Heart className="w-4 h-4 mr-2 ios-green" />
                Benefits
              </h4>
              <ul className="space-y-2 ios-gray">
                {movement.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-ios-green text-white rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                      ✓
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Muscle Groups */}
          {movement.muscleGroups && movement.muscleGroups.length > 0 && (
            <div>
              <h4 className="font-semibold ios-gray-dark mb-2">Target Muscle Groups</h4>
              <div className="flex flex-wrap gap-2">
                {movement.muscleGroups.map((muscle, index) => (
                  <Badge key={index} variant="outline" className="border-ios-blue text-ios-blue">
                    {muscle}
                  </Badge>
                ))}
              </div>
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

          {/* Contraindications */}
          {movement.contraindications && movement.contraindications.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <h4 className="font-semibold text-red-800">Contraindications</h4>
              </div>
              <ul className="space-y-1 text-red-700 text-sm">
                {movement.contraindications.map((contraindication, index) => (
                  <li key={index}>• {contraindication}</li>
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

          {/* Modifications */}
          {movement.modifications && movement.modifications.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Edit className="w-4 h-4 text-blue-600" />
                <h4 className="font-semibold text-blue-800">Modifications</h4>
              </div>
              <ul className="space-y-1 text-blue-700 text-sm">
                {movement.modifications.map((modification, index) => (
                  <li key={index}>• {modification}</li>
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
