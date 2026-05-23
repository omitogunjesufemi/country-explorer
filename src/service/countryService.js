export async function fetchAllCountries() {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population,cca3`);
        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function fetchCountryByCode(countryCode) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function fetchCountryIncomeInfo(url) {
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        const data = rawData[1] ?? [];
        const result = data.map((item) => ({
            value: item.value,
            date: item.date
        }));
        return result;
    } catch (error) {
        throw error;
    }
}

export async function fetchCountrySummary(countryData) {
    try {
        const headerOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ country: countryData })
        };
        const response =  await fetch("/api/summary", headerOptions);
        const data = await response.json();
        return data.summary;
    } catch (error) {
        throw error;
    }
}