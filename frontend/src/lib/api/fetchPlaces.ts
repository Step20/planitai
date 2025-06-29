import { fetchFlights, fetchActivitiesAndFood, fetchNearbyHotels } from "./fetchModule";

// Helper to get N random unique items from an array
function getRandomUniqueItems<T>(arr: T[], n: number, excludeIds: Set<string> = new Set()) {
    const filtered = arr.filter(item => !excludeIds.has(item.id));
    const result: T[] = [];
    const usedIds = new Set<string>(excludeIds);
    const pool = [...filtered];
    while (result.length < n && pool.length > 0) {
        const idx = Math.floor(Math.random() * pool.length);
        const [item] = pool.splice(idx, 1);
        if (!usedIds.has(item.id)) {
            result.push(item);
            usedIds.add(item.id);
        }
    }
    return result;
}

export async function fetchPlaces({ location, checkIn, checkOut, startLocation }) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const totalDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)));

    // Fetch all data
    const [flights, hotels, activitiesAndFood] = await Promise.all([
        fetchFlights(startLocation, location, checkIn),
        fetchNearbyHotels(location),
        // fetchHotels(location, checkIn, checkOut),
        fetchActivitiesAndFood(location, checkIn, checkOut),
    ]);

    // For each day, pick unique options per category (no overlap within the same day)
    const apiOptions = [];
    for (let i = 0; i < totalDays; i++) {
        const dayLabel = `Day ${i + 1}`;
        // Track used IDs for this day to avoid duplicates within the day
        const usedIds = new Set<string>();
        let dayCategories = [];

        if (i === 0) {
            const flightsForDay = getRandomUniqueItems(flights, 3, usedIds);
            flightsForDay.forEach(f => usedIds.add(f.id));
            const hotelsForDay = getRandomUniqueItems(hotels, 3, usedIds);
            hotelsForDay.forEach(h => usedIds.add(h.id));
            const activitiesForDay = getRandomUniqueItems(activitiesAndFood, 3, usedIds);
            activitiesForDay.forEach(a => usedIds.add(a.id));
            console.log(hotelsForDay)
            dayCategories = [
                { categoryTitle: "Available Flights", options: flightsForDay },
                { categoryTitle: "Hotel Recommendations", options: hotelsForDay },
                { categoryTitle: "Activities & Food", options: activitiesForDay },
            ];
        } else {
            const activitiesForDay = getRandomUniqueItems(activitiesAndFood, 3, usedIds);
            activitiesForDay.forEach(a => usedIds.add(a.id));
            dayCategories = [
                { categoryTitle: "Activities & Food", options: activitiesForDay },
            ];
        }

        apiOptions.push({
            day: dayLabel,
            categories: dayCategories,
        });
    }

    // Collect all used activity IDs in apiOptions
    const usedActivityIds = new Set<string>();
    apiOptions.forEach(day =>
        day.categories.forEach(cat =>
            cat.options.forEach((opt: any) => usedActivityIds.add(opt.id))
        )
    );

    // For apiPlacesOfInterest: pick 3-6 unique unused activitiesAndFood
    let apiPlacesOfInterest = getRandomUniqueItems(activitiesAndFood, 6, usedActivityIds);

    // If not enough unused, fill up to 6 with randoms (no duplicates)
    if (apiPlacesOfInterest.length < 3) {
        // Try to fill up to 3 with any (including used)
        const allIds = new Set(apiPlacesOfInterest.map(i => i.id));
        while (apiPlacesOfInterest.length < 3 && activitiesAndFood.length > 0) {
            const idx = Math.floor(Math.random() * activitiesAndFood.length);
            const item = activitiesAndFood[idx];
            if (!allIds.has(item.id)) {
                apiPlacesOfInterest.push(item);
                allIds.add(item.id);
            }
        }
    }
    // Always trim to max 6
    apiPlacesOfInterest = apiPlacesOfInterest.slice(0, 6);

    // console.log("API Options:", JSON.stringify(apiOptions, null, 2));
    // console.log("API Places of Interest:", JSON.stringify(apiPlacesOfInterest, null, 2));
    return {
        apiOptions,
        apiPlacesOfInterest,
    };
}