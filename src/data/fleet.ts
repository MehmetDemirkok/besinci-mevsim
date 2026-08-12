export type FleetVehicleBase = {
  id: string;
  name: string;
  image: string;
};

export const fleet: FleetVehicleBase[] = [
  {
    id: "vito",
    name: "Mercedes-Benz Vito",
    image: "/images/fleet/vito.png",
  },
  {
    id: "superb",
    name: "Skoda Superb",
    image: "/images/fleet/superb.png",
  },
  {
    id: "travego",
    name: "Mercedes-Benz Travego",
    image: "/images/fleet/travego.png",
  },
];
