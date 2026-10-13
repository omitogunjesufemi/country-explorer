import { config } from "dotenv";

export default async function handler(req, res) {
    config();

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const apiKey = process.env.COUNTRY_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: "COUNTRY_API_KEY is not defined in environment variables" });
        }

        const { code } = req.query || {};

        // Fetch single country by alpha-3 code if code is provided, otherwise fetch country list
        const endpoint = code
            ? `https://api.restcountries.com/countries/v5/codes.alpha_3/${encodeURIComponent(code)}`
            : `https://api.restcountries.com/countries/v5?limit=100`;

        const countryRes = await fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        if (!countryRes.ok) {
            const errorText = await countryRes.text();
            console.error("REST Countries API Error:", countryRes.status, errorText);
            return res.status(countryRes.status).json({ error: "Failed to fetch from REST Countries API" });
        }

        const json = await countryRes.json();
        const rawObjects = json.data?.objects ?? [];

        const normalized = rawObjects.map((c) => ({
            ...c,
            name: c.names
                ? {
                    common: c.names.common,
                    official: c.names.official,
                    nativeName: c.names.native,
                }
                : c.name,
            capital: c.capitals
                ? c.capitals.map((cap) => cap.name)
                : Array.isArray(c.capital)
                    ? c.capital
                    : [],
            flags: c.flag
                ? {
                    svg: c.flag.url_svg,
                    png: c.flag.url_png,
                    alt: c.flag.description || "",
                }
                : c.flags,
            cca3: c.codes?.alpha_3 || c.cca3,
        }));

        return res.status(200).json(normalized);
    } catch (error) {
        console.error("REST Countries proxy error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}