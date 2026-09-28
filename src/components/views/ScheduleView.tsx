import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScheduleEvent } from '../../types/student';

interface ScheduleViewProps {
  schedule: ScheduleEvent[];
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ schedule }) => {
  const days: Array<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const dayLabels = {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday'
  };

  const [selectedDay, setSelectedDay] = useState<'All' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'>('All');

  const filteredSchedule = selectedDay === 'All' 
    ? schedule 
    : schedule.filter((s) => s.day === selectedDay);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Class Timetable & Campus Schedule</h2>
          <p className="text-xs text-slate-400">Fall Semester 2026 · Weekly In-Person & Lab Lectures</p>
        </div>

        {/* Day Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg overflow-x-auto">
          <button
            onClick={() => setSelectedDay('All')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedDay === 'All' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Week
          </button>
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedDay === day ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule by Days */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map((day) => {
          if (selectedDay !== 'All' && selectedDay !== day) return null;
          const dayEvents = schedule
            .filter((e) => e.day === day)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));

          return (
            <div
              key={day}
              className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-sm flex flex-col"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-white">{dayLabels[day]}</h3>
                <span className="text-[11px] font-mono text-slate-400">{dayEvents.length} Sessions</span>
              </div>

              {dayEvents.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500 italic">
                  No classes scheduled
                </div>
              ) : (
                <div className="space-y-2.5 flex-1">
                  {dayEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/80 hover:border-indigo-500/60 transition-colors space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-indigo-400">{evt.courseCode}</span>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-300">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{evt.startTime} - {evt.endTime}</span>
                        </div>
                      </div>
                      <h4 className="text-xs font-medium text-white leading-snug">{evt.courseName}</h4>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span className="flex items-center gap-1 text-slate-300">
                          <MapPin className="w-3 h-3 text-indigo-400" />
                          {evt.room}
                        </span>
                        <span className="truncate max-w-[130px]">{evt.instructor}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
