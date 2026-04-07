export type Exam = {
  id: string;
  range: string;
  belt: string;
  type: 'gup' | 'dan';
};

export const exams: Exam[] = [
  {
    id: 'gup-9',
    range: '9º GUP',
    belt: 'white_yellow',
    type: 'gup',
  },
  {
    id: 'gup-8',
    range: '8º GUP',
    belt: 'yellow',
    type: 'gup',
  },
  {
    id: 'gup-7',
    range: '7º GUP',
    belt: 'yellow_green',
    type: 'gup',
  },
  {
    id: 'gup-6',
    range: '6º GUP',
    belt: 'green',
    type: 'gup',
  },
  {
    id: 'gup-5',
    range: '5º GUP',
    belt: 'green_blue',
    type: 'gup',
  },
  {
    id: 'gup-4',
    range: '4º GUP',
    belt: 'blue',
    type: 'gup',
  },
  {
    id: 'gup-3',
    range: '3º GUP',
    belt: 'blue_red',
    type: 'gup',
  },
  {
    id: 'gup-2',
    range: '2º GUP',
    belt: 'red',
    type: 'gup',
  },
  {
    id: 'gup-1',
    range: '1º GUP',
    belt: 'red_black',
    type: 'gup',
  },
  {
    id: 'dan-1',
    range: 'I DAN',
    belt: 'black_dan_1',
    type: 'dan',
  },
  {
    id: 'dan-2',
    range: 'II DAN',
    belt: 'black_dan_2',
    type: 'dan',
  },
  {
    id: 'dan-3',
    range: 'III DAN',
    belt: 'black_dan_3',
    type: 'dan',
  },
];
