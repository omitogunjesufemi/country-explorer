import { Link } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import useFetch from "../hooks/useFetch";
import { fetchAllCountries } from "../service/countryService";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import Modal from "../components/Modal";
import {
    ChevronDoubleLeftIcon
} from "@heroicons/react/24/outline";

export default function Home() {
    const { data, loading, error } = useFetch(fetchAllCountries);
    const [search, setSearch] = useState("");
    const [region, setRegion] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const regions = [...new Set(data ? data.map((country) => country.region) : [])];

    const filtered = data ? data.filter((country) => {
        const matchesNSearch = country.name.common.toLowerCase().includes(search.toLowerCase()) || country.name.official.toLowerCase().includes(search.toLowerCase()) || country.capital?.some((cap) => cap.toLowerCase().includes(search.toLowerCase()));
        const matchesRegion = country.region === region || region === "";
        return matchesNSearch && matchesRegion;
    }).sort(() => Math.random() - 0.5) : [];


    return (
        <>
            {/* Header */}
            <div className="flex flex-col gap-2 py-4 mt-8 mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800">Country Explorer</h1>
                <p className="text-gray-600 text-xl">Explore all the countries in the world</p>
            </div>

            {/* Search Box + Filter */}
            <div className="flex gap-3 py-4 mt-8 mb-8 justify-center items-center">
                <input type="text" placeholder="Search Country, Capital..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-1/2 px-5 py-3 border border-gray-200 rounded-lg focus:border-blue-700 focus:outline-none" />

                <AdjustmentsHorizontalIcon className="size-10 shrink-0 text-gray-400 border rounded-md border-gray-200 hover:border-blue-700 hover:scale-105 transition-all duration-200" onClick={() => setIsModalOpen(true)} />

                <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
                    <h2 className="text-xl font-bold text-gray-800">Filter by region</h2>
                    <select value={region} onChange={(e) => {
                        setRegion(e.target.value);
                        setIsModalOpen(false);
                    }} className="w-full mt-4 px-5 py-3 border border-gray-200 rounded-lg focus:border-blue-700 focus:outline-none">
                        <option value="">All Regions</option>
                        {regions.map((reg) => (
                            <option key={reg} value={reg}>{reg}</option>
                        ))}
                    </select>
                </Modal>
                {region && (<p className="flex items-center gap-1 text-gray-600"><span className="text-sm">Filtering by: {region}</span>
                    <ChevronDoubleLeftIcon className="size-6 text-gray-400 hover:text-red-400 hover:scale-105 transition-all duration-200" onClick={() => setRegion("")} />
                </p>)}
            </div>

            {/* Spinner */}
            {loading &&
                <div className="flex gap-3 py-4 mt-8 mb-8 justify-center items-center">
                    <Spinner label={"Loading Countries..."} />
                </div>
            }

            {/* Countries Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 m-auto place-items-center">
                {error && <p className="text-red-500 text-center mt-20">Error: {error.message}</p>}
                {filtered && filtered.map((country) => (
                    <Link key={country.cca3} to={`/country/${country.cca3}`} className="w-full h-full">
                        <CountryCard countryData={country} />
                    </Link>
                ))}
            </div>
        </>
    );
}