import useTypewriter  from "../hooks/useTypewriter"; 

export default function SummaryTypeWriter({ text }) {
    const displayedText = useTypewriter(text);
    return (
        <>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm animate-typewriter">
                {displayedText
                    .split("\n\n")
                    .filter((p) => p.trim())
                    .map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
            </div>
        </>
    );
}