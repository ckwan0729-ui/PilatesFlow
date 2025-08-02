import { useState } from "react";
import { Movement } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, GripVertical, Search, Plus } from "lucide-react";
import MovementCard from "./movement-card";

interface SequenceBuilderProps {
  sequence: string[];
  movements: Movement[];
  allMovements: Movement[];
  onSequenceChange: (sequence: string[]) => void;
}

export default function SequenceBuilder({ 
  sequence, 
  movements, 
  allMovements, 
  onSequenceChange 
}: SequenceBuilderProps) {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleRemoveFromSequence = (index: number) => {
    const newSequence = sequence.filter((_, i) => i !== index);
    onSequenceChange(newSequence);
  };

  const handleAddToSequence = (movementId: string) => {
    if (!sequence.includes(movementId)) {
      onSequenceChange([...sequence, movementId]);
    }
    setIsLibraryOpen(false);
  };

  const handleClearSequence = () => {
    onSequenceChange([]);
  };

  const filteredMovements = allMovements.filter(movement => {
    const matchesSearch = movement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || movement.category === categoryFilter;
    const notInSequence = !sequence.includes(movement.id);
    
    return matchesSearch && matchesCategory && notInSequence;
  });

  const categories = [...new Set(allMovements.map(m => m.category))];

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

  const estimatedDuration = Math.ceil(sequence.length * 4.5); // Rough estimate
  const highRiskCount = movements.filter(m => m.precautionLevel === 'High').length;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold ios-gray-dark">
          Movement Sequence 
          <span className="text-sm ios-gray font-normal ml-2">({sequence.length} movements)</span>
        </h4>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearSequence}
            className="ios-blue border-ios-blue"
          >
            Clear All
          </Button>
          <Button
            size="sm"
            onClick={() => setIsLibraryOpen(true)}
            className="bg-ios-blue hover:bg-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Movement
          </Button>
        </div>
      </div>

      {/* Sequence Area */}
      <div className="min-h-[400px] border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50">
        {sequence.length === 0 ? (
          <div className="text-center py-12 ios-gray">
            <div className="text-4xl mb-4">🤲</div>
            <p className="text-lg font-medium">Build your sequence</p>
            <p className="text-sm">Add movements to create your class</p>
          </div>
        ) : (
          <div className="space-y-3">
            {movements.map((movement, index) => (
              <div key={movement.id} className="sequence-item bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex items-center space-x-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-8 h-8 bg-ios-blue text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img 
                      src={movement.thumbnailUrl || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'} 
                      alt={movement.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium ios-gray-dark">{movement.name}</h5>
                    <p className="text-sm ios-gray">{movement.duration || '3-5 min'} • {movement.category}</p>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPrecautionColor(movement.precautionLevel)}`}>
                        {getPrecautionIcon(movement.precautionLevel)} {movement.precautionLevel} Risk
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="p-2 ios-gray hover:text-ios-blue">
                    <GripVertical className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveFromSequence(index)}
                    className="p-2 ios-gray hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sequence Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-ios-gray-light rounded-lg p-4 text-center">
          <div className="text-2xl font-bold ios-blue">{sequence.length}</div>
          <div className="text-sm ios-gray">Movements</div>
        </div>
        <div className="bg-ios-gray-light rounded-lg p-4 text-center">
          <div className="text-2xl font-bold ios-green">{estimatedDuration}</div>
          <div className="text-sm ios-gray">Minutes</div>
        </div>
        <div className="bg-ios-gray-light rounded-lg p-4 text-center">
          <div className="text-2xl font-bold ios-orange">{highRiskCount}</div>
          <div className="text-sm ios-gray">High Risk</div>
        </div>
      </div>

      {/* Movement Library Modal */}
      <Dialog open={isLibraryOpen} onOpenChange={setIsLibraryOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Add Movement to Sequence</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ios-gray" />
                <Input
                  type="text"
                  placeholder="Search movements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Movement Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {filteredMovements.map((movement) => (
                <div key={movement.id} className="relative">
                  <MovementCard
                    movement={movement}
                    onClick={() => handleAddToSequence(movement.id)}
                  />
                  <Button
                    className="absolute top-2 right-2 bg-ios-blue hover:bg-blue-600 text-white rounded-full w-8 h-8 p-0"
                    onClick={() => handleAddToSequence(movement.id)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {filteredMovements.length === 0 && (
              <div className="text-center py-8 ios-gray">
                <p>No movements found</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
