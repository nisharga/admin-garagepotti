// Define the data type for our table
export type VehicleItem = {
    id: string
    name: string
    model: string
    type: string 
  }
  
  
  // Sample data
  export const VehicleMockData: VehicleItem[] = [
    {
      "id": "1",
      "name": "Audi",
      "model": "2022 - MT",
      "type": "car"
    },
    {
      "id": "2",
      "name": "BMW",
      "model": "2023 - AT",
      "type": "car"
    },
    {
      "id": "3",
      "name": "Tesla",
      "model": "2024 - Electric",
      "type": "car"
    },
    {
      "id": "4",
      "name": "Toyota",
      "model": "2021 - Hybrid",
      "type": "car"
    },
    {
      "id": "5",
      "name": "Honda",
      "model": "2020 - CVT",
      "type": "car"
    },
    {
      "id": "6",
      "name": "Ford",
      "model": "2022 - AT",
      "type": "car"
    },
    {
      "id": "7",
      "name": "Chevrolet",
      "model": "2023 - MT",
      "type": "car"
    },
    {
      "id": "8",
      "name": "Mercedes",
      "model": "2024 - AT",
      "type": "car"
    },
    {
      "id": "9",
      "name": "Nissan",
      "model": "2022 - CVT",
      "type": "car"
    },
    {
      "id": "10",
      "name": "Hyundai",
      "model": "2023 - Hybrid",
      "type": "car"
    },
    {
      "id": "11",
      "name": "Kia",
      "model": "2021 - AT",
      "type": "car"
    },
    {
      "id": "12",
      "name": "Lexus",
      "model": "2024 - Electric",
      "type": "car"
    },
    {
      "id": "13",
      "name": "Mazda",
      "model": "2022 - MT",
      "type": "car"
    },
    {
      "id": "14",
      "name": "Subaru",
      "model": "2023 - AWD",
      "type": "car"
    },
    {
      "id": "15",
      "name": "Volkswagen",
      "model": "2021 - DSG",
      "type": "car"
    }
  ]
  
  export const VehicleType = [
    { value: "car", label: "Car" },
    { value: "micro", label: "Micro" },
    { value: "highx", label: "High X" }, 
  ]