export function formatPopulation(number) {
    if (number == null) {
        return "N/A";
    }
    const output = new Intl.NumberFormat().format(number);
    return output;
}

export function formatCapital(capital) {
    if (!capital) {
        return "N/A";
    }
    return Object.values(capital).join(", ");
}

export function formatLanguages(languages) {
    if (!languages) {
        return "N/A";
    }
    return Object.values(languages).join(", ");
}

export function formatCurrencies(currencies) {
    if (!currencies) {
        return "N/A";
    }
    return Object.values(currencies).map((c) => c.name).join(", ");
}