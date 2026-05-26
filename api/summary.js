import { formatLanguages, formatCurrencies, formatCapital, formatPopulation } from "../src/utils/formatter.js";
import { config } from "dotenv";


export default async function handler(req, res) {
    config();
    if (req.method !== "POST") {
        return res.status(405).json({ error: "You tried a method not allowed" });
    }

    try {
        const { country } = req.body;

        if (!country) {
            return res.status(400).json({ error: "Country data is required" });
        }

        console.log("Generating summary for", country.name.common);

        const prompt = `
        You are a knowledgeable historian and travel writer. Write an engaging and informative 
        history brief (3-4 paragraphs) about the country "${country.name.common}" 
        (official name: ${country.name.official}).

        Use the following facts as context:
        - Region: ${country.region}, ${country.subregion ?? ""}
        - Capital: ${formatCapital(country.capital)}
        - Population: ${formatPopulation(country.population)}
        - Languages: ${formatLanguages(country.languages)}
        - Currencies: ${formatCurrencies(country.currencies)}
        - Bordering countries: ${country.borders?.join(", ") ?? "None (island or isolated)"}

        Cover the country's historical origins, major turning points, cultural significance, 
        and any interesting modern-day facts. Write in a warm, engaging tone suitable for a 
        travel & education app. Do not use bullet points — use flowing paragraphs only.
            `.trim();


        const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

        console.log(process.env);

        const token = process.env.GEMINI_API_KEY;

        console.log("Token: ", token ? `Present ${token}` : `Missing ${token}`);

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-goog-api-key": token
            },
            body: JSON.stringify(
                {
                    "contents": [
                        {
                            "parts": [
                                {
                                    "text": prompt
                                }
                            ]
                        }
                    ],
                }
            )
        }
        const urlRes = await fetch(apiUrl, requestOptions);

        console.log("Gemini API response status", urlRes.status);

        if (!urlRes.ok) {
            console.error("Gemini API error", JSON.stringify(await urlRes.text()));
            return res.status(500).json({ error: "Failed to fetch summary from Gemini" });
        }

        const data = await urlRes.json();

        console.log(data);

        const candidate = data?.candidates?.[0];
        const content = candidate?.content;
        const parts = Array.isArray(content) ? content : content?.parts;
        const summary = Array.isArray(parts)
            ? parts.find((part) => part?.text)?.text
            : undefined;

        if (!summary) {
            console.error("Unexpected Gemini response shape", JSON.stringify(data, null, 2));
            return res.status(500).json({ error: "Failed to parse summary" });
        }

        return res.status(200).json({ summary });

    } catch (error) {
        console.error("Summary API error", error);
        return res.status(500).json({ error: "Failed to fetch summary" });
    }
}