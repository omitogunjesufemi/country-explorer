import { createContext } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const FavouritesContext = createContext([]);

export default function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useSessionStorage("favourites", []);

  function addFavourites(countryData) {
    setFavourites((favourites) => [...favourites, countryData]);
  }

  function removeFavourites(countryData) {
    setFavourites((favourites) =>
      favourites.filter((country) => country.cca3 !== countryData.cca3),
    );
  }

  function checkFavourites(countryData) {
    return favourites.some((country) => country.cca3 === countryData.cca3);
  }

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourites, removeFavourites, checkFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
