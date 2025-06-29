export function formatTripPrompt(userInput, apiOptions, poi) {
  return `
You are a travel itinerary assistant.

Given the following trip details, generate a JSON object with:
- "title": A catchy 3-4 word summary of the overall trip highlights as the trip title.
- "days": An array from check-in to check-out (Day 1 to Day N). For each day, provide:
    - "titleSummary": A catchy 2 word summary of the day's highlights.
    - "summary": A concise 2-4 sentence description of the day's activities.
    - "selectedOptions": For each category and option (including flights, hotels, and activities), provide a "description" for each option (1-2 sentences about why it's interesting or recommended, tailored to the option type).

- "placesOfInterest": For each place, provide a "description" (1-2 sentences about what makes it special).

Trip Details:
Destination: ${userInput.location}
Dates: ${userInput.checkIn} to ${userInput.checkOut}
Travelers: ${userInput.numOfTravelers || 2}
Budget: $${userInput.budget || 2000}
Tags: ${userInput.personalizeTags?.join(", ")}

API Data (for context, do not repeat as output):
${JSON.stringify(apiOptions, null, 2)}

Places of Interest (for context, do not repeat as output):
${JSON.stringify(poi, null, 2)}

Return this JSON format:

{
 "title":  "...",
  "days": [
    {
      "titleSummary": "...",
      "summary": "...",
      "selectedOptions": [
        {
          "categoryTitle": "...",
          "options": [
            { "description": "..." }
          ]
        }
      ]
    }
  ],
  "placesOfInterest": [
    {
      "description": "..."
    }
  ]
}
`.trim();
}