export const makeOptions = [
    { value: "alfa-romeo", label: "ALFA ROMEO", stock: 1 },
    { value: "aston-martin", label: "ASTON MARTIN", stock: 1 },
    { value: "audi", label: "AUDI", stock: 44 },
    { value: "bmw", label: "BMW", stock: 72 },
    { value: "chevrolet", label: "CHEVROLET", stock: 7 },
    { value: "daihatsu", label: "DAIHATSU", stock: 1 },
    { value: "ford", label: "FORD", stock: 9 },
    { value: "honda", label: "HONDA", stock: 18 },
    { value: "toyota", label: "TOYOTA", stock: 24 },
    { value: "nissan", label: "NISSAN", stock: 9 },
    { value: "mercedes", label: "MERCEDES", stock: 5 },
  ]
  
export  const modelOptions = [
    { value: "camry", label: "CAMRY", stock: 8 },
    { value: "corolla", label: "COROLLA", stock: 6 },
    { value: "civic", label: "CIVIC", stock: 7 },
    { value: "accord", label: "ACCORD", stock: 5 },
    { value: "f150", label: "F-150", stock: 9 },
    { value: "silverado", label: "SILVERADO", stock: 6 },
    { value: "altima", label: "ALTIMA", stock: 4 },
  ]
  
export  const locationOptions = [
    { value: "seattle", label: "SEATTLE, WA", stock: 42 },
    { value: "portland", label: "PORTLAND, OR", stock: 35 },
    { value: "spokane", label: "SPOKANE, WA", stock: 18 },
    { value: "boise", label: "BOISE, ID", stock: 15 },
    { value: "vancouver", label: "VANCOUVER, WA", stock: 12 },
  ]

  


// Sample vehicle data
export const vehicles: Vehicle[] = [
  { name: "Suzuki Jimny", year: 2023, price: 37950, km: 16, type: "Automatic", location: "Seattle WA" },
  { name: "Toyota RAV4", year: 2022, price: 42500, km: 24, type: "Automatic", location: "Portland OR" },
  { name: "Honda CR-V", year: 2023, price: 39800, km: 12, type: "Automatic", location: "San Francisco CA" },
  { name: "Ford Mustang", year: 2022, price: 56700, km: 8, type: "Manual", location: "Los Angeles CA" },
  { name: "Tesla Model 3", year: 2023, price: 61200, km: 5, type: "Electric", location: "Seattle WA" },
  { name: "BMW X5", year: 2022, price: 78500, km: 18, type: "Automatic", location: "Portland OR" },
  { name: "Mercedes GLC", year: 2023, price: 69900, km: 7, type: "Automatic", location: "San Francisco CA" },
  { name: "Audi Q5", year: 2022, price: 65400, km: 15, type: "Automatic", location: "Los Angeles CA" },
]