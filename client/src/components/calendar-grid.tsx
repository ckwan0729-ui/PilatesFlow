import { format, isWithinInterval, isSameDay, addDays, isSameMonth } from "date-fns";
import { Class } from "@shared/schema";

interface CalendarGridProps {
  currentDate: Date;
  classes: Class[];
  onClassClick: (classData: Class) => void;
}

export default function CalendarGrid({ currentDate, classes, onClassClick }: CalendarGridProps) {
  const today = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());
  
  const days = [];
  const current = new Date(startDate);
  
  // Generate 42 days (6 weeks)
  for (let i = 0; i < 42; i++) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const getClassesForDate = (date: Date) => {
    return classes.filter(c => {
      const classStartTime = new Date(c.startTime);
      
      // 處理非重複課程
      if (!c.isRecurring) {
        return isSameDay(classStartTime, date);
      }
      
      // 處理重複課程
      if (c.isRecurring && c.recurrencePattern && c.recurrenceDays) {
        const recurrenceEndDate = c.recurrenceEndDate ? new Date(c.recurrenceEndDate) : null;
        
        // 檢查日期是否在重複範圍內
        if (recurrenceEndDate && date > recurrenceEndDate) {
          return false;
        }
        
        // 檢查是否是正確的重複日
        const dayOfWeek = date.getDay();
        if (!c.recurrenceDays.includes(dayOfWeek)) {
          return false;
        }
        
        // 檢查日期是否在開始日期之後
        return date >= classStartTime;
      }
      
      return false;
    });
  };

  const getEventColor = (classData: Class) => {
    const colors = {
      Regular: 'bg-blue-500',
      Workshop: 'bg-purple-500',
      Private: 'bg-green-500',
      Special: 'bg-orange-500'
    };
    return colors[classData.category as keyof typeof colors] || 'bg-gray-500';
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'h:mm a');
  };

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200">
      {/* Weekday headers */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className="p-2 text-center text-sm font-medium bg-white">
          {day}
        </div>
      ))}
      
      {/* Calendar days */}
      {days.map((date, idx) => {
        const dayClasses = getClassesForDate(date);
        const isToday = isSameDay(date, today);
        const isCurrentMonth = isSameMonth(date, currentDate);
        
        return (
          <div
            key={idx}
            className={`min-h-[120px] p-1 bg-white ${
              !isCurrentMonth ? 'text-gray-400' : ''
            } ${isToday ? 'bg-blue-50' : ''}`}
          >
            <div className="sticky top-0 z-10 mb-1">
              <span className={`text-sm ${
                isToday ? 'font-bold text-blue-600' : ''
              }`}>
                {format(date, 'd')}
              </span>
            </div>
            
            <div className="space-y-1">
              {dayClasses.map((classData, classIdx) => (
                <button
                  key={`${classData.id}-${classIdx}`}
                  onClick={() => onClassClick(classData)}
                  className={`w-full text-left px-1 py-0.5 rounded text-xs text-white
                    ${getEventColor(classData)} hover:opacity-90 transition-opacity`}
                >
                  <div className="font-medium truncate">
                    {classData.title}
                  </div>
                  <div className="text-white/90">
                    {formatTime(classData.startTime.toISOString())}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
