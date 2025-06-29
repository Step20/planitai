import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true, // Only for testing; for production, use server-side
});

export async function generateTripSummary(prompt: string) {
    const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125", // Cheaper and more available than "gpt-4"
        temperature: 0.7,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1024, // Limit output size for cost and quota
    });

    return res.choices[0]?.message?.content;
}