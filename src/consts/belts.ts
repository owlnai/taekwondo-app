export type Belt = {
  id: string;
  label: string;
  alt: string;
  color: string;
  buckle?: string | null;
};

export const belts: Belt[] = [
  {
    id: 'white_yellow',
    label: 'P. Amarilla',
    alt: 'Blanco con punta Amarilla',
    color: '#fff',
    buckle: '#ffe976',
  },
  {
    id: 'yellow',
    label: 'Amarillo',
    alt: 'Amarillo',
    color: '#ffe976',
  },
  {
    id: 'yellow_green',
    label: 'P. Verde',
    alt: 'Amarillo con punta Verde',
    color: '#ffe976',
    buckle: '#387729',
  },
  {
    id: 'green',
    label: 'Verde',
    alt: 'Verde',
    color: '#387729',
  },
  {
    id: 'green_blue',
    label: 'P. Azul',
    alt: 'Verde con punta Azul',
    color: '#387729',
    buckle: '#1a4db5',
  },
  {
    id: 'blue',
    label: 'Azul',
    alt: 'Azul',
    color: '#1a4db5',
  },
  {
    id: 'blue_red',
    label: 'P. Roja',
    alt: 'Azul con punta Roja',
    color: '#1a4db5',
    buckle: '#df000a',
  },
  {
    id: 'red',
    label: 'Rojo',
    alt: 'Rojo',
    color: '#df000a',
  },
  {
    id: 'red_black',
    label: 'P. Negra',
    alt: 'Rojo con punta Negra',
    color: '#df000a',
    buckle: '#1f1f1f',
  },
  {
    id: 'black',
    label: 'Negro',
    alt: 'Negro',
    color: '#1f1f1f',
  },
];
