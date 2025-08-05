import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, TriangleAlert, Plus, Edit, Heart, AlertTriangle, Zap } from "lucide-react";
import EditMovementModal from "./edit-movement-modal";
import { Movement } from "@shared/schema";

interface MovementDetailModalProps {
  movement: Movement | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MovementDetailModal({ movement, isOpen, onClose }: MovementDetailModalProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  
  if (!movement) return null;

  const handleAddToSequence = () => {
    // TODO: Implement add to sequence logic
    console.log('Adding movement to sequence:', movement.id);
    onClose();
  };

  const handleEditMovement = () => {
    setShowEditModal(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogPortal>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
            <DialogTitle className="text-xl font-bold ios-gray-dark flex items-center justify-between">
              <span>{movement.name}</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEditMovement}
                  className="text-ios-blue hover:bg-blue-50"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAddToSequence}
                  className="text-ios-blue hover:bg-blue-50"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add to Sequence
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-ios-blue border-ios-blue">
                {movement.level}
              </Badge>
              <Badge variant="outline" className="text-ios-gray border-ios-gray">
                {movement.category}
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-ios-gray">{movement.description}</p>
            </div>

            {movement.precautions && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center text-amber-600">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Precautions
                </h3>
                <p className="text-ios-gray">{movement.precautions}</p>
              </div>
            )}

            {movement.benefits && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center text-green-600">
                  <Heart className="w-4 h-4 mr-2" />
                  Benefits
                </h3>
                <p className="text-ios-gray">{movement.benefits}</p>
              </div>
            )}

            {movement.tags && movement.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {movement.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {showEditModal && movement && (
        <EditMovementModal
          movement={movement}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}
