// utils/decodeAmenities.ts

const amenityCodeMap: Record<string, string> = {
  ST: "Study",
  PG: "Private Garden",
  SE: "Security",
  MR: "Maids Room",
  PA: "Pets Allowed",
  PP: "Private Pool",
  PR: "Children's Play Area",
  CP: "Covered Parking",
  BR: "Barbecue Area",
  LB: "Lobby in Building",
  BA: "Balcony",
  PJ: "Private Jacuzzi",
  AC: "Central A/C & Heating",
  PY: "Private Gym",
  SP: "Shared Pool",
  PN: "Pantry",
  MZ: "Mezzanine",
  AN: "Available Networked",
  DN: "Dining in building",
  SS: "Shared Spa",
  SY: "Shared Gym",
  CS: "Concierge Service",
  MS: "Maid Service",
  BW: "Built in Wardrobes",
  WC: "Walk-in Closet",
  BK: "Built in Kitchen Appliances",
  VW: "View of Water",
  BL: "View of Landmark",
  VC: "Vast-compliant",
  CO: "Children's Pool",
};

export function decodeAmenities(codeStr: string, limit: number = 5): string[] {
  const result: string[] = [];

  for (let i = 0; i < codeStr.length; i += 2) {
    const code = codeStr.slice(i, i + 2);
    const label = amenityCodeMap[code];
    if (label) result.push(label);
    if (result.length === limit) break;
  }

  return result;
}
