import { useState, useEffect } from "react";

export default function usePagination(data, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = itemsPerPage;
    const start = (currentPage - 1) * countriesPerPage;
    const end = start + countriesPerPage;
    const totalPages = Math.ceil(data.length / countriesPerPage);

    const paginatedCountries = data.slice(start, end);

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    function goToNextPage() {
        if (currentPage == totalPages) return;
        return setCurrentPage(currentPage + 1);
    }

    function goToPreviousPage() {
        if (currentPage <= 1) return;
        return setCurrentPage(currentPage - 1);
    }

    return { paginatedCountries, currentPage, totalPages, goToNextPage, goToPreviousPage };
}