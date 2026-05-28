import { useState, useEffect } from "react";

export default function useTypewriter(text, complexity = "hard", delay=1) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        if (!text) return;

        setDisplayedText("");

        const interval = setInterval(() => {
            setDisplayedText((prev) => {
                if (prev.length >= text.length) {
                    clearInterval(interval);
                    return prev;
                }
                if (complexity === "easy") {
                    return prev + text[prev.length];

                } else if (complexity === "hard") {
                    return prev + text.slice(prev.length, prev.length + 10);
                }
            });
        }, delay);

        return () => clearInterval(interval);
    }, [text]);

    return displayedText;
}
