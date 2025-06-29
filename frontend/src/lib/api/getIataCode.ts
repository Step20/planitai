import { getAmadeusToken } from "./getAmadeusToken";

export async function getIataCode(rawKeyword: string): Promise<string | null> {
    const token = await getAmadeusToken();

    const keyword = rawKeyword.split(",")[0].trim(); // e.g., "Tokyo"
    const fallbackKeyword = keyword.split(" ")[0];   // e.g., "Tokyo"

    async function tryFetch(kw: string) {
        const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${encodeURIComponent(kw)}`;
        const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();

        if (Array.isArray(data?.data) && data.data.length > 0) {
            // Try to find best match
            const exactMatch = data.data.find((item: any) =>
                item.address?.cityName?.toLowerCase() === kw.toLowerCase()
            );
            const firstMatch = data.data[0];

            return exactMatch?.iataCode || firstMatch?.iataCode || null;
        }

        return null;
    }

    let iata = await tryFetch(keyword);
    if (!iata && fallbackKeyword !== keyword) {
        iata = await tryFetch(fallbackKeyword);
    }

    if (!iata) {
        console.warn("No IATA code found for:", rawKeyword);
    }

    return iata;
}
