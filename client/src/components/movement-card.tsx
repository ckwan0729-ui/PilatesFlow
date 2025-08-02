import { Movement } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";

interface MovementCardProps {
  movement: Movement;
  onClick: () => void;
}

export default function MovementCard({ movement, onClick }: MovementCardProps) {
  const getPrecautionColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrecautionIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low':
        return '✓';
      case 'moderate':
      case 'high':
        return '⚠️';
      default:
        return '?';
    }
  };

  return (
    <div className="movement-card bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer" onClick={onClick}>
      <div className="relative">
        <img 
          src={movement.thumbnailUrl || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250'} 
          alt={movement.name}
          className="w-full h-40 object-cover"
        />
        {movement.isPolestar === 1 && (
          <div className="absolute top-2 left-2 bg-ios-blue text-white text-xs px-2 py-1 rounded-full font-semibold">
            Polestar
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold ios-gray-dark mb-1">{movement.name}</h3>
        <p className="text-sm ios-gray mb-2">{movement.category} • {movement.level}</p>
        
        {/* Tags */}
        {movement.tags && movement.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {movement.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs bg-ios-gray-light text-ios-gray-dark px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
            {movement.tags.length > 3 && (
              <span className="text-xs ios-gray">+{movement.tags.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getPrecautionColor(movement.precautionLevel)}`}>
              {getPrecautionIcon(movement.precautionLevel)} {movement.precautionLevel}
            </span>
            {movement.contraindications && movement.contraindications.length > 0 && (
              <span className="text-xs text-red-600">⚠️</span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ios-blue font-medium draggable"
            onClick={(e) => {
              e.stopPropagation();
              // Handle add to sequence
            }}
          >
            <GripVertical className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
