import useTypewriter from "../hooks/useTypewriter";

export default function TextTypeWriter({ text }) {
    const displayedText = useTypewriter(text, "easy", 50);
    return (
        <>
            <p className="text-gray-600 text-xl">
                {displayedText}
            </p>
        </>
    );
}