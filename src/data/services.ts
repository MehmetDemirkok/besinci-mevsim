export type ServiceItemBase = {
  id: string;
  image: string;
};

export const services: ServiceItemBase[] = [
  { id: "vip", image: "/images/services/vip.png" },
  { id: "airport", image: "/images/services/airport.png" },
  { id: "corporate", image: "/images/services/corporate.png" },
  { id: "tourism", image: "/images/services/tourism.png" },
  { id: "private", image: "/images/services/private.png" },
  { id: "accommodation", image: "/images/services/accommodation.png" },
];
