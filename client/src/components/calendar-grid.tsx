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
    const dateString = date.toISOString().split('T')[0];
    return classes.filter(c => c.date === dateString);
  };

  const getEventColor = (index: number) => {
    const colors = ['bg-ios-blue', 'bg-ios-green', 'bg-ios-orange'];
    return colors[index % colors.length];
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Days Header */}
      <div className="grid grid-cols-7 bg-ios-gray-light">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-3 text-center text-sm font-semibold ios-gray-dark">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="calendar-grid">
        {days.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday = day.toDateString() === today.toDateString();
          const dayClasses = getClassesForDate(day);

          return (
            <div key={index} className="calendar-cell p-2">
              <div className={`text-sm font-medium ${
                isCurrentMonth 
                  ? isToday 
                    ? 'ios-blue font-bold' 
                    : 'ios-gray-dark'
                  : 'ios-gray'
              }`}>
                {day.getDate()}
              </div>
              
              {dayClasses.map((classData, classIndex) => (
                <div
                  key={classData.id}
                  className={`calendar-event text-white ${getEventColor(classIndex)}`}
                  onClick={() => onClassClick(classData)}
                >
                  {formatTime(classData.startTime)} - {classData.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
