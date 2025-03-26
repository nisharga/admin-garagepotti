export type VehicleItem = {
  _id: string;
  manufacturer: string;
  models: {
    model: string;
    years: string[];
  }[];
};

 
