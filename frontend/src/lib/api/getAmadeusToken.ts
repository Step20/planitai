export async function getAmadeusToken() {
    const res = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: import.meta.env.VITE_AMADEUS_API_KEY,
            client_secret: import.meta.env.VITE_AMADEUS_API_SECRET,
        }),
    });
    if (!res.ok) throw new Error("Failed to get Amadeus token");
    const data = await res.json();
    return data.access_token;
}