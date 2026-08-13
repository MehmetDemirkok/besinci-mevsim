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
  {
    id: "sprinter",
    name: "Mercedes-Benz Sprinter",
    image: "/images/fleet/sprinter.png",
  },
  {
    id: "audi",
    name: "Audi A6",
    image: "/images/fleet/audi.png",
  },
  {
    id: "megane",
    name: "Renault Megane",
    image: "/images/fleet/megane.png",
  },
];
