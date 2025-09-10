interface dataObject {
  id: string | number,
  name: string,
  img?: string
}

interface dataIdObject {
  id: { [key: string]: any },
  name: string,
  img?: string
}

const priceRangeOptions: dataIdObject[] = [
  {
    id: { precio_max: 20000000, precio_min: null, ordering: 'precio_lista' },
    name: "Menos de $20 MM",
    img: 'https://storage.googleapis.com/mediamvp/Rango%2020mm.avif'
  },
  {

    id: { precio_min: 20000000, precio_max: 30000000, ordering: 'precio_lista' },
    name: "$20 - $30 MM",
    img: 'https://storage.googleapis.com/mediamvp/Rango%2020-30mm.avif'
  },
  {
    id: { precio_min: 30000000, precio_max: 40000000, ordering: 'precio_lista' },
    name: "$30 - $40 MM",
    img: 'https://storage.googleapis.com/mediamvp/rango%2030-40mm.avif'
  },
  {
    id: { precio_min: 40000000, precio_max: 60000000, ordering: 'precio_lista' },
    name: "$40 - $60 MM",
    img: 'https://storage.googleapis.com/mediamvp/rango%2040-60mm.avif'
  },
  {
    id: { precio_min: 60000000, precio_max: null, ordering: 'precio_lista' },
    name: "Más de $60 MM",
    img: 'https://storage.googleapis.com/mediamvp/Rango%2060mm.avif'
  },
];

const bodyOptions: dataObject[] = [
  { id: 'Hatchback', name: 'Hatchback', img: 'https://storage.googleapis.com/mediamvp/hatchback.avif' },
  { id: 'Sedán', name: 'Sedán', img: 'https://storage.googleapis.com/mediamvp/sedan.avif' },
  { id: 'SUV', name: 'SUV', img: 'https://storage.googleapis.com/mediamvp/SUV.webp' },
  { id: 'Camioneta', name: 'Camioneta', img: 'https://storage.googleapis.com/mediamvp/Pickup.webp' },
  { id: 'Deportivo', name: 'Deportivo', img: 'https://storage.googleapis.com/mediamvp/Deportivo.avif' },
]

const autoTypeOptions: dataObject[] = [
  { id: 'BEV', name: 'BEV' },
  { id: 'PHEV', name: 'PHEV' },
  { id: 'MHEV', name: 'MHEV' },
  { id: 'HEV', name: 'HEV' },
]

const orderList: dataObject[] = [
  { id: '-precio_lista', name: 'Precio mayor a menor' },
  { id: 'precio_lista', name: 'Precio menor a mayor' },
  { id: '-bateria_nominal', name: 'Batería mayor a menor' },
  { id: '-rango_wltp', name: 'Autonomía mayor a menor' },
]

const cargaInfo = [
  {
    id: 0,
    title: 'Instalación de Cargador Residencial (AC)',
    description: 'Instalación rápida y segura de tu cargador en casa o edificio, con conexión monofásica y certificada por la SEC.',
    price: 749000,
  },
  {
    id: 1,
    title: 'Cargador Residencial más Instalación',
    description: 'Cargador Wallbox Pulsar Plus 7.4 kW (AC) con instalación incluida, en un solo paquete para casas y edificios.',
    price: '1549000'
  },
  {
    id: 2,
    title: 'Kit Solar Residencial',
    description: 'Genera tu propia energía limpia en casa con nuestro kit solar residencial de 2.5 kWp, diseñado para cubrir el 100% del consumo eléctrico de carga de tu auto.',
    price: '2990000'
  }
]

export const masterData = { priceRanges: priceRangeOptions, bodies: bodyOptions, autoTypes: autoTypeOptions, orderList: orderList, cargaInfo: cargaInfo }