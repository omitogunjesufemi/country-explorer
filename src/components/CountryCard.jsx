import { formatCapital, formatPopulation } from "../utils/formatter";
import FavButton from "../components/FavButton";

export default function CountryCard({ countryData }) {
    return (
        <div className="border border-gray-300 rounded-sm hover:border-blue-700 hover:shadow-xl hover:scale-105 transition-all duration-200 p-3 h-full flex flex-col">
            <div className="rounded-sm h-48 w-full overflow-hidden">
                <img src={countryData.flags.svg} alt={countryData.flags.alt} className="w-full h-full object-cover" />
            </div>

            <div className="w-full mt-2 p-2">
                <div className="flex justify-between gap-2 mb-1">
                    <h3 className="text-xl font-bold">{countryData.name.common}</h3>
                    <FavButton countryData={countryData} />
                </div>
                <p>Capital: <span className="text-gray-500">{formatCapital(countryData.capital)}</span></p>
                <p>Region: <span className="text-gray-500">{countryData.region}</span></p>
                <p>Population: <span className="text-gray-500">{formatPopulation(countryData.population)}</span></p>
            </div>
        </div>
    );
}