import { useState, useEffect } from "react";

export default function usePagination(data, limit = 20) {
    const [offSet, setOffSet] = useState(0);
    const totalItems = data.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));

    const currentPage = Math.floor(offSet / limit) + 1;
    const paginatedCountries = data.slice(offSet, offSet + limit);

    useEffect(() => {
        setOffSet(0);
    }, [data]);

    function goToNextPage() {
        if (currentPage >= totalPages) return;
        setOffSet((prev) => prev + limit);
    }

    function goToPreviousPage() {
        if (currentPage <= 1) return;
        setOffSet((prev) => Math.max(0, prev - limit));
    }

    return { paginatedCountries, offSet, currentPage, totalPages, goToNextPage, goToPreviousPage };
}