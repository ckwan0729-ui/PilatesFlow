import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, Target, Zap } from "lucide-react";
import { Template } from "@shared/schema";

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

export default function TemplateSelectionModal({ isOpen, onClose, onSelectTemplate }: TemplateSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: templates = [], isLoading } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
    enabled: isOpen
  });

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectTemplate = (template: Template) => {
    onSelectTemplate(template);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold ios-gray-dark">
            Choose a Template
          </DialogTitle>
          <p className="text-sm ios-gray">
            Select a template to start your new class with a pre-built sequence
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ios-gray" />
            <Input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Templates Grid */}
          <div className="overflow-y-auto max-h-[50vh]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredTemplates.length === 0 ? (
              <div className="text-center py-12 ios-gray">
                <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No templates found</p>
                <p className="text-sm">
                  {searchTerm ? "Try adjusting your search" : "Create your first template by saving a class"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleSelectTemplate(template)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold ios-gray-dark text-lg">{template.name}</h3>
                      <Badge variant="outline" className="border-ios-blue text-ios-blue">
                        {template.level}
                      </Badge>
                    </div>

                    {template.description && (
                      <p className="ios-gray text-sm mb-3 line-clamp-2">
                        {template.description}
                      </p>
                    )}

                    <div className="flex items-center space-x-4 mb-3 text-sm ios-gray">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{template.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>{template.sequence?.length || 0} movements</span>
                      </div>
                    </div>

                    {template.tags && template.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {template.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {template.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{template.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <Button 
                        size="sm" 
                        className="w-full bg-ios-blue hover:bg-blue-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectTemplate(template);
                        }}
                      >
                        Use This Template
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm ios-gray">
              {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} available
            </p>
            <div className="space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  onSelectTemplate(null as any);
                  onClose();
                }}
                className="ios-gray border-ios-gray"
              >
                Start from Scratch
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}