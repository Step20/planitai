import { getAmadeusToken } from "./getAmadeusToken";

// --- Fetch Flights (Amadeus API Example) ---
export async function fetchFlights(startLoc, destLoc, checkIn) {
    const originCode = startLoc.iataCode;
    const destCode = destLoc.iataCode;

    if (!originCode || !destCode) return [];

    const token = await getAmadeusToken();
    console.log("fetchFlights", originCode, destCode, startLoc, destLoc, checkIn)

    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originCode}&destinationLocationCode=${destCode}&departureDate=${checkIn}&adults=1&max=3`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) return [];

    const data = await response.json();
    const carriers = data.dictionaries?.carriers || {};
    const currency = data.data?.[0]?.price?.currency || "USD";
    console.log("Fetched Flights Data:", data);
    return (data.data || []).map((flight, idx) => {
        const segments = flight.itineraries[0]?.segments || [];
        const firstSegment = segments[0] || {};
        const lastSegment = segments[segments.length - 1] || {};

        // Compose airline name from carrier code
        const carrierCode = firstSegment.carrierCode || "Unknown";
        const airline = carriers[carrierCode] || carrierCode;

        // Compose flight numbers (all segments)
        const flightNumbers = segments.map(seg => `${seg.carrierCode}${seg.number}`).join(", ");
        return {
            id: flight.id || `flight${idx}`,
            airline,
            flightNumbers,
            from: firstSegment.departure?.iataCode || originCode,
            to: lastSegment.arrival?.iataCode || destCode,
            departure: firstSegment.departure?.at || "",
            arrival: lastSegment.arrival?.at || "",
            duration: flight.itineraries[0]?.duration || "",
            stops: segments.length - 1,
            price: flight.price?.total || "",
            currency,
            images: ["https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg",],
            rating: 4.5, // Amadeus does not provide rating
            description: `Flight with ${airline} (${flightNumbers}), departs ${firstSegment.departure?.at || ""}, arrives ${lastSegment.arrival?.at || ""}`,
            location: destLoc.name,
        };
    });
}

// --- Fetch Hotels (Amadeus API Example) ---
export async function fetchNearbyHotels(location: { lat: string, lng: string }) {
    const token = await getAmadeusToken();
    const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${location.lat}&longitude=${location.lng}&radius=5&radiusUnit=KM&hotelSource=ALL`;

    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        console.error("Hotel geocode API error", response.status, await response.text());
        return [];
    }

    const data = await response.json();
    if (!data?.data || data.data.length === 0) {
        console.warn("No hotels found near the location.");
        return [];
    }

    // Map to PlaceOption format
    return data.data.map((hotel: any, idx: number) => ({
        id: hotel.hotelId || `hotel${idx}`,
        name: hotel.name,
        description: "Hotel near your destination.",
        images: ["https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg"],
        cost: 0, // No price info from this endpoint
        websiteUrl: "",
        location: hotel.iataCode || hotel.address?.countryCode || "",
        rating: 4.5, // Fake rating, as Amadeus does not provide
        categoryTitle: "Hotel Recommendations",
        lat: hotel.geoCode?.latitude,
        lng: hotel.geoCode?.longitude,
        distance: hotel.distance?.value,
        distanceUnit: hotel.distance?.unit,
    }));
}
// async function getNearbyHotelIds(lat: string, lng: string): Promise<string[]> {
//     const token = await getAmadeusToken();
//     const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${lat}&longitude=${lng}&radius=5&radiusUnit=KM&hotelSource=ALL`;

//     const response = await fetch(url, {
//         headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!response.ok) {
//         console.error("Hotel geocode API error", response.status, await response.text());
//         return [];
//     }

//     const data = await response.json();
//     console.log('getNearbyHotelIds', data, lat, lng)

//     if (!data?.data || data.data.length === 0) {
//         console.warn("No hotels found near the location.");
//         return [];
//     }

//     const hotelIds = data.data.map((hotel: any) => hotel.hotelId);
//     console.log('hotelIds', hotelIds)
//     return hotelIds.slice(0, 8); // Limit to 10
// }

// export async function fetchHotels(location: any, checkIn: string, checkOut: string) {
//     if (!location?.lat || !location?.lng) throw new Error("Missing location lat/lng");

//     const hotelIds = await getNearbyHotelIds(location.lat, location.lng);
//     if (!hotelIds.length) return [];

//     const token = await getAmadeusToken();
//     const idsQuery = hotelIds.map(id => `hotelIds=${id}`).join("&");


//     const url = `https://test.api.amadeus.com/v3/shopping/hotel-offers?${idsQuery}&adults=1&checkInDate=${checkIn}&checkOutDate=${checkOut}`;

//     const response = await fetch(url, {
//         headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!response.ok) {
//         console.error("Hotel offers API error", response.status, await response.text());
//         return [];
//     }

//     const data = await response.json();
//     console.log("Hotel Offers", data);

//     return data.data?.map((entry: any, idx: number) => ({
//         id: entry.hotel.hotelId || `hotel${idx}`,
//         name: entry.hotel.name,
//         description:
//             entry.offers?.[0]?.room?.description?.text || "A comfortable stay.",
//         images: ["https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg"], // Amadeus does not return media URL reliably
//         cost: Number(entry.offers?.[0]?.price?.total) || 0,
//         websiteUrl: entry.offers?.[0]?.self || "",
//         location: entry.hotel.cityCode,
//         rating: 4.5, // Amadeus doesn't return ratings; you can fake or fetch elsewhere
//         categoryTitle: "Hotel Recommendations",
//     })) || [];
// }
export async function fetchActivitiesAndFood(location, checkIn, checkOut) {
    const token = await getAmadeusToken();

    const url = `https://test.api.amadeus.com/v1/shopping/activities?latitude=${location.lat}&longitude=${location.lng}&startDate=${checkIn}&endDate=${checkOut}`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    console.log("Fetched Activities Data:", data);
    return data.data?.map((activity, idx) => ({
        id: activity.id || `activity${idx}`,
        name: activity.name,
        description: activity.shortDescription || "Local experience",
        images: activity.pictures || ["https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg"],
        cost: activity.price?.amount ? Number(activity.price.amount) : 0,
        websiteUrl: activity.bookingLink || "",
        location: activity.geoCode?.city || location.name,
        rating: activity.rating ? Number(activity.rating) : 4.2,
        // reviewsCount: activity.reviewsCount || undefined, // Amadeus does not provide reviewsCount
        categoryTitle: "Activities & Food",
    })) || [];
}