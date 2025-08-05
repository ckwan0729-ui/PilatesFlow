import { format, startOfWeek, addDays, isSameDay, isToday } from "date-fns";
import { Class } from "@shared/schema";

interface WeekViewProps {
  currentDate: Date;
  classes: Class[];
  onClassClick: (classData: Class) => void;
}

export default function WeekView({ currentDate, classes, onClassClick }: WeekViewProps) {
  const weekStart = startOfWeek(currentDate);
  const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getClassesForDateAndHour = (date: Date, hour: number) => {
    return classes.filter(c => {
      const classDate = new Date(c.startTime);
      return isSameDay(classDate, date) && classDate.getHours() === hour;
    });
  };

  const getEventColor = (classData: Class) => {
    const colors = {
      Regular: "bg-blue-500",
      Workshop: "bg-purple-500",
      Private: "bg-green-500",
      Special: "bg-orange-500"
    };
    return colors[classData.category as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Time column header */}
      <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b">
        <div className="p-2 border-r" />
        {days.map((day, i) => (
          <div
            key={i}
            className={`p-2 text-center ${
              isToday(day) ? "bg-blue-50 font-bold" : ""
            }`}
          >
            <div className="font-medium">{format(day, "EEE")}</div>
            <div className={`text-sm ${isToday(day) ? "text-blue-600" : "text-gray-500"}`}>
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="grid grid-cols-[80px_repeat(7,1fr)]">
        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-[80px_repeat(7,1fr)] col-span-8 border-b last:border-b-0">
            {/* Time label */}
            <div className="p-2 text-sm text-gray-500 border-r">
              {format(new Date().setHours(hour, 0), "h a")}
            </div>

            {/* Day columns */}
            {days.map((day, dayIndex) => {
              const dayClasses = getClassesForDateAndHour(day, hour);
              
              return (
                <div
                  key={dayIndex}
                  className={`relative p-1 border-r last:border-r-0 min-h-[60px] ${
                    isToday(day) ? "bg-blue-50/30" : ""
                  }`}
                >
                  {dayClasses.map((classData, classIndex) => (
                    <button
                      key={classIndex}
                      onClick={() => onClassClick(classData)}
                      className={`w-full text-left px-2 py-1 mb-1 rounded
                        text-sm text-white ${getEventColor(classData)}
                        hover:opacity-90 transition-opacity`}
                    >
                      <div className="font-medium truncate">
                        {classData.title}
                      </div>
                      <div className="text-xs text-white/90">
                        {format(new Date(classData.startTime), "h:mm a")} -{" "}
                        {format(new Date(classData.endTime), "h:mm a")}
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
