export type ServiceAtmosphere =
  | "vehicle"
  | "travel"
  | "hotel"
  | "road"
  | "city"
  | "abstract";

export type ServiceItemBase = {
  id: string;
  slug: string;
  image: string;
  atmosphere: ServiceAtmosphere;
  relatedFleetIds: string[];
  contactTopicId: string;
};

export const services: ServiceItemBase[] = [
  {
    id: "vip",
    slug: "vip-transfer",
    image: "/images/services/vip.png",
    atmosphere: "vehicle",
    relatedFleetIds: ["vito"],
    contactTopicId: "vip",
  },
  {
    id: "airport",
    slug: "havaalani-transfer",
    image: "/images/services/airport.png",
    atmosphere: "city",
    relatedFleetIds: ["vito", "superb", "megane"],
    contactTopicId: "vip",
  },
  {
    id: "corporate",
    slug: "kurumsal-tasimacilik",
    image: "/images/services/corporate.png",
    atmosphere: "vehicle",
    relatedFleetIds: ["superb", "vito", "audi"],
    contactTopicId: "general",
  },
  {
    id: "tourism",
    slug: "turizm-tasimaciligi",
    image: "/images/services/tourism.png",
    atmosphere: "travel",
    relatedFleetIds: ["travego", "vito", "sprinter"],
    contactTopicId: "tourism",
  },
  {
    id: "private",
    slug: "ozel-arac",
    image: "/images/services/private.png",
    atmosphere: "road",
    relatedFleetIds: ["superb", "vito", "audi", "megane"],
    contactTopicId: "fleet",
  },
  {
    id: "accommodation",
    slug: "konaklama",
    image: "/images/services/accommodation.png",
    atmosphere: "hotel",
    relatedFleetIds: [],
    contactTopicId: "stay",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((item) => item.slug === slug);
}

export function getServiceById(id: string) {
  return services.find((item) => item.id === id);
}

export function servicePath(slug: string) {
  return `/hizmetler/${slug}`;
}
