export const fetchServicesFromDB = () => {
  return Promise.resolve([
    {
      id: 1,
      sname: 'Oil Change',
      title: 'Honda Kazakhstan',
      image: require('../../assets/images/example.png'),
      description:
        'Complete engine oil replacement with filter using certified Honda oils.',
      adress: 'Baitursynov St 27',
      rating: '4.5',
      price: '7000 KZT',
    },
    {
      id: 2,
      sname: 'Tire Replacement',
      title: 'VW Auto Center',
      image: require('../../assets/images/example.png'),
      description:
        'Seasonal tire swap and balancing for all vehicle types, quick and precise.',
      adress: 'Zhibek Zholy St 88',
      rating: '4.8',
      price: '12000 KZT',
    },
    {
      id: 3,
      sname: 'Engine Diagnostics',
      title: 'Toyota Almaty Service',
      image: require('../../assets/images/example.png'),
      description:
        'Computer diagnostics for engine, sensors, and emissions. Full report included.',
      adress: 'Dostyk Ave 115',
      rating: '4.6',
      price: '9000 KZT',
    },
    {
      id: 4,
      sname: 'Car Wash (Premium)',
      title: 'CleanRide Express',
      image: require('../../assets/images/example.png'),
      description:
        'Hand wash, interior vacuuming, and wax finish. Fast and eco-friendly.',
      adress: 'Abay Ave 49',
      rating: '4.7',
      price: '6000 KZT',
    },
    {
      id: 5,
      sname: 'Battery Replacement',
      title: 'AutoFix Garage',
      image: require('../../assets/images/example.png'),
      description:
        'Replacement of car battery with diagnostics and warranty. Fast service.',
      adress: 'Rayimbek Ave 23',
      rating: '4.4',
      price: '15000 KZT',
    },
  ]);
};
