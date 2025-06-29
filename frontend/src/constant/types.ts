export interface ItineraryDay {
    title: string;
    titleSummary: string;
    summary: string;
    selectedOptions: {
        categoryTitle: string;
        options: PlaceOption[];
    }[];
}

export interface LocationType {
    lat: number;
    lng: number;
    name: string;
    iataCode?: string;
}

export interface ItineraryType {
    id: string;
    userId: string;
    title: string;
    budget?: number;
    location: LocationType;
    startLocation: LocationType;
    createdType: "ai" | "manual";
    isEditing: boolean;
    aiTokensUsed: number;
    checkIn: string;
    checkOut: string;
    image?: string;
    estimatedCost?: number;
    description?: string;
    numOfTravelers?: number;
    sharedUsersId?: string[];
    personalizeTags?: string[];
    isPublic?: boolean;
    createdAt: string;
    updatedAt: string;
    days: ItineraryDay[];
    placesOfInterest: PlaceOption[];
}

export interface PlaceOption {
    id?: string;
    name: string;
    description?: string;
    type: string;
    images?: string[];
    cost?: {
        amount: string;
        currencyCode: string;
    }; // <-- always a number, not {amount, currency}
    websiteUrl?: string;
    location?: LocationType;
    rating?: number;
    reviewsCount?: number;
    selected?: boolean;
    apiTopRated?: boolean;
    categoryTitle?: string;
    airline?: string; // for flights
    flightNumbers?: string; // for flights
    from?: string; // for flights
    to?: string; // for flights
    departure?: string; // for flights
    arrival?: string; // for flights
    duration?: string; // for flights
    stops?: number; // for flights
    price?: string | number; // for flights/hotels, can be string from API
    currency?: string; // for flights/hotels
}

export interface UserType {
    id: string;
    fullname: string;
    email: string;
    password: string;
    profilePicture?: string;
    plan: "free" | "pro";
    tokens: number;
    createdAt: string;
    updatedAt: string;
}