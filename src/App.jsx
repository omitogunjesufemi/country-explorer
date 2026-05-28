import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import Favourites from "./pages/Favourites";
import Layout from "./components/Layout";
import FavouritesProvider from "./context/FavouritesContext";

export default function App() {
  return (
    <FavouritesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/country/:id" element={<CountryDetail />} />
            <Route path="/favourites" element={<Favourites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavouritesProvider>
  );
}
