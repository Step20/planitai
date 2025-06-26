// types.ts
export interface ItineraryDay {
    title: string;
    summary: string;
    selectedOptions: {
        categoryTitle: string;
        options: string[];
    }[];
}

export interface ItineraryType {
    id: string;
    userId: string;
    title: string;
    location: string;
    checkIn: string;
    checkOut: string;
    numOfTravelers: number;
    sharedUsersId: string[];
    createdAt: string;
    updatedAt: string;
    days: ItineraryDay[];
}

export interface UserType {
    id: string;
    fullname: string;
    email: string;
    password: string;
    profilePicture?: string;
    plan: string;
    tokens: number;
    createdAt: string;
    updatedAt: string;
    itinerary: ItineraryType[];
}
