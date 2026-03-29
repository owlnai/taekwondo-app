import { Calendar, CalendarDayButton } from '@/common/Calendar';
import { events, type CalendarEvent } from '@/consts/events';
import { cn } from '@/utils/cn';
import { toTitleCase } from '@/utils/string';
import { format, parse } from 'date-fns';
import { useState } from 'react';
import { es } from 'react-day-picker/locale';

function EventIndicator({
  event,
  className,
  ...props
}: React.ComponentProps<'div'> & { event: CalendarEvent }) {
  return (
    <div
      className={cn(
        'rounded-full relative size-3 after:absolute after:inset-0 after:scale-30 after:bg-white after:rounded-full',
        className
      )}
      style={{ backgroundColor: event.color }}
      {...props}
    />
  );
}

function EventList({ selectedDate }: { selectedDate?: Date }) {
  const eventsForSelectedDate = selectedDate
    ? events.filter((e) => e.date === format(selectedDate, 'yyyy-MM-dd'))
    : events.filter((e) => {
        const date = parse(e.date, 'yyyy-MM-dd', new Date());
        return e.date === format(new Date(), 'yyyy-MM-dd') || new Date() < date;
      });

  const eventDatesForSelectedDate = [
    ...new Set(eventsForSelectedDate.map((e) => e.date)),
  ];

  return (
    <div className="space-y-6 px-2">
      {eventsForSelectedDate.length === 0 && (
        <div className="space-y-4">
          {selectedDate && (
            <h2 className="font-semibold">
              {selectedDate.toLocaleString('es', {
                month: 'long',
                day: 'numeric',
              })}
            </h2>
          )}
          <p className="font-semibold text-sm text-gray-500">
            No hay eventos todavía.
          </p>
        </div>
      )}

      {eventDatesForSelectedDate.map((date) => (
        <div key={date} className="space-y-4">
          <h2 className="font-semibold">
            {parse(date, 'yyyy-MM-dd', new Date()).toLocaleString('es', {
              month: 'long',
              day: 'numeric',
            })}
          </h2>
          {eventsForSelectedDate
            .filter((e) => e.date === date)
            .map((event) => (
              <div key={event.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <EventIndicator event={event} />
                  <p className="font-semibold text-xs text-gray-500">
                    {event.startTime} - {event.endTime}
                  </p>
                </div>
                <h3 className="font-semibold text-sm">{event.title}</h3>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  return (
    <div className="space-y-6">
      <Calendar
        locale={es}
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="w-full"
        components={{
          MonthCaption: ({
            calendarMonth,
            className,
            displayIndex: _,
            ...props
          }) => (
            <div className={cn(className, 'flex-col')} {...props}>
              <span className="font-medium text-lg leading-snug">
                {toTitleCase(
                  calendarMonth.date.toLocaleString('es', {
                    month: 'long',
                  })
                )}
              </span>
              <span className="text-xs text-gray-500">
                {calendarMonth.date.toLocaleString('es', {
                  year: 'numeric',
                })}
              </span>
            </div>
          ),
          DayButton: ({ modifiers, day, ...props }) => (
            <div className="flex flex-col items-center gap-1">
              <CalendarDayButton
                day={day}
                locale={es}
                modifiers={modifiers}
                {...props}
              />
              <div className="flex items-center gap-0.5 min-h-1 min-w-1">
                {events
                  .filter((e) => e.date === format(day.date, 'yyyy-MM-dd'))
                  .map((e) => (
                    <EventIndicator key={e.id} className="size-1" event={e} />
                  ))}
              </div>
            </div>
          ),
        }}
      />

      <div
        aria-hidden="true"
        className="shrink-0 w-12 h-1 mx-auto rounded-full bg-black/10"
        role="separator"
      />

      <EventList selectedDate={selectedDate} />
    </div>
  );
}
