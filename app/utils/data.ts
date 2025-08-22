interface dataObject {
  id: string | number | { [key: string]: any },
  name: string,
}

const priceRangeOptions: dataObject[] = [
  {
    id: { precio_max: 20000000, precio_min: null, ordering: 'precio_lista' },
    name: "Menos de $20 MM",
  },
  {

    id: { precio_min: 20000000, precio_max: 30000000, ordering: 'precio_lista' },
    name: "$20 - $30 MM",
  },
  {
    id: { precio_min: 30000000, precio_max: 40000000, ordering: 'precio_lista' },
    name: "$30 - $40 MM",
  },
  {
    id: { precio_min: 40000000, precio_max: 60000000, ordering: 'precio_lista' },
    name: "$40 - $60 MM",
  },
  {
    id: { precio_min: 60000000, precio_max: null, ordering: 'precio_lista' },
    name: "Más de $60 MM",
  },
];

const bodyOptions: dataObject[] = [
  { id: 'Hatchback', name: 'Hatchback' },
  { id: 'Sedán', name: 'Sedán' },
  { id: 'SUV', name: 'SUV' },
  { id: 'Camioneta', name: 'Camioneta' },
  { id: 'Deportivo', name: 'Deportivo' },
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

export const masterData = { priceRanges: priceRangeOptions, bodies: bodyOptions, autoTypes: autoTypeOptions, orderList: orderList }