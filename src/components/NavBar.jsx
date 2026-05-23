import { NavLink, Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="sticky top-0 bg-blue-900 w-full z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
                <div className="flex">
                    <Link to="/" className="px-6 py-4 hover:bg-blue-700 text-white font-bold text-2xl"> xplorer </Link>
                </div>

                <div className="flex">
                    <NavLink to="/" end className={({ isActive }) =>
                        `px-6 py-4 text-white hover:bg-blue-700 ${isActive ? "border-b-2 border-white font-bold" : ""}`
                    }>
                        Home
                    </NavLink>
                    <NavLink
                        to="/favourites"
                        className={({ isActive }) =>
                            `px-6 py-4 text-white hover:bg-blue-700 ${isActive ? "border-b-2 border-white font-bold" : ""}`}>
                        Favourites
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}