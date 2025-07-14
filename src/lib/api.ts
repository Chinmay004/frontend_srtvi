// lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchListings = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/listing?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
};
