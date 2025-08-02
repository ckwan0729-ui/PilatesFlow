import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Plus } from "lucide-react";
import MovementCard from "@/components/movement-card";
import MovementDetailModal from "@/components/movement-detail-modal";
import { Movement } from "@shared/schema";

export default function MovementsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);

  const { data: movements = [], isLoading } = useQuery<Movement[]>({
    queryKey: ["/api/movements"],
  });

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || movement.category === categoryFilter;
    const matchesLevel = levelFilter === "all" || movement.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const categories = [...new Set(movements.map(m => m.category))];
  const levels = [...new Set(movements.map(m => m.level))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-ios-gray-light">
                <ArrowLeft className="w-5 h-5 ios-blue" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold ios-gray-dark">Movement Library</h1>
          </div>
          
          <Button className="bg-ios-green hover:bg-green-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Movement
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
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
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Movement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovements.map((movement) => (
            <MovementCard
              key={movement.id}
              movement={movement}
              onClick={() => setSelectedMovement(movement)}
            />
          ))}
        </div>

        {filteredMovements.length === 0 && (
          <div className="text-center py-12 ios-gray">
            <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No movements found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <MovementDetailModal
        movement={selectedMovement}
        isOpen={!!selectedMovement}
        onClose={() => setSelectedMovement(null)}
      />
    </div>
  );
}
