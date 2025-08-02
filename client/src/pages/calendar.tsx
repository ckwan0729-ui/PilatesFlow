import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Dumbbell, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import CalendarGrid from "@/components/calendar-grid";
import ClassModal from "@/components/class-modal";
import SaveTemplateModal from "@/components/save-template-modal";
import TemplateSelectionModal from "@/components/template-selection-modal";
import { Class } from "@shared/schema";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showTemplateSelection, setShowTemplateSelection] = useState(false);
  const [templateForNewClass, setTemplateForNewClass] = useState<any>(null);

  const { data: classes = [], isLoading } = useQuery<Class[]>({
    queryKey: ["/api/classes"],
  });

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleCreateClass = () => {
    setSelectedClass(null);
    setTemplateForNewClass(null);
    setShowTemplateSelection(true);
  };

  const handleCreateFromTemplate = (template: any) => {
    if (template) {
      setTemplateForNewClass(template);
    } else {
      setTemplateForNewClass(null);
    }
    setSelectedClass(null);
    setIsModalOpen(true);
    setShowTemplateSelection(false);
  };

  const handleCreateFromScratch = () => {
    setTemplateForNewClass(null);
    setSelectedClass(null);
    setIsModalOpen(true);
    setShowTemplateSelection(false);
  };

  const handleEditClass = (classData: Class) => {
    setSelectedClass(classData);
    setTemplateForNewClass(null);
    setIsModalOpen(true);
  };

  const handleSaveAsTemplate = (classData: Class) => {
    setSelectedClass(classData);
    setShowTemplateModal(true);
  };

  const monthYear = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

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
            <h1 className="text-3xl font-bold text-ios-gray-dark">Pilates Studio</h1>
            <div className="text-sm ios-gray">Class Organizer</div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link href="/movements">
              <Button variant="ghost" className="ios-blue font-semibold">
                <Dumbbell className="w-4 h-4 mr-2" />
                Movements
              </Button>
            </Link>
            <Button onClick={handleCreateClass} className="bg-ios-blue hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              New Class
            </Button>
          </div>
        </div>
      </header>

      {/* Calendar View */}
      <div className="p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateMonth("prev")}
              className="p-2 hover:bg-ios-gray-light"
            >
              <ChevronLeft className="w-5 h-5 ios-blue" />
            </Button>
            <h2 className="text-2xl font-bold ios-gray-dark">{monthYear}</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateMonth("next")}
              className="p-2 hover:bg-ios-gray-light"
            >
              <ChevronRight className="w-5 h-5 ios-blue" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(new Date())}
              className="ios-blue border-ios-blue hover:bg-ios-blue hover:text-white"
            >
              Today
            </Button>
            <div className="flex bg-ios-gray-light rounded-lg p-1">
              <Button size="sm" className="bg-white ios-gray-dark shadow-sm">Month</Button>
              <Button variant="ghost" size="sm" className="ios-gray">Week</Button>
              <Button variant="ghost" size="sm" className="ios-gray">Day</Button>
            </div>
          </div>
        </div>

        <CalendarGrid 
          currentDate={currentDate}
          classes={classes}
          onClassClick={handleEditClass}
        />
      </div>

      <ClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classData={selectedClass}
        templateData={templateForNewClass}
        onSaveAsTemplate={handleSaveAsTemplate}
      />

      <TemplateSelectionModal
        isOpen={showTemplateSelection}
        onClose={() => setShowTemplateSelection(false)}
        onSelectTemplate={handleCreateFromTemplate}
      />

      <SaveTemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        sourceClass={selectedClass}
      />
    </div>
  );
}
