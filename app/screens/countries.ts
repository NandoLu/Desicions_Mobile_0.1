export interface Leader {
  name: string;
  image: any;
}

export interface Country {
  name: string;
  details: {
    year: number;
    pib: string;
    population: string;
    ideology: string;
  };
  images: {
    flag: any;
  };
  leaders: Leader[];
}

export const countries: Country[] = [
  {
    name: 'Brazil',
    details: {
      year: 2024,
      pib: '2,05 trilhões USD',
      population: '212 milhões',
      ideology: 'Democracia',
    },
    images: {
      flag: require('../../assets/img/brasil.png'),
    },
    leaders: [
      {
        name: 'Líder A',
        image: require('../../assets/img/vargas.png'),
      },
      {
        name: 'Líder B',
        image: require('../../assets/img/img.png'),
      },
    ],
  },
  {
    name: 'Russia',
    details: {
      year: 2024,
      pib: '1,48 trilhões USD',
      population: '144 milhões',
      ideology: 'Federalismo',
    },
    images: {
      flag: require('../../assets/img/urss.png'),
    },
    leaders: [
      {
        name: 'Vladimir Lenin',
        image: require('../../assets/img/img.png'),
      },
      {
        name: 'Joseph Stalin',
        image: require('../../assets/img/stalin.png'),
      },
    ],
  },
  // Adicione mais países aqui
];
