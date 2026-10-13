
export async function fetchAllCountries() {

  try {
    // await new Promise(resolve => setTimeout(resolve, 5000));
    const response = await fetch("/api/country");
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `Failed to fetch countries (${response.status})`);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchCountryByCode(countryCode) {
  try {
    const response = await fetch(`/api/country?code=${encodeURIComponent(countryCode)}`);
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `Failed to fetch country (${response.status})`);
    }
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
      date: item.date,
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: countryData }),
    };
    const response = await fetch("/api/summary", headerOptions);
    const data = await response.json();
    return data.summary;
    console.log("Summary API response", data);
  } catch (error) {
    throw error;
  }
}
