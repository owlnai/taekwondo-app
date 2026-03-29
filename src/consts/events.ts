export type CalendarEvent = {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  color?: string;
};

export const events: CalendarEvent[] = [
  {
    id: 1,
    title: 'Examen cinturones rojos',
    date: '2026-03-25',
    startTime: '10:00',
    endTime: '13:00',
    color: '#e10000',
  },
  {
    id: 2,
    title: 'Examen cinturones amarillos',
    date: '2026-03-25',
    startTime: '15:00',
    endTime: '18:00',
    color: '#f5cc00',
  },
  {
    id: 3,
    title: 'Examen cinturones de color',
    date: '2026-04-02',
    startTime: '10:00',
    endTime: '13:00',
    color: '#00b282',
  },
  {
    id: 4,
    title: 'Examen cinturones negros',
    date: '2026-04-03',
    startTime: '17:00',
    endTime: '19:30',
    color: '#735bf2',
  },
  {
    id: 5,
    title: 'Competición Málaga',
    date: '2026-04-03',
    startTime: '10:00',
    endTime: '17:00',
    color: '#0194ff',
  },
  {
    id: 6,
    title: 'Examen cinturones de color',
    date: '2026-04-10',
    startTime: '10:00',
    endTime: '13:00',
    color: '#00b282',
  },
  {
    id: 7,
    title: 'Examen cinturones negros',
    date: '2026-04-10',
    startTime: '17:00',
    endTime: '19:30',
    color: '#735bf2',
  },
  {
    id: 8,
    title: 'Competición Málaga',
    date: '2026-04-10',
    startTime: '10:00',
    endTime: '17:00',
    color: '#0194ff',
  },
];
