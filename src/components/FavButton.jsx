import { HeartIcon as Like } from "@heroicons/react/24/outline";
import { HeartIcon as Liked } from "@heroicons/react/24/solid";
import useFavourites from "../hooks/useFavourites";

export default function FavButton({ countryData }) {
  const { addFavourites, removeFavourites, checkFavourites } = useFavourites();
  return (
    <>
      <div className="text-white">
        {checkFavourites(countryData) ? (
          <Liked
            className="size-13 text-blue-600 hover:text-blue-600 px-3 py-1"
            onClick={(e) => {
              e.preventDefault();
              removeFavourites(countryData);
            }}
          >
            Remove
          </Liked>
        ) : (
          <Like
            className="size-13 text-gray-400 hover:text-green-600 px-3 py-1"
            onClick={(e) => {
              e.preventDefault();
              addFavourites(countryData);
            }}
          >
            Like!
          </Like>
        )}
      </div>
    </>
  );
}
