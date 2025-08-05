import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Dumbbell, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Calendar as CalendarIcon,
  List,
  Grid,
  Table2
} from "lucide-react";
import { format, startOfToday, addMonths, subMonths } from "date-fns";
import CalendarGrid from "@/components/calendar-grid";
import WeekView from "@/components/week-view";
import ClassModal from "@/components/class-modal";
import SaveTemplateModal from "@/components/save-template-modal";
import TemplateSelectionModal from "@/components/template-selection-modal";
import type { Template } from "@shared/schema";
import { Class } from "@shared/schema";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(startOfToday());
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showTemplateSelection, setShowTemplateSelection] = useState(false);
  const [templateForNewClass, setTemplateForNewClass] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"month" | "week" | "list">("month");

  const { data: classes = [], isLoading } = useQuery<Class[]>({
    queryKey: ["/api/classes"],
  });

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(current => 
      direction === "prev" ? subMonths(current, 1) : addMonths(current, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(startOfToday());
  };

  const openNewClassModal = () => {
    setSelectedClass(null);
    setIsModalOpen(true);
  };

  const openTemplateSelection = () => {
    setShowTemplateSelection(true);
  };

  const handleClassClick = (classData: Class) => {
    setSelectedClass(classData);
    setIsModalOpen(true);
  };

  const handleSaveAsTemplate = (classData: Class) => {
    setTemplateForNewClass(classData);
    setShowTemplateModal(true);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={goToToday}
            className="px-3"
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-semibold ml-2">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          
          <div className="ml-6 flex items-center border rounded-md">
            <Button
              variant={viewMode === "month" ? "subtle" : "ghost"}
              size="sm"
              className="px-3"
              onClick={() => setViewMode("month")}
            >
              <Grid className="w-4 h-4 mr-1" />
              Month
            </Button>
            <Button
              variant={viewMode === "week" ? "subtle" : "ghost"}
              size="sm"
              className="px-3"
              onClick={() => setViewMode("week")}
            >
              <Table2 className="w-4 h-4 mr-1" />
              Week
            </Button>
            <Button
              variant={viewMode === "list" ? "subtle" : "ghost"}
              size="sm"
              className="px-3"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4 mr-1" />
              List
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/movements" className="hover:opacity-80">
            <Button variant="outline">
              <Dumbbell className="w-4 h-4 mr-2" />
              Movements
            </Button>
          </Link>
          <Button onClick={openTemplateSelection} variant="outline">
            Use Template
          </Button>
          <Button onClick={openNewClassModal}>
            <Plus className="w-4 h-4 mr-2" />
            New Class
          </Button>
        </div>
      </div>

      {/* Calendar Views */}
      <div className="bg-white shadow rounded-lg">
        {viewMode === "month" && (
          <CalendarGrid
            currentDate={currentDate}
            classes={classes}
            onClassClick={handleClassClick}
          />
        )}
        {viewMode === "week" && (
          <WeekView
            currentDate={currentDate}
            classes={classes}
            onClassClick={handleClassClick}
          />
        )}
        {viewMode === "list" && (
          <div className="p-4">
            <p className="text-gray-500 text-center">List view coming soon...</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <ClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classData={selectedClass}
        onSaveAsTemplate={handleSaveAsTemplate}
      />

      <SaveTemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        classData={templateForNewClass}
      />

      <TemplateSelectionModal
        isOpen={showTemplateSelection}
        onClose={() => setShowTemplateSelection(false)}
        onSelect={(template) => {
          setTemplateForNewClass(template);
          setShowTemplateSelection(false);
          setIsModalOpen(true);
        }}
      />
    </div>
  );
}
