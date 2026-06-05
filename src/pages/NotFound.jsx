import { Link } from "react-router-dom";
import TextTypeWriter from "../components/TextTypewriter";

export default function NotFound() {
    return (
        <>
            <div className="flex flex-col justify-center items-center h-[calc(100vh-4rem)] overflow-hidden">
                <h1 className="text-9xl font-bold text-blue-900">404</h1>
                <p className="text-lg"><TextTypeWriter text={"Sorry, we could not find this page."}/></p>
                <Link to="/" className="border-2 mt-5 px-5 py-3 rounded-xl bg-blue-700 text-white font-medium">Back to Homepage</Link>
            </div>
        </>
    );
}