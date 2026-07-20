import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {

    const [language, setLanguage] = useState("en");

    const languages = {
        en: {
            label: "English",
            speech: "en-US",
            tts: "en-US",
        },
        te: {
            label: "తెలుగు",
            speech: "te-IN",
            tts: "te-IN",
        },
        hi: {
            label: "हिन्दी",
            speech: "hi-IN",
            tts: "hi-IN",
        },
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                languages,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () =>
    useContext(LanguageContext);