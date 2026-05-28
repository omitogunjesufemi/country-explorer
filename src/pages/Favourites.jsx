import CountryCard from "../components/CountryCard";
import useFavourites from "../hooks/useFavourites";
import { Link } from "react-router-dom";

export default function Favourites() {
  const { favourites } = useFavourites();
  return (
    <>
      <div className="flex flex-col gap-2 py-4 mt-8 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Your Favourites!</h1>
        <p className="text-gray-600 text-xl">
          Explore all the countries you love the most!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 m-auto place-items-center">
        {favourites.length === 0 ? (
          <p>No favourite countries yet.</p>
        ) : (
          favourites?.map((country) => (
            <Link
              key={country.cca3}
              to={`/country/${country.cca3}`}
              className="w-full h-full"
            >
              <CountryCard countryData={country} />
            </Link>
          ))
        )}
      </div>
    </>
  );
}
