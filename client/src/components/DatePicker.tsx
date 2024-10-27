import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Calendar } from "lucide-react";

const CustomDatePicker = ({ selectedDate, setSelectedDate, minDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const date = selectedDate instanceof Date ? selectedDate : new Date();

  const formatDate = (date) => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = Array(firstDayOfMonth).fill(null).concat(
      Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))
    );
    return days;
  };

  const isPastDate = (date) => {
    if (!date) return false;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return date < now || (minDate && date < minDate);
  };

  const isSelected = (date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleDateChange = (newDate) => {
    if (!isPastDate(newDate)) {
      setSelectedDate(newDate);
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="relative w-full">
      <div
        className="border border-secondary rounded-lg p-2 flex items-center cursor-pointer bg-neutral"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <Calendar className="w-5 h-5 text-primary mr-2" />
        <input
          type="text"
          className="outline-none w-full cursor-pointer bg-neutral text-primary"
          value={formatDate(date)}
          readOnly
        />
      </div>

      {showCalendar && (
        <div className="absolute mt-2 bg-neutral rounded-lg shadow-lg border border-secondary w-72">
          <div className="flex justify-between items-center p-4 border-b border-secondary">
            <button onClick={prevMonth} className="p-1 rounded-full transition-colors hover:bg-secondary hover:text-neutral text-primary">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-semibold text-primary">
              {currentMonth.toLocaleString("en-US", { month: "long", year: "numeric" })}
            </span>
            <button onClick={nextMonth} className="p-1 rounded-full transition-colors hover:bg-secondary hover:text-neutral text-primary">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-7 gap-1 mb-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-center text-sm text-primary">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentMonth).map((date, index) => {
                const isDisabled = date && isPastDate(date);
                return (
                  <div
                    key={index}
                    className={`h-8 flex items-center justify-center text-sm rounded-full transition-colors
                      ${date && !isDisabled ? "cursor-pointer hover:bg-secondary hover:text-neutral" : ""}
                      ${date && isToday(date) ? "bg-primary text-neutral" : ""}
                      ${date && isSelected(date) ? "bg-secondary text-neutral" : ""}
                      ${isDisabled ? "opacity-50 cursor-not-allowed text-gray-400" : ""}
                    `}
                    onClick={() => date && !isDisabled && handleDateChange(date)}
                  >
                    {date ? date.getDate() : ""}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-secondary p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-primary mr-2" />
                <select
                  className="outline-none border border-secondary rounded p-1 bg-neutral text-primary"
                  value={date.getHours()}
                  onChange={(e) => handleDateChange(new Date(date.setHours(parseInt(e.target.value))))}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>{i.toString().padStart(2, "0")}</option>
                  ))}
                </select>
                <span className="mx-2 text-primary">:</span>
                <select
                  className="outline-none border border-secondary rounded p-1 bg-neutral text-primary"
                  value={date.getMinutes()}
                  onChange={(e) => handleDateChange(new Date(date.setMinutes(parseInt(e.target.value))))}
                >
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>{i.toString().padStart(2, "0")}</option>
                  ))}
                </select>
              </div>
              <button
                className="bg-secondary text-neutral px-4 py-1 rounded hover:bg-middle transition-colors"
                onClick={() => setShowCalendar(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
